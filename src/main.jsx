import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import { store } from './store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D3FD3',
    },
    secondary: {
      main: '#ae8df0',
    },
    tertiary: {
      main: '#e6ccff',
    },
    background: {
      paper: '#f4f4f4',
    },
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
