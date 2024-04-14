import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b78b20',   
    },
    secondary: {
      main: '#000',   
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#000000',  
    },
    body2: {
      fontSize: '0.875rem',
      color: '#000000',   
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          
          fontSize: '1.25rem',
          fontWeight: 500,
          fontFamily: 'Roboto, Arial, sans-serif',   
          color: '#000000',   
        },
        body: {
 
          fontSize: '0.875rem',
          fontFamily: 'Roboto, sans-serif',   
          color: '#000000',  
        },
      },
    },
  },
});

export default theme;
