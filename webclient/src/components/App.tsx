import "./App.css";

import { Container, createTheme, ThemeProvider } from "@mui/material";
import { deDE } from "@mui/material/locale";

import { GameProvider } from "../GameContext";
import Page from "./Page";

function App() {
  const theme = { ...createTheme(), deDE };

  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <Container fixed sx={{ my: 2, p: 5 }}>
          <Page />
        </Container>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
