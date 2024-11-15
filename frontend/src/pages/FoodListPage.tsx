import React from 'react';
import '../App.css'; // If you have any global styles
import FoodList from '../components/FoodList'; // Path to FoodList component
import PageTitle from '../components/PageTitle'; // Assuming you want the header here as well

function FoodListPage() {
    return (
        <div>
            <div className="page-container">
                <FoodList />
            </div>
        </div>
    );
}

export default FoodListPage;