
import { orange, pink, green, cyan } from '@mui/material/colors';

export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#5a8f6d',
    },
    secondary: {
      main: '#d9e5d6',
    },
    info: {
      main: '#7a9d84',
    },
    error: {
      main: '#d97706',
    },
    background: { 
      default: '#f0f5f3'
    }
  },
  typography: {
    h1: {
      fontSize: '4rem',
      fontFamily: 'Droid Sans',
    },
    h2: {
      fontSize: '3rem',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.7rem',
    },
    h5: {
      fontSize: '1.3rem',
    },
    h6: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1rem',
      letterSpacing: '0.05em',
      fontWeight: 400,
      lineHeight: 1.67,
    },
  },
  shape: {
    borderRadius: 4,
  },
};