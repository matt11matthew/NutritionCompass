import React from 'react';
import '../App.css';
import Login from '../components/Login';
import PageTitle from '../components/PageTitle';

function LoginPage() {
    return (
        <div>
            <PageTitle />
            <div className="page-container">
                <h2>Test Change - Does This Show?</h2>
                <Login/>
            </div>
        </div>
    );
}

export default LoginPage;
