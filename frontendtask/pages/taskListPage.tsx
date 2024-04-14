import React from 'react';
import TaskList from '../Components/taskList';
import Layout from '../assets/layout'; 
import Header from '../assets/header';
import Footer from '../assets/footer';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function taskListPage() {
  return (
    <div>
       <Layout>
      <Header />
      <div style={{ flex: 1, padding: '20px 0 40px 0' }}>  
        <h3 style={{ textAlign: 'left', padding: '10px' }}>
          <Link href="/createTaskPage" passHref>
            <Button variant="contained" color="primary" style={{ margin: '10px' }}>
              Create Task
            </Button>
          </Link>
        </h3>
        <TaskList />
      </div>
      <Footer />
    </Layout>
    </div>
  )
}
