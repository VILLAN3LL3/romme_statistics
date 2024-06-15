import { useContext, useState } from "react";

import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import { Game } from "../game.model";
import { GameContext } from "../GameContext";
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
      <Snackbar
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={6000}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Spieldaten wurden gesichert!
        </Alert>
      </Snackbar>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h2">
          <SportsKabaddiRoundedIcon sx={{ fontSize: 40 }} /> Aktuelles Spiel
        </Typography>
        <Box
          sx={{
            borderRadius: 1,
            paddingX: 3,
            paddingY: 5,
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Alert severity="info" sx={{ marginBottom: 4 }}>
            {games.length % 2 === 0 ? "Micha" : "Mira"} muss Karten geben ...
          </Alert>
          <SpielForm onGameSave={handleGameSave} loading={loading} />
        </Box>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h2">
          <AutoGraphRoundedIcon sx={{ fontSize: 40 }} /> Statistik
        </Typography>
        <Statistics games={games} />
      </Box>
    </Stack>
  );
}
