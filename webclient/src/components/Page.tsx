import { useContext, useState } from "react";

import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Paper,
  Snackbar,
  Stack,
} from "@mui/material";

import { Game } from "../game.model";
import { GameContext } from "../GameContext";
import GameDataSavedSnackbar from "./GameDataSavedSnackbar";
import Section from "./Section";
import { SpielForm } from "./SpielForm";
import Statistics from "./Statistics";

export default function Page() {
  const { games, error, loading, saveGame } = useContext(GameContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  function handleGameSave(game: Game) {
    saveGame?.(game);
    setIsSnackbarOpen(true);
  }

  if (loading) {
    return (
      <Backdrop
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Stack spacing={5}>
      <GameDataSavedSnackbar
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
      />
      <Section title="Aktuelles Spiel" Icon={SportsKabaddiRoundedIcon}>
        <Paper sx={{ paddingX: 3, paddingY: 5 }}>
          <Alert severity="info" sx={{ marginBottom: 4 }}>
            {games.length % 2 === 0 ? "Micha" : "Mira"} muss Karten geben ...
          </Alert>
          <SpielForm onGameSave={handleGameSave} loading={loading} />
        </Paper>
      </Section>
      <Section title="Statistik" Icon={AutoGraphRoundedIcon}>
        <Statistics games={games} />
      </Section>
      <Section title="Spielauflistung" Icon={ListAltRounded}></Section>
    </Stack>
  );
}
