import React from 'react';
import Layout from '../assets/layout';
import Header from '../assets/header';
import Footer from '../assets/footer'; import { Container, Typography } from '@mui/material';
import LoginForm from '../Components/login'
import CreateAccount from '../Components/createAccount'


export default function createAccountpage() {
  return (
    <Layout>
    <Header />
    <Container component="main" maxWidth="md" style={{ padding: '20px 0 40px 0' }}>
 
      <Typography variant="h4" component="h1" gutterBottom align="center">
      Create   an Account
      </Typography>
      <CreateAccount></CreateAccount>
    </Container>
    <Footer />
  </Layout>
  )
}
