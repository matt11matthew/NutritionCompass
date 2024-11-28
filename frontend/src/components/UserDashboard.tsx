import React, {useEffect, useState} from "react";
import "./UserDashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
/*import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';*/

function UserDashboard() {
    const [meals, setMeals] = useState<
        { id: string; name: string; calories: number; carbs: number; protein: number; fats: number; date: string }[]
    >([]);
    const [newMeal, setNewMeal] = useState({
        id: "",
        name: "",
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
        date: new Date().toISOString().split('T')[0]
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [totals, setTotals] = useState({ calories: 0, carbs: 0, protein: 0, fats: 0 });
    const userId = localStorage.getItem('userId') || '';
    const [activeMealIndex, setActiveMealIndex] = useState<number | null>(null);

    useEffect(() => {
        if(userId) fetchMeals();
    }, [userId]);


    //gets all the meals associated with a user:
    const fetchMeals = async () => {
        try {
            const response = await fetch(`http://157.245.242.118:3001/foods?userId=${userId}`);
            if (!response.ok) throw new Error("Failed to fetch meals");
            const data = await response.json();
            setMeals(data);
            fetchTotals(data); // Pass fetched meals to calculate totals
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    //so the parameter isn't so long typing is gonna be here.
    type Meal = {
        id: string;
        name: string;
        calories: number;
        macros: {
            carbs: number;
            protein: number;
            fat: number;
        };
        date: string;
    };

    //doesn't use the api, since we are able to get all meals for the user, and the api is only for calories.
    const fetchTotals = (meals: Meal[]) => {
        // Group meals by date and sum the macros for each date
        const groupedByDate = meals.reduce((acc: { [date: string]: { calories: number, carbs: number, protein: number, fats: number } }, meal: Meal) => {
            const date = meal.date.split('T')[0]; // Extract the date
            if (!acc[date]) acc[date] = { calories: 0, carbs: 0, protein: 0, fats: 0 };
            acc[date].calories += meal.calories;
            acc[date].carbs += meal.macros.carbs;
            acc[date].protein += meal.macros.protein;
            acc[date].fats += meal.macros.fat;
            return acc;
        }, {});

        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        setTotals(groupedByDate[today] || { calories: 0, carbs: 0, protein: 0, fats: 0 });
    };

    const addMeal = async () => {
        if (!newMeal.name || newMeal.calories <= 0 || newMeal.carbs < 0 || newMeal.protein < 0 || newMeal.fats < 0) {
            alert("Please enter valid inputs.");
            return;
        }

        const mealData = { ...newMeal };

        try {
            const response = await fetch(`http://157.245.242.118:3001/foods`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mealData),
            });

            if (!response.ok) throw new Error("Failed to add meal");

            const addedMeal = await response.json();
            setMeals([...meals, addedMeal]); // Add the meal returned from the backend (which includes the id)
            setNewMeal({ id: "", name: "", calories: 0, carbs: 0, protein: 0, fats: 0,date: new Date().toISOString().split('T')[0] }); // Reset after adding
            fetchTotals([...meals, addedMeal]); // Refresh totals after adding a meal
        } catch (error) {
            console.error("Error adding meal:", error);
            alert("Failed to add meal. Please try again.");
        }
    };

    const updateMeal = async (index: number) => {
        const mealToUpdate = meals[index];
        const updatedMeal = { ...mealToUpdate, ...newMeal }; // Merge the current meal with the updated data

        try {
            const response = await fetch(`http://157.245.242.118:3001/foods/${updatedMeal.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedMeal),
            });

            if (!response.ok) throw new Error("Failed to update meal");

            const updatedMeals = [...meals];
            updatedMeals[index] = updatedMeal;
            setMeals(updatedMeals);
            setEditingIndex(null);
            setNewMeal({ id: "", name: "", calories: 0, carbs: 0, protein: 0, fats: 0,date: new Date().toISOString().split('T')[0] }); // Reset after updating
            //fetchTotals(updatedMeals as Meal[]); // Refresh totals after updating a meal
            fetchMeals();
        } catch (error) {
            console.error("Error updating meal:", error);
        }
    };

    // Delete a meal
    const deleteMeal = async (index: number) => {
        const mealToDelete = meals[index];

        try {
            const response = await fetch(`http://157.245.242.118:3001/foods/${mealToDelete.id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete meal");

            setMeals(meals.filter((_, i) => i !== index)); // Remove meal from frontend list
            fetchMeals(); // Refresh totals after deleting a meal
        } catch (error) {
            console.error("Error deleting meal:", error);
        }
    };

    // Edit an existing meal
    const editMeal = (index: number) => {
        setEditingIndex(index);
        const { id, name, calories, carbs, protein, fats, date } = meals[index];
        setNewMeal({ id, name, calories, carbs, protein, fats, date }); // Include the id when editing
    };


    //Shows/hides macros, edit, delete button
    const show_meal_options = (index: number) => {
        setActiveMealIndex(activeMealIndex === index ? null : index);

    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                {/* Left Section - Macros */}
                <div className="macros-container">
                    <h1 className="dashboard-title">User Dashboard</h1>
                    <div id='macros-content'>
                        <div className="macros-circle">
                            <h2>Macros</h2>
                            <p>Carbs: #/# grams</p>
                            <p>Protein: #/# grams</p>
                            <p>Fats: #/# grams</p>
                        </div>
                        <div className="calories-summary">Calories: Eaten/Allowed</div>
                    </div>
                </div>

                {/* Right Section - Meals */}
                <div className="meals-container">
                <div className="meals-header">
                        <h2>Today's Meals</h2>
                        <button className="add-meal-button" onClick={addMeal}>
                            {editingIndex !== null ? "Update Meal" : "Add New Meal"}
                        </button>
                    </div>
                    <div className="meal-form">
                        <div className="meal-form-part">
                            <input
                                type="text"
                                placeholder="Meal name"
                                value={newMeal.name}
                                onChange={(e) =>
                                    setNewMeal({...newMeal, name: e.target.value})
                                }
                                className="meal-input"
                            />
                            <input
                                type="number"
                                placeholder="Calories"
                                value={newMeal.calories}
                                onChange={(e) =>
                                    setNewMeal({...newMeal, calories: parseInt(e.target.value) || 0})
                                }
                                className="meal-input"
                            />

                        </div>

                        <div className="meal-form-part">
                            <input
                                type="number"
                                placeholder="Carbs (g)"
                                value={newMeal.carbs}
                                onChange={(e) =>
                                    setNewMeal({...newMeal, carbs: parseInt(e.target.value) || 0})
                                }
                                className="meal-input"
                            />
                            <input
                                type="number"
                                placeholder="Protein (g)"
                                value={newMeal.protein}
                                onChange={(e) =>
                                    setNewMeal({...newMeal, protein: parseInt(e.target.value) || 0})
                                }
                                className="meal-input"
                            />
                            <input
                                type="number"
                                placeholder="Fats (g)"
                                value={newMeal.fats}
                                onChange={(e) =>
                                    setNewMeal({...newMeal, fats: parseInt(e.target.value) || 0})
                                }
                                className="meal-input"
                            />
                        </div>

                    </div>
                    <ul className="meals-list">
                        {Array.isArray(meals) && meals.map((meal, index) => (
                            <li className="meal-item" key={index}>
                                <button onClick={() => show_meal_options(index)}> Show options</button>
                                <div className="meal-info">
                                    <span className="meal-name">{meal.name}</span>
                                    <span className="meal-calories">{meal.calories} cal</span>
                                </div>
                                <div className={`meal-options ${activeMealIndex === index ? 'active' : ''}`}>
                                    <span
                                        className="dots-menu"
                                        onClick={() => editMeal(index)}
                                    >
                                        Edit
                                    </span>
                                    <span
                                        className="dots-menu"
                                        onClick={() => deleteMeal(index)}
                                    >
                                        Delete
                                    </span>
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


/*<div className="meal-info">
    <span className="meal-name">{meal.name}</span>
    <span className="meal-calories">{meal.calories} cal</span>
</div>
<div className="meal-options">
    <span
        className="dots-menu"
        onClick={() => editMeal(index)}
    >
        Edit
    </span>
    <span
        className="dots-menu"
        onClick={() => deleteMeal(index)}
    >
        Delete
    </span>
</div>
*/
