import "./App.css";

import i18n from "i18next";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

import { Container, createTheme, ThemeProvider } from "@mui/material";
import { deDE, enUS } from "@mui/material/locale";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { gameDataLoader, gameLoader } from "@romme/query";

import LoadingIndicator from "./LoadingIndicator";

const OverviewPage = lazy(() => import("../pages/OverviewPage"));
const GamePage = lazy(() => import("../pages/GamePage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

function App() {
  const locale = i18n.language === "en" ? enUS : deDE;
  const theme = { ...createTheme(), locale };
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
      <Suspense fallback={<LoadingIndicator />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
