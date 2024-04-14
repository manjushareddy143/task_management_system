import React from 'react';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { ReactElement } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/themes';
interface LayoutProps {
    children: ReactNode;
  }
  

  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        backgroundImage: `url('https://odbx.weatherbysbank.com/digital/f35f7addaab8caba0bf37e7c6fc85d8b.jpg')`, // Set the URL to your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
    </ThemeProvider>
  );
};

export default Layout;
