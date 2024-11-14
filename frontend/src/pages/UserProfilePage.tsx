import React from 'react';
import '../App.css';
import Login from '../components/Login';
import PageTitle from '../components/PageTitle';

function UserProfilePage() {
    return (
        <div>
            <PageTitle />
            <div >
                <Login/>
            </div>
        </div>
    );
}

export default UserProfilePage;
