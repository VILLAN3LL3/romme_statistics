import { useContext, useState } from "react";

import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import { Alert, Backdrop, CircularProgress, Stack } from "@mui/material";

import { Game } from "../game.model";
import { GameContext } from "../GameContext";
import GameDataSavedSnackbar from "./GameDataSavedSnackbar";
import GameTable from "./GameTable";
import Section from "./Section";
import { SpielForm } from "./SpielForm";
import Statistics from "./Statistics";

export default function Page() {
  const { games, players, error, loading, saveGame } = useContext(GameContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  console.log(players);
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
        <Alert severity="info" sx={{ marginBottom: 4 }}>
          {players[games.length % players.length]} muss Karten geben ...
        </Alert>
        <SpielForm
          onGameSave={handleGameSave}
          loading={loading}
          players={players}
        />
      </Section>
      <Section title="Statistik" Icon={AutoGraphRoundedIcon}>
        <Statistics games={games} players={players} />
      </Section>
      <Section title="Spieltabelle" Icon={ListAltRounded}>
        <GameTable games={games} players={players} />
      </Section>
    </Stack>
  );
}
