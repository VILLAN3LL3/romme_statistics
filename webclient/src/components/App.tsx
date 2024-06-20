import "./App.css";

import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

import { Container, createTheme, ThemeProvider } from "@mui/material";
import { deDE } from "@mui/material/locale";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { gameDataLoader, gameLoader } from "../game.query";
import ErrorPage from "./ErrorPage";
import GamePage from "./GamePage";
import OverviewPage from "./OverviewPage";

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
          path: "/",
          element: <Navigate to="games" replace={true} />,
        },
        {
          path: "/games",
          loader: gameLoader(queryClient),
          element: <OverviewPage />,
        },
        {
          path: "/games/:gameId",
          loader: gameDataLoader(queryClient),
          element: <GamePage />,
        },
        {
          path: "*",
          element: <Navigate to="games" replace={true} />,
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
