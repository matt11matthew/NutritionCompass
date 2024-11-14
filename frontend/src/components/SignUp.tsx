import React, {useState} from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

 function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [signupResult, setSignUpResult] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setEmailError('');
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError('');
    };

    //init nav:
     const navigate = useNavigate();
    //email validation:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = () => {
        let valid = true;
        //check email:
        if(!email || !emailRegex.test(email)) {
            setEmailError("Invalid Email");
            valid = false
        }else{
            setEmailError('');
        }

        //check password matching:
        if(password != confirmPassword){
            setConfirmPasswordError("Passwords do not match");
            valid = false;
        }else{
            setConfirmPasswordError('');
        }

        //call API if all is correct:
        if(valid){
            let Creation = true;
            //API call stuff, if it in invalid call, make Creation = false;
            //naviagtion to /accountInfo
            try{
                //api stuff:
                // response will be the call
                const response =  fetch('http://nc-api.matthewe.me/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                console.log(response);
            }catch(error){
                setSignUpResult('Failed to create account.');
            }
        }
    }


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
                    id="email"
                    placeholder="Email Address"
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
                    id="signUpPassword"
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    error = {!!passwordError}
                    helperText = {passwordError}
                />
                <TextField
                    className="custom-textfield"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error = {!!confirmPasswordError}
                    helperText = {confirmPasswordError}
                />
                <Button
                    id="CreateAccount"
                    className="ncButton"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    sx={{ marginTop: 2 }}
                >
                    Create Account
                </Button>
            </Box>
        </div>
    );
}

export default SignUp;
