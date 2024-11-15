import React from 'react';
import './UserProfile.css';

function UserProfile() {
    return (
        <div className="user-profile-container">
            <h2 className="user-profile-title">User Profile</h2>
            <form className="user-profile-form">
                <label>First Name</label>
                <input type="text" className="user-profile-input" placeholder="First Name" />

                <label>Last Name</label>
                <input type="text" className="user-profile-input" placeholder="Last Name" />

                <label>Weight (lbs)</label>
                <input type="text" className="user-profile-input" placeholder="Weight (lbs)" />

                <label>Sex</label>
                <select className="user-profile-select">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label>Height (feet inches)</label>
                <div style={{ display: 'flex', gap: '0.5vw' }}>
                    <select className="user-profile-select">
                        <option value="">Ft</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <select className="user-profile-select">
                        <option value="">In</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                </div>

                <div className="activity-level-container">
                    <p>Select Activity Level</p>
                    <p>Low: &lt;7,500 steps/day</p>
                    <p>Moderate: 7,500–9,999 steps/day</p>
                    <p>High: &gt;10,000 steps/day</p>
                </div>

                <label>Activity Level</label>
                <select className="user-profile-select">
                    <option value="">Activity Level</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                </select>

                <label>Weight Goal</label>
                <select className="user-profile-select">
                    <option value="">Weight Goal</option>
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Weight</option>
                </select>

                <button type="button" className="save-button">Save Changes</button>
            </form>
        </div>
    );
}

export default UserProfile;
