import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserProfilePage from './pages/UserProfilePage';
import PageTitle from "./components/PageTitle";
import FoodListPage from './pages/FoodListPage';
import UserDashboardPage from "./pages/UserDashboardPage";
import Login from './components/Login';
import SignUp from "./components/SignUp";
import AccountDetailsPage from "./pages/AccountDetailsPage";

function App() {
    const[loggedIn, setLoggedIn] = React.useState(true);

    const handleLogout = () =>setLoggedIn(false);

    return (
        <Router>
            <div className="background-container">
                <PageTitle loggedIn={loggedIn} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/userprofile" element={<UserProfilePage />} />
                    <Route path="/food-list" element={<FoodListPage />} />
                    <Route path="/user-dashboard" element={<UserDashboardPage />} />
                    <Route path="/account-details" element={<AccountDetailsPage />} />
                    {/* You can add more routes here */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
