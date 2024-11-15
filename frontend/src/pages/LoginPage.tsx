import React from 'react';
import '../App.css';
import Login from '../components/Login';
import PageTitle from '../components/PageTitle';

function LoginPage() {
    return (
        <div id="divTest" style={{width: "100vw", height: "100vh"}}>
            <div className="page-container" style={{width: "100vw", height: "90vh"}}>
                <Login/>
            </div>
        </div>
    );
}

export default LoginPage;
