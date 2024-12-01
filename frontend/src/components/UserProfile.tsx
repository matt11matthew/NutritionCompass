import React, { useState, useEffect } from 'react';
import './UserProfile.css';

function UserProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');
    const [heightFt, setHeightFt] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [weightGoal, setWeightGoal] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const userId = localStorage.getItem('userId') || '';
    console.log('Retrieved userId from localStorage:', userId);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setStatusMessage('User not logged in');
                setIsLoading(false);
                return;
            }
            console.log('Fetching user data for userId:', userId);
            try {
                const response = await fetch(`https://nc-api.matthewe.me/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Fetch response status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    const userData = data.data;
                    console.log('Fetched user data:', data);

                    setFirstName(userData.firstName || '');
                    setLastName(userData.lastName || '');
                    setAge(userData.age !== undefined ? userData.age.toString() : '');
                    setWeight(userData.weight !== undefined ? userData.weight.toString() : '');
                    setSex(userData.sex ? userData.sex.toLowerCase() : '');
                    setHeightFt(userData.feet !== undefined ? userData.feet.toString() : '');
                    setHeightInches(userData.inches !== undefined ? userData.inches.toString() : '');
                    setActivityLevel(userData.activityLevel ? userData.activityLevel.toLowerCase() : '');
                    setWeightGoal(userData.weightGoal !== undefined ? userData.weightGoal.toString() : '');
                } else {
                    setStatusMessage('Enter information for calculation');
                }
            } catch (error) {
                setStatusMessage('Failed to fetch user profile.');
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('User ID:', userId);

        const profileData = {
            firstName,
            lastName,
            age: Number(age),
            weight: Number(weight),
            sex: sex.toUpperCase(),
            feet: Number(heightFt),
            inches: Number(heightInches),
            activityLevel: activityLevel.toUpperCase(),
            weightGoal: Number(weightGoal),
        };

        console.log(profileData);

        try {
            const response = await fetch(`https://nc-api.matthewe.me/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });
            console.log('Response status:', response.status);
            console.log('Response body:', await response.text());
            if (response.ok) {
                setStatusMessage('Profile saved successfully!');
            } else {
                setStatusMessage('Failed to save profile.');
            }
        } catch (error) {
            setStatusMessage('An error occurred while saving the profile.');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="user-profile-container">
            <h2 className="user-profile-title">User Profile</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <form className="user-profile-form" onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input
                        type="text"
                        className="user-profile-input"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        className="user-profile-input"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label>Age (years)</label>
                    <input
                        type="text"
                        className="user-profile-input"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <label>Weight (lbs)</label>
                    <input
                        type="text"
                        className="user-profile-input"
                        placeholder="Weight (lbs)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />

                    <label>Sex</label>
                    <select
                        className="user-profile-select"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <label>Height (feet inches)</label>
                    <div style={{ display: 'flex', gap: '0.5vw' }}>
                        <select
                            className="user-profile-select"
                            value={heightFt}
                            onChange={(e) => setHeightFt(e.target.value)}
                        >
                            <option value="">Ft</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <select
                            className="user-profile-select"
                            value={heightInches}
                            onChange={(e) => setHeightInches(e.target.value)}
                        >
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

                    <label>Activity Level</label>
                    <select
                        className="user-profile-select"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                    >
                        <option value="">Activity Level</option>
                        <option value="low">Low: exercise 1-3 times/week</option>
                        <option value="medium">Medium: exercise 4-5 times/week</option>
                        <option value="high">High: exercise 6-7 times/week</option>
                    </select>

                    <label>Weight Goal (lbs)</label>
                    <input
                        type="number"
                        className="user-profile-input"
                        placeholder="Enter Weight Goal"
                        value={weightGoal}
                        onChange={(e) => setWeightGoal(e.target.value)}
                    />

                    <button type="submit" className="save-button">Save Changes</button>
                </form>
            )}

            {statusMessage && <div className="status-message">{statusMessage}</div>}
        </div>
    );
}

export default UserProfile;
