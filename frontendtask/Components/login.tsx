import { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { TextField, Button, Grid, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link'

const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      token
    }
  }
`;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  const [executeLogin, { loading, error, data }] = useLazyQuery(LOGIN_QUERY, {
    variables: { email, password },
    onCompleted: data => {
      const token = data?.login?.token;
      if (token) {
        localStorage.setItem('token', token);  
        setSnackbarOpen(true);
        setTimeout(() => {
          router.push('/taskListPage');  
        }, 3000);
      }
    }
  });

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    executeLogin();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
 
    const generateToken = () => {
      executeLogin();
    };
 
    generateToken();
    const intervalId = setInterval(generateToken, 3600000); 

     
    return () => clearInterval(intervalId);
  }, []);  

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
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
            <Button type="submit" variant="contained" color="primary" disabled={loading}>Login</Button>
            <p><Link href="/createAccountpage" passHref>  Create  Account </Link></p>
          </form>
        </Paper>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Login successful!
        </Alert>
      </Snackbar>
    </Grid>
  );
}
