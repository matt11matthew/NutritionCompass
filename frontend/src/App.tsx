import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/SignUpPage';
import PageTitle from "./components/PageTitle"; // Import a Register component
import Login from './components/Login';

function App() {
    return (
        <Router>
            <div className="background-container">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<RegisterPage />} />
                        {/* You can add more routes here */}
                    </Routes>
            </div>
        </Router>
    );
}

export default App;
