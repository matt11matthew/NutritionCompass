import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import './AccountDetails.css';

function AccountDetails() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [resetPassword, setResetPassword] = useState<string>('');
    const [confirmResetPassword, setConfirmResetPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const userId = localStorage.getItem('userId') || '';
    console.log('Retrieved userId from localStorage:', userId);

    // Fetch the user's information
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userId) {
                setStatusMessage('User not logged in');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://157.245.242.118:3001/users/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const data = await response.json();
                    const user = data.data; // Adjust if backend wraps data differently
                    console.log('Fetched user details:', user);

                    setFirstName(user.firstName || '');
                    setLastName(user.lastName || '');
                    setEmail(user.email || '');
                } else {
                    setStatusMessage('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setStatusMessage('An error occurred while fetching user details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    // Handle password confirmation
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setConfirmResetPassword(val);

        if (val !== resetPassword) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleResetPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResetPassword(e.target.value);
    };

    const handleSaveChanges = async () => {
        if (resetPassword !== confirmResetPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        // Data for resetting the password
        const passwordResetData = {
            userId,
            newPassword: resetPassword,
            confirmNewPassword: confirmResetPassword,
        };

        try {
            // Call the reset password endpoint
            const response = await fetch('http://157.245.242.118:3001/auth/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(passwordResetData),
            });

            if (response.ok) {
                setStatusMessage('Password reset successfully!');
            } else {
                const errorData = await response.json();
                setStatusMessage(errorData.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setStatusMessage('An error occurred while resetting the password');
        }
    };


    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
            <Box
                className="boxDiv"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 3,
                    border: '8px solid #0F3874',
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '80vw',
                    height: '80vh',
                    backgroundColor: 'rgba(15, 56, 116, 0.85)',
                    overflowY: 'auto',
                }}
            >
                <Typography variant="h4" className="inner-title" gutterBottom>
                    Account Details
                </Typography>

                {isLoading ? (
                    <Typography variant="body1">Loading...</Typography>
                ) : (
                    <>
                        <TextField
                            className="custom-textfield"
                            id="Email"
                            placeholder="Email Address"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={email}
                            inputProps={{
                                readOnly: true, // Makes the email field read-only
                            }}
                        />
                        <TextField
                            className="custom-textfield"
                            id="ResetPassword"
                            placeholder="Reset password"
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
                    </>
                )}
                {statusMessage && <Typography variant="body2" color="error">{statusMessage}</Typography>}
            </Box>
        </div>
    );
}

export default AccountDetails;
