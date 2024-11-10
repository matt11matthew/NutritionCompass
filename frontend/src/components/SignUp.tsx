import React, {useState} from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import './Login.css';

 function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
     const [loginResult, setLoginResult] = useState<string>(''); // State for displaying login feedback

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function doLogin(event: React.FormEvent) : void {
        // event.preventDefault();\

        // Perform final email validation before submission
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        console.log(email);
        console.log(password);

        try {
            const response =  fetch('http://nc-api.matthewe.me/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            console.log(response);
            // if (response.ok) {
            //     setLoginResult('Login successful!');
            //     console.log('User data:', data);
            //     // Optionally, redirect or save token
            // } else {
            //     setLoginResult(data.errors ? data.errors.map(error => error.msg).join(', ') : 'Login failed');
            // }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginResult('An error occurred. Please try again.');
        }

    }
    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const inputEmail = event.target.value;
        setEmail(inputEmail);

        // Check if the email is valid
        if (!emailRegex.test(inputEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    }
    /*
    .boxDiv{
  background-color: rgba(15, 56, 116, 0.8);
  border: 10px solid rgba(15, 56, 116, 1);
}

.ncButton {
  color: #0F3874;
  background-color: #E2D5C4;
  font-weight: bold;
}
.inner-title{
  color: #E2D5C4;
  font-size: 28px;
}


     */
    return (
        <div>
            <Box
                className="boxDiv"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    boxShadow: 1,
                    maxWidth: 400,
                    margin: 'auto',
                    marginTop: 5
                }}
            >
                <Typography variant="h5" className="inner-title" gutterBottom>
                    Sign Up
                </Typography>
                <TextField
                    className="custom-textfield"
                    id="loginName"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    className="custom-textfield"
                    id="loginPassword"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button

                    id="loginButton"
                    className="ncButton"
                    variant="contained"
                    color="primary"
                    onClick={doLogin}
                    sx={{ marginTop: 2 }}
                >
                    Login
                </Button>
                {/* Display login result message */}
                <Typography id="loginResult" sx={{ marginTop: 2 }}>
                    {loginResult}
                </Typography>

                <Button
                    id="signUpButton"
                    className="ncButton"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => {
                        // Redirect to the sign-up page or handle sign-up logic
                        console.log('Redirect to sign-up page');
                    }}
                >
                    Sign Up
                </Button>
            </Box>
        </div>
    );
}

export default SignUp;