import './App.css';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Container, createTheme, ThemeProvider } from '@mui/material';
import { deDE } from '@mui/material/locale';

import { GameProvider } from '../GameContext';
import Page from './Page';

function App() {
  const theme = { ...createTheme(), deDE };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Container fixed sx={{ my: 2, p: 5 }}>
          <Outlet />
        </Container>
      ),
      children: [
        {
          path: ":players",
          element: (
            <GameProvider>
              <Page />
            </GameProvider>
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
