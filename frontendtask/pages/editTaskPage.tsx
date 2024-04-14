import React from 'react';
import Layout from '../assets/layout';
import Header from '../assets/header';
import Footer from '../assets/footer';
import EditTask from '../Components/edidTask';  
import { Container, Typography } from '@mui/material';

export default function EditTaskPage() {  
  return (
    <Layout>
      <Header />
      <Container component="main" maxWidth="md" style={{ padding: '40px 0' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Edit Task
        </Typography>
        <EditTask />
      </Container>
      <Footer />
    </Layout>
  );
}
