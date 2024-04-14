import React from 'react';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();  
  return (
    <footer style={{
        padding: '20px 0 40px 0',
        textAlign: 'center',
        marginTop: 'auto',
        backgroundColor: theme.palette.background.paper, 
        color: theme.palette.text.primary,  
    }}>
      © 2024 Task Management System
    </footer>
  );
};

export default Footer;
