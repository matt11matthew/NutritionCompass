import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PageTitle from "./components/PageTitle";
import Login from './components/Login';
import SignUp from "./components/SignUp";

function App() {
    return (
        <Router>
            <div className="background-container">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/" element={<SignUpPage />} />
                        {/* You can add more routes here */}
                    </Routes>
            </div>
        </Router>
    );
}

export default App;
