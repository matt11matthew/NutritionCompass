import React, { useState } from "react";
import "./UserDashboard.css";

function UserDashboard() {
    const [meals, setMeals] = useState<{ name: string; calories: number }[]>([]);
    const [newMeal, setNewMeal] = useState<{ name: string; calories: number }>({
        name: "",
        calories: 0,
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const addMeal = () => {
        if (!newMeal.name || newMeal.calories <= 0) {
            alert("Please enter a valid meal and calorie count.");
            return;
        }
        if (editingIndex !== null) {
            const updatedMeals = [...meals];
            updatedMeals[editingIndex] = newMeal;
            setMeals(updatedMeals);
            setEditingIndex(null);
        } else {
            setMeals([...meals, newMeal]);
        }
        setNewMeal({ name: "", calories: 0 });
    };

    const editMeal = (index: number) => {
        setEditingIndex(index);
        setNewMeal(meals[index]);
    };

    const deleteMeal = (index: number) => {
        setMeals(meals.filter((_, i) => i !== index));
    };

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
                    <ul className="meals-list">
                        {meals.map((meal, index) => (
                            <li className="meal-item" key={index}>
                                <div className="meal-info">
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
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
