import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import { Alert, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Game } from "../game.model";
import { gameDataLoader, GameDataQuery, getGameDataQueryKey } from "../game.query";
import { postGameData } from "../game.service";
import GameDataSavedSnackbar from "./GameDataSavedSnackbar";
import GameTable from "./GameTable";
import LoadingIndicator from "./LoadingIndicator";
import Section from "./Section";
import SpielForm from "./SpielForm";
import Statistics from "./Statistics";

export default function GamePage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof gameDataLoader>>>;
  const params = useParams();
  const {
    data: { players, games },
    isLoading,
    error,
  } = useQuery({
    ...GameDataQuery(params.players?.split("_") ?? []),
    initialData,
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postGameData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGameDataQueryKey(players) });
      setIsSnackbarOpen(true);
    },
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  function handleGameSave(newGame: Game) {
    mutate({ newGame, players });
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Stack spacing={5}>
      <GameDataSavedSnackbar open={isSnackbarOpen} onClose={() => setIsSnackbarOpen(false)} />
      <Section title="Aktuelles Spiel" Icon={SportsKabaddiRoundedIcon}>
        <Alert severity="info" sx={{ marginBottom: 4 }}>
          {players[games.length % players.length]} muss Karten geben ...
        </Alert>
        <SpielForm onGameSave={handleGameSave} loading={isLoading} players={players} />
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
