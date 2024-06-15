import { useContext } from "react";

import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { Game } from "./game.model";
import { GameContext } from "./GameContext";
import { SpielForm } from "./SpielForm";
import Statistics from "./Statistics";

export default function Page() {
  const { games, error, loading, saveGame } = useContext(GameContext);

  function handleGameSave(game: Game) {
    saveGame?.(game);
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
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h2">Spiel</Typography>
        <Typography variant="subtitle1">
          <em>
            {games.length % 2 === 0 ? "Micha" : "Mira"} muss Karten geben ...
          </em>
        </Typography>
        <Box
          sx={{
            borderRadius: 3,
            paddingX: 3,
            paddingY: 5,
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <SpielForm onGameSave={handleGameSave} loading={loading} />
        </Box>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h2">Statistik</Typography>
        <Statistics games={games} />
      </Box>
    </Stack>
  );
}
