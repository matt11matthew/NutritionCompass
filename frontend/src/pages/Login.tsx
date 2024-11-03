import React from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

function Login() {
    function doLogin(event: React.FormEvent) : void {
        event.preventDefault();
        alert('doIt()');
    }

    return (
        <Box
            id="loginDiv"
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
            <Typography variant="h5" id="inner-title" gutterBottom>
                Login
            </Typography>
            <TextField
                id="loginName"
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                id="loginPassword"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <Button
                id="loginButton"
                variant="contained"
                color="primary"
                onClick={doLogin}
                sx={{ marginTop: 2 }}
            >
                Do It
            </Button>
            <Typography id="loginResult" sx={{ marginTop: 2 }}></Typography>
        </Box>
    );
}

export default Login;
