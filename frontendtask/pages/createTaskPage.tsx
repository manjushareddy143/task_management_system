import React from 'react';
import Layout from '../assets/layout';
import Header from '../assets/header';
import Footer from '../assets/footer';
import CreateTask from '../Components/createTask';
import { Container, Typography } from '@mui/material';

export default function CreateTaskPage() {
  return (
    <Layout>
      <Header />
      <Container component="main" maxWidth="md" style={{ padding: '20px 0 40px 0' }}>
   
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add Task
        </Typography>
        <CreateTask />
      </Container>
      <Footer />
    </Layout>
  );
}
