import React from 'react';
import '../App.css'; // If you have any global styles
import AccountDetails from '../components/AccountDetails';
import PageTitle from '../components/PageTitle';

function AccountDetailsPage() {
    return (
        <div>
            <div className="page-container">
                <AccountDetails />
            </div>
        </div>
    );
}

export default AccountDetailsPage;
