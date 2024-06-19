import './App.css';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Container, createTheme, ThemeProvider } from '@mui/material';
import { deDE } from '@mui/material/locale';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { gameLoader } from '../game.query';
import ErrorPage from './ErrorPage';
import GamePage from './GamePage';

function App() {
  const theme = { ...createTheme(), deDE };
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <QueryClientProvider client={queryClient}>
          <Container fixed sx={{ my: 2, p: 5 }}>
            <Outlet />
          </Container>
        </QueryClientProvider>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":players",
          loader: gameLoader(queryClient),
          element: <GamePage />,
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
