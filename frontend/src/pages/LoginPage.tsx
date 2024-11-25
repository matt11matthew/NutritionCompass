import React from 'react';
import '../App.css';
import Login from '../components/Login';
import PageTitle from '../components/PageTitle';

interface LoginProps {
    onLogin: () => void;
}

const LoginPage: React.FunctionComponent<LoginProps> = ({ onLogin }) => {
    return (
        <div id="divTest" style={{width: "100vw", height: "100vh"}}>
            <div className="page-container" style={{width: "100vw", height: "90vh"}}>
                <Login onLogin={onLogin}/>
            </div>
        </div>
    );
}

export default LoginPage;
