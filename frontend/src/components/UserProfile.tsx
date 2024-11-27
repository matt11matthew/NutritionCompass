import React, {useState, useEffect} from 'react';
import './UserProfile.css';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    const [isLoading, setIsLoading] = useState(true); //loading state
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

    //get the user data to populate the fields (if there is any):
    // i think how i set up userId should be fine line 19 and can delete line 26
    useEffect(() => {

        const fetchUserData = async () => {
            // const token = localStorage.getItem('token');
            if(!userId) {
                setStatusMessage('User not logged in');
                setIsLoading(false);
                return;
            }else{}
            try {
                // may need the package to decode the token to get userID.
                // Decode the token to get user info (userId)
                // const decodedToken = jwt_decode<{ userId: string }>(token);
                // const userId = localStorage.getItem('userId');
                // we dont need this line bc of line 19, okay, i think the error earlier was the userId in the [] at end

                const response = await fetch(`http://157.245.242.118:3001/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        //'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // setUserId(data._id); // Save the user's ID

                    // Population:
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setAge(data.age || '');
                    setWeight(data.weight || '');
                    setSex(data.sex || '');
                    setHeightFt(data.feet || '');
                    setHeightInches(data.inches || '');
                    setActivityLevel(data.activityLevel || '');
                    setWeightGoal(data.weightGoal || '');
                } else {
                    setStatusMessage('Enter information for calculation');
                }
            }catch(error){
                setStatusMessage('Failed to fetch user profile.');
                console.error(error);
            }finally {
                setIsLoading(false); // Set loading to false once data is fetched or if there's an error
            }
        };

        fetchUserData(); // idk if this line is gonna give us a problem, i had to ask chatgpt on that
        //said ir shouldnt matter
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //conv to json:
        const profileData = {
            firstName,
            lastName,
            age: Number(age), // Ensure age is sent as a number
            weight: Number(weight), // Ensure weight is sent as a number
            sex: sex.toUpperCase(), // Match backend enum for `sex`
            feet: Number(heightFt),
            inches: Number(heightInches),
            activityLevel: activityLevel.toUpperCase(), // Match backend enum
            weightGoal: weightGoal.toUpperCase(),
            // firstName,
            // lastName,
            // age,
            // weight,
            // sex,
            // feet: heightFt,
            // inches: heightInches,
            // activityLevel,
            // weightGoal
        };

        console.log(profileData);

        //im unfamiliar with the token system, so please review this GET.
        try{
            // const token = localStorage.getItem('userId');
            // if(!token){
            //     setStatusMessage('User not logged in');
            //     return;
            // }

            const response = await fetch(`http://157.245.242.118:3001/users/${userId}`, {
                method: 'PUT',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });
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
                <div>Loading...</div> //loading message
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

                <label>Age (lbs)</label>
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
                <div style={{display: 'flex', gap: '0.5vw'}}>
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
                    <option value="low">Low: &lt;7,500 steps/day</option>
                    <option value="moderate">Moderate: 7,500–9,999 steps/day</option>
                    <option value="high">High: &gt;10,000 steps/day</option>
                </select>

                <label>Weight Goal</label>
                <select
                    className="user-profile-select"
                    value={weightGoal}
                    onChange={(e) => setWeightGoal(e.target.value)}
                >
                    <option value="">Weight Goal</option>
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Weight</option>
                </select>

                <button type="submit" className="save-button">Save Changes</button>
            </form>
            )}

            {statusMessage && <div className="status-message">{statusMessage}</div>}
        </div>
    );
}

export default UserProfile;
