import { useState, useEffect } from 'react';
 
import { TextField, Button, Grid, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link'

import { useMutation, gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;


export default function CreateAccount() {
    const [username, setusername] = useState('');


const [confirmPassword, setConfirmPassword] = useState('');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const router = useRouter();
  
    const [executeCreateAccount, { loading, error, data }] = useMutation(REGISTER_MUTATION, {
      variables: { username, email, password },
      onCompleted: data => {
        setSnackbarOpen(true);
        setTimeout(() => {
          router.push('/');  // Assuming you have a login route to redirect to
        }, 3000);
      },
      onError: (error) => {
        console.error("Error registering the user:", error);
        setSnackbarOpen(true); // Optionally handle errors differently
      }
    });
  
    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        setSnackbarOpen(true);
        setSnackbarMessage('Passwords do not match');
        setSnackbarSeverity('error');
        return; 
      }
      executeCreateAccount();
    };
  
    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };
  
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Create Account</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="username"
                value={username}
                onChange={e => setusername(e.target.value)}
                label="Username"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                label="Password"
                fullWidth
                required
                margin="normal"
              />
              <TextField
  type="password"
  name="confirmPassword"
  value={confirmPassword}
  onChange={e => setConfirmPassword(e.target.value)}
  label="Confirm Password"
  fullWidth
  required
  margin="normal"
/>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>Create Account</Button>
            </form>
          </Paper>
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"}>
            {error ? "Registration failed: " + error.message : "Registration successful, please login!"}
          </Alert>
        </Snackbar>
      </Grid>
    );
  }

function setSnackbarMessage(arg0: string) {
    throw new Error('Function not implemented.');
}

function setSnackbarSeverity(arg0: string) {
    throw new Error('Function not implemented.');
}
  