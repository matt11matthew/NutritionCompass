import React from 'react';
import '../App.css'; // If you have any global styles
import UserDashboard from '../components/UserDashboard';
import PageTitle from '../components/PageTitle';

function UserDashboardPage() {
    return (
        <div>
            <div className="page-container">
                <UserDashboard />
            </div>
        </div>
    );
}

export default UserDashboardPage;
