import React, {useEffect, useState} from 'react';
import {Button, TextField, Typography, Box, Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AccountDetails() {
    const navigate = useNavigate

    const[firstName, setFirstName] = useState<string>('');
    const[lastName, setLastName] = useState<string>('');
    const[email, setEmail] = useState<string>('');
    const[resetPassword, setResetPassword] = useState<string>('');
    const[confirmResetPassword, setConfirmResetPassword] = useState<string>('');
    const[confirmPasswordError, setConfirmPasswordError] = useState<string>('');

    //fetch the users information:
    useEffect(() => {
        const user = {firstName: 'tempFirst', lastName: 'tempLast', email: 'tempEmail@email.com'};
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
    }, []);

    //pass change:
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setConfirmResetPassword(val);
        //match check:
        if(val != resetPassword){
            setConfirmPasswordError('Passwords do not match');
        }else{
            setConfirmPasswordError('');
        }
    };

    const handleResetPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResetPassword(e.target.value);
    };

    const handleSaveChanges = () =>{
      if(resetPassword !== confirmResetPassword){
          setConfirmPasswordError('Passwords do not match');
          return;
      }
      const updatedData = {
          firstName,
          lastName,
          email,
          newPassword: resetPassword
      }
      console.log('User info updated successfully')

        //save the changes to the database here:
    };

    return (
        <div style={{width: "100vw", height: "100vh", display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
            <Box
                className="boxDiv"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Adds space between fields and buttons
                    padding: 3,
                    border: '8px solid #0F3874',
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '80vw',
                    height: '80vh', // Adjusted height to take up 80% of the screen
                    backgroundColor: 'rgba(15, 56, 116, 0.85)',
                    overflowY: 'auto', // Ensures scrollability if content overflows
                }}
            >
                <Typography variant="h4" className="inner-title" gutterBottom>
                    Account Details
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            className="custom-textfield"
                            id="FirstName"
                            placeholder="First Name"
                            type="name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="custom-textfield"
                            id="LastName"
                            placeholder="Last Name"
                            type="name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <TextField
                    className="custom-textfield"
                    id="Email"
                    placeholder="Email Address"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    className="custom-textfield"
                    id="ResetPassword"
                    placeholder="Reset Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={resetPassword}
                    onChange={handleResetPasswordChange}
                />
                <TextField
                    className="custom-textfield"
                    id="confirmResetPassword"
                    placeholder="Confirm Reset Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={confirmResetPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                />
                <Button
                    id="SaveChanges"
                    className="ncButton"
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChanges}
                    sx={{ marginTop: 3, width: '100%' }}
                >
                    Save Changes
                </Button>

                {/*idk if we want this button at all*/}
                {/*<Button*/}
                {/*    id="backButton"*/}
                {/*    className="ncButton"*/}
                {/*    variant="contained"*/}
                {/*    color="secondary"*/}
                {/*    sx={{ marginTop: 2 }}*/}
                {/*    // onClick={() => navigate()}*/}
                {/*>*/}
                {/*    Back To Dashboard*/}
                {/*</Button>*/}
            </Box>
        </div>
    );
}

export default AccountDetails;
