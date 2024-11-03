import React, {useState} from "react";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function handleSubmit() {

}

function RegisterPage() {

    const [email, setEmail] = useState(''); // Initialize the state for email
    const [password, setPassword] = useState(''); // Initialize the state for email

    //should prevent def. on e

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
        </div>
    );
}

export default RegisterPage;
