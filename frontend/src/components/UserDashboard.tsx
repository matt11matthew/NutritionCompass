import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

    useEffect(() => {
        if (userId) fetchMeals();
    }, [userId]);

    // Fetch all meals associated with a user
    const fetchMeals = async () => {
        try {
            const response = await fetch(`http://157.245.242.118:3001/foods/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch meals");
            const data = await response.json();
            setMeals(data.data); // Adjusted to match backend's response format
            fetchTotals(data.data); // Calculate totals
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

        const mealData = { ...newMeal, userId };

        try {
            const response = await fetch(`http://157.245.242.118:3001/foods`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mealData),
            });

            if (!response.ok) throw new Error("Failed to add meal");

            const addedMeal = await response.json();
            setMeals([...meals, addedMeal.data]); // Updated to match backend response
            setNewMeal({ _id: "", name: "", calories: 0, carbs: 0, protein: 0, fats: 0, date: new Date().toISOString().split("T")[0] });
            fetchTotals([...meals, addedMeal.data]); // Refresh totals
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
            const response = await fetch(`http://157.245.242.118:3001/foods/${userId}/${updatedMeal._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedMeal),
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

        try {
            const response = await fetch(`http://157.245.242.118:3001/foods/${userId}/${mealToDelete._id}`, {
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

    const showMealOptions = (index: number) => {
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
                            <h2>Macros</h2>
                            <p>Carbs: {totals.carbs} grams</p>
                            <p>Protein: {totals.protein} grams</p>
                            <p>Fats: {totals.fats} grams</p>
                        </div>
                        <div className="calories-summary">Calories: {totals.calories} cal</div>
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
                                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                                className="meal-input"
                            />
                            <input
                                type="number"
                                placeholder="Calories"
                                value={newMeal.calories}
                                onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) || 0 })}
                                className="meal-input"
                            />
                        </div>

                        <div className="meal-form-part">
                            <input
                                type="number"
                                placeholder="Carbs (g)"
                                value={newMeal.carbs}
                                onChange={(e) => setNewMeal({ ...newMeal, carbs: parseInt(e.target.value) || 0 })}
                                className="meal-input"
                            />
                            <input
                                type="number"
                                placeholder="Protein (g)"
                                value={newMeal.protein}
                                onChange={(e) => setNewMeal({ ...newMeal, protein: parseInt(e.target.value) || 0 })}
                                className="meal-input"
                            />
                            <input
                                type="number"
                                placeholder="Fats (g)"
                                value={newMeal.fats}
                                onChange={(e) => setNewMeal({ ...newMeal, fats: parseInt(e.target.value) || 0 })}
                                className="meal-input"
                            />
                        </div>
                    </div>
                    <ul className="meals-list">
                        {meals.map((meal, index) => (
                            <li key={index} className="meal-item">
                                <button onClick={() => showMealOptions(index)}>Show Options</button>
                                <div className="meal-info">
                                    <span className="meal-name">{meal.name}</span>
                                    <span className="meal-calories">{meal.calories} cal</span>
                                </div>
                                <div className={`meal-options ${activeMealIndex === index ? "active" : ""}`}>
                                    <span className="dots-menu" onClick={() => editMeal(index)}>
                                        Edit
                                    </span>
                                    <span className="dots-menu" onClick={() => deleteMeal(index)}>
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
