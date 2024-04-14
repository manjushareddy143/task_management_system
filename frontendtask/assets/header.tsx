import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('token');

 
    setIsLoggedIn(false);

    
    router.push('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ flexGrow: 1, textAlign: 'center', color: (theme) => theme.palette.primary.contrastText }}
        >
          Tasks Management System
        </Typography>
        {isLoggedIn && (
          <Box sx={{ flexGrow: 0, textAlign: 'right' }}>
            <Button 
              color="inherit" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
