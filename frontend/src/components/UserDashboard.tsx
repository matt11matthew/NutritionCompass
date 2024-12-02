import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function UserDashboard() {
    const [meals, setMeals] = useState<
        { _id: string; name: string; calories: number; carbs: number; protein: number; fats: number; date: string }[]
    >([]);
    const [newMeal, setNewMeal] = useState({
        _id: "",
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
        date: new Date().toISOString().split("T")[0],
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [totals, setTotals] = useState({ calories: 0, carbs: 0, protein: 0, fats: 0 });
    const userId = localStorage.getItem("userId") || "";
    const [activeMealIndex, setActiveMealIndex] = useState<number | null>(null);
    const [maxCalories, setMaxCalories] = useState(2000);


    useEffect(() => {
        if (userId) {
            fetchMeals();
            //i think we get max cals on load:
            getMaxCals(userId);
        }
    }, [userId]);


    // Fetch all meals associated with a user
    const fetchMeals = async () => {
        try {
            const response = await fetch(`https://nc-api.matthewe.me/foods/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch meals");
            const data = await response.json();

            // Ensure macros are parsed correctly
            const mealsWithMacros = data.data.map((meal: any) => ({
                _id: meal._id,
                name: meal.name,
                calories: meal.calories,
                carbs: meal.macros.carbs,
                protein: meal.macros.protein,
                fats: meal.macros.fat,
                date: meal.date,
            }));

            setMeals(mealsWithMacros); // Update meals state
            fetchTotals(mealsWithMacros); // Calculate totals
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };


    // Calculate totals for the day
    const fetchTotals = (meals: typeof newMeal[]) => {
        const groupedByDate = meals.reduce((acc, meal) => {
            const date = meal.date.split("T")[0];
            if (!acc[date]) acc[date] = { calories: 0, carbs: 0, protein: 0, fats: 0 };
            acc[date].calories += meal.calories;
            acc[date].carbs += meal.carbs;
            acc[date].protein += meal.protein;
            acc[date].fats += meal.fats;
            return acc;
        }, {} as { [date: string]: typeof totals });

        const today = new Date().toISOString().split("T")[0];
        setTotals(groupedByDate[today] || { calories: 0, carbs: 0, protein: 0, fats: 0 });
    };

    // Add a new meal
    const addMeal = async () => {
        if (!newMeal.name || newMeal.calories <= 0) {
            alert("Please enter valid inputs.");
            return;
        }

        // Construct the payload to match the backend's expectations
        const mealData = {
            userId: userId, // Include the userId in the payload
            name: newMeal.name,
            calories: newMeal.calories,
            macros: {
                carbs: newMeal.carbs,
                protein: newMeal.protein,
                fat: newMeal.fats,
            },
            description: "Meal added from UI", // Optional description
            mealType: "SNACK", // Optional meal type
            date: newMeal.date,
        };

        try {
            const response = await fetch(`https://nc-api.matthewe.me/foods`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mealData), // Send the correct payload
            });

            if (!response.ok) {
                const errorData = await response.json(); // Log backend error response for debugging
                console.error("Error response from backend:", errorData);
                throw new Error("Failed to add meal");
            }

            const addedMeal = await response.json();

            // Add the newly created meal to the frontend state
            const newMeals = [
                ...meals,
                {
                    _id: addedMeal.data._id, // Backend-generated ID
                    name: mealData.name,
                    calories: mealData.calories,
                    carbs: mealData.macros.carbs,
                    protein: mealData.macros.protein,
                    fats: mealData.macros.fat,
                    date: mealData.date,
                },
            ];

            setMeals(newMeals);
            setNewMeal({
                _id: "",
                name: "",
                calories: 0,
                carbs: 0,
                protein: 0,
                fats: 0,
                date: new Date().toISOString().split("T")[0],
            }); // Reset the form
            fetchTotals(newMeals); // Refresh totals
        } catch (error) {
            console.error("Error adding meal:", error);
            alert("Failed to add meal. Please try again.");
        }
    };




    // Update an existing meal
    const updateMeal = async (index: number) => {
        const mealToUpdate = meals[index];
        const updatedMeal = { ...mealToUpdate, ...newMeal };

        try {
            const response = await fetch(`https://nc-api.matthewe.me/foods/${userId}/${updatedMeal._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: updatedMeal.name,
                    calories: updatedMeal.calories,
                    macros: {
                        carbs: updatedMeal.carbs,
                        protein: updatedMeal.protein,
                        fat: updatedMeal.fats,
                    },
                    date: updatedMeal.date,
                }),
            });

            if (!response.ok) throw new Error("Failed to update meal");

            const updatedMeals = [...meals];
            updatedMeals[index] = updatedMeal;
            setMeals(updatedMeals);
            setEditingIndex(null);
            setNewMeal({ _id: "", name: "", calories: 0, carbs: 0, protein: 0, fats: 0, date: new Date().toISOString().split("T")[0] });
            fetchTotals(updatedMeals);
        } catch (error) {
            console.error("Error updating meal:", error);
        }
    };


    // Delete a meal
    const deleteMeal = async (index: number) => {
        const mealToDelete = meals[index];
        console.log("meal index del:", index, mealToDelete);

        try {
            const response = await fetch(`https://nc-api.matthewe.me/foods/${mealToDelete._id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete meal");

            const updatedMeals = meals.filter((_, i) => i !== index);
            setMeals(updatedMeals);
            fetchTotals(updatedMeals);
        } catch (error) {
            console.error("Error deleting meal:", error);
        }
    };


    // Edit an existing meal
    const editMeal = (index: number) => {
        setEditingIndex(index);
        const { _id, name, calories, carbs, protein, fats, date } = meals[index];
        setNewMeal({ _id, name, calories, carbs, protein, fats, date });
    };

    const getMaxCals = async (userId: string) => {
        try {
            const response = await fetch(`https://nc-api.matthewe.me/users/${userId}/caloriesLimits`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch max calories: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Response data from backend:", data);

            // Extract calorie limit
            const calorieLimit = Math.round(data.data?.calorieLimit || 2000); // Round to nearest integer
            setMaxCalories(calorieLimit);
            console.log("Updated maxCalories:", calorieLimit);
        } catch (error) {
            console.error("Error fetching maxCalories:", error);
            alert("Failed to fetch max calories. Please try again later.");
        }
    };






    const showMealOptions = (index: number) => {
        console.log("Showing options for meal at index:", index);
        setActiveMealIndex(activeMealIndex === index ? null : index);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                {/* Left Section - Macros */}
                <div className="macros-container">
                    <h1 className="dashboard-title">User Dashboard</h1>
                    <div id="macros-content">
                        <div className="macros-circle">
                            <h2>Calories</h2>
                            <div style={{width: 250, height: 250}}>
                                <CircularProgressbar
                                    value={totals.calories}
                                    maxValue={maxCalories}
                                    text={`${totals.calories}/${maxCalories}\nCalories`}
                                    styles={{
                                        path: {
                                            stroke: '#0F3874',
                                            strokeLinecap: 'round',
                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                        },
                                        trail: {
                                            stroke: '#d6d6d6',
                                        },
                                        text: {
                                            fill: '#0F3874',
                                            fontSize: '50%',
                                            fontWeight: 'bold',
                                            lineHeight: '18px',
                                            textAlign: 'center',
                                        }
                                    }}
                                />
                            </div>
                            {/*<h2>Macros</h2>*/}
                            {/*<p>Carbs: {totals.carbs} grams</p>*/}
                            {/*<p>Protein: {totals.protein} grams</p>*/}
                            {/*<p>Fats: {totals.fats} grams</p>*/}
                        </div>
                        <div className="macros-summary">
                            <p>Carbs: {totals.carbs} grams</p>
                            <p>Protein: {totals.protein} grams</p>
                            <p>Fats: {totals.fats} grams</p>
                        </div>
                        {/*<div className="calories-summary">Calories: {totals.calories} cal</div>*/}
                    </div>
                </div>

                {/* Right Section - Meals */}
                <div className="meals-container">
                    <div className="meals-header">
                        <h2>Today's Meals</h2>
                        <button className="add-meal-button"
                                onClick={editingIndex !== null ? () => updateMeal(editingIndex) : addMeal}
                        >
                            {editingIndex !== null ? "Update Meal" : "Add New Meal"}
                        </button>
                    </div>
                    <div className="meal-form">
                        <div className="meal-form-part">
                            <input
                                type="text"
                                placeholder="Meal name"
                                value={newMeal.name}
                                onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                                className="meal-input"
                            />
                                <input
                                    type="number"
                                    placeholder="Calories"
                                    value={newMeal.calories === 0 ? "" : newMeal.calories}
                                onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) || 0 })}
                                className="meal-input"
                            />
                        </div>

                        <div className="meal-form-part">
                            <input
                                type="number"
                                placeholder="Carbs (g)"
                                value={newMeal.carbs === 0 ? "" : newMeal.carbs}
                                onChange={(e) => setNewMeal({...newMeal, carbs: parseInt(e.target.value) || 0})}
                                className="meal-input"
                            />
                            <input
                                type="number"
                                placeholder="Protein (g)"
                                value={newMeal.protein === 0 ? "" : newMeal.protein} // Show "" when protein is 0
                                onChange={(e) => setNewMeal({...newMeal, protein: parseInt(e.target.value) || 0})}
                                className="meal-input"
                            />

                            <input
                                type="number"
                                placeholder="Fats (g)"
                                value={newMeal.fats === 0 ? "" : newMeal.fats}
                                onChange={(e) => setNewMeal({...newMeal, fats: parseInt(e.target.value) || 0 })}
                                className="meal-input"
                            />
                        </div>
                    </div>
                    <ul className="meals-list">
                        {meals.map((meal, index) => (
                            <li key={index} className="meal-item">
                                <div className="meal-info">
                                    <button className="icon-button" onClick={() => showMealOptions(index)}>
                                        <i className="bi bi-three-dots-vertical" style={{fontSize: '1.5rem', color: '#0F3874'}}></i>
                                    </button>
                                    <span className="meal-name">{meal.name}</span>
                                    <span className="meal-calories">{meal.calories} cal</span>
                                </div>
                                <div className={`meal-more-info${activeMealIndex === index ? "-active" : ""}`}>
                                    <div className="meal-macros">
                                        <span className="meal-macros-item">Carbs: {meal.carbs} g</span>
                                        <span className="meal-macros-item">Proteins: {meal.protein} g</span>
                                        <span className="meal-macros-item">Fats: {meal.fats} g</span>
                                    </div>

                                    <div className="meal-options">
                                        <span className="dots-menu" onClick={() => editMeal(index)}>
                                            <i className="bi bi-pencil-square" style={{fontSize: '1.5rem'}}></i>
                                        </span>
                                        <span className="dots-menu" onClick={() => deleteMeal(index)}>
                                            <i className="bi bi-trash3-fill" style={{fontSize: '1.5rem'}}></i>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
