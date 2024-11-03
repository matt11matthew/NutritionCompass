import React from "react";
import { useNavigate } from 'react-router-dom';

interface HomeProps {
    loggedIn_email: string;
}

const Home: React.FC<HomeProps> = ({ loggedIn_email }) => {
    const nav = useNavigate();

    return (
        <div className="container">
            <div className="title">
                {/* You can add content here as needed */}
                <p>Email: {loggedIn_email}</p>
            </div>
        </div>
    );
};

export default Home;
