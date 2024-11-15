import React from "react";
import './FoodList.css';

function FoodList() {
    return (
        <div id='food-list-container'>
            <h2 id='food-list-title'>Food List</h2>
            <form id='food-search-form'>
                <label>Search for Foods</label>
                <input type='text' id='search-bar' placeholder="Search Food List"/>
            </form>
        </div>
    );
}

export default FoodList;