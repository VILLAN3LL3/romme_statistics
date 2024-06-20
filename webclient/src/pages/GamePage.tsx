import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import { Alert, Button, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import GameDataSavedSnackbar from "../components/GameDataSavedSnackbar";
import GameTable from "../components/GameTable";
import LoadingIndicator from "../components/LoadingIndicator";
import Section from "../components/Section";
import SpielForm from "../components/SpielForm";
import Statistics from "../components/Statistics";
import { GameRound } from "../game.model";
import { gameDataLoader, GameDataQuery, getGameDataQueryKey } from "../game.query";
import { postGameData } from "../game.service";

export default function GamePage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof gameDataLoader>>>;
  const params = useParams();
  const {
    data: { players, gameRounds, gameId },
    isLoading,
    error,
  } = useQuery({
    ...GameDataQuery(params.gameId ?? ""),
    initialData,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: postGameData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGameDataQueryKey(gameId) });
      setIsSnackbarOpen(true);
    },
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  function handleGameSave(newGameRound: GameRound) {
    mutate({ newGameRound, gameId });
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <>
      <GameDataSavedSnackbar open={isSnackbarOpen} onClose={() => setIsSnackbarOpen(false)} />
      <Stack spacing={5}>
        <Button size="large" variant="outlined" onClick={() => navigate("/")} startIcon={<ArrowBackRoundedIcon />}>
          Zur Übersicht
        </Button>
        <Section title="Aktuelles Spiel" Icon={SportsKabaddiRoundedIcon}>
          <Alert severity="info" sx={{ marginBottom: 4 }}>
            {players[gameRounds.length % players.length]} muss Karten geben ...
          </Alert>
          <SpielForm onGameSave={handleGameSave} loading={isLoading} players={players} />
        </Section>
        <Section title="Statistik" Icon={AutoGraphRoundedIcon}>
          <Statistics gameRounds={gameRounds} players={players} />
        </Section>
        <Section title="Spieltabelle" Icon={ListAltRounded}>
          <GameTable gameRounds={gameRounds} players={players} />
        </Section>
      </Stack>
    </>
  );
}
