import React from 'react';
import '../App.css'; // If you have any global styles
import UserProfile from '../components/UserProfile'; // Path to UserProfile component
import PageTitle from '../components/PageTitle'; // Assuming you want the header here as well

function UserProfilePage() {
    return (
        <div>
            <div className="page-container">
                <UserProfile />
            </div>
        </div>
    );
}

export default UserProfilePage;
