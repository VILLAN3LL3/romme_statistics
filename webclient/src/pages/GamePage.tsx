import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import { Alert, Button, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { GameRound } from "@romme/model";
import { gameDataLoader, GameDataQuery, useGameDataMutation } from "@romme/query";

import GameDataSavedSnackbar from "../components/GameDataSavedSnackbar";
import GameRoundForm from "../components/GameRoundForm";
import GameTable from "../components/GameTable";
import LoadingIndicator from "../components/LoadingIndicator";
import Section from "../components/Section";
import Statistics from "../components/Statistics";

export default function GamePage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof gameDataLoader>>>;
  const params = useParams();
  const { t } = useTranslation();
  const {
    data: { players, gameRounds, gameId },
    isLoading,
    error,
  } = useQuery({
    ...GameDataQuery(params.gameId ?? ""),
    initialData,
  });
  const navigate = useNavigate();

  const { mutate, error: mutationError } = useGameDataMutation(gameId, () => setIsSnackbarOpen(true));

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  function handleGameSave(newGameRound: GameRound) {
    mutate({ newGameRound, gameId });
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || mutationError) {
    return <Alert severity="error">{error?.message ?? mutationError?.message}</Alert>;
  }

  return (
    <>
      <GameDataSavedSnackbar open={isSnackbarOpen} onClose={() => setIsSnackbarOpen(false)} />
      <Stack spacing={5}>
        <Button size="large" variant="outlined" onClick={() => navigate("/")} startIcon={<ArrowBackRoundedIcon />}>
          {t("TO_THE_GAMES_OVERVIEW")}
        </Button>
        <Section title={t("CURRENT_ROUND")} Icon={SportsKabaddiRoundedIcon}>
          <Alert severity="info" sx={{ marginBottom: 4 }}>
            {players[gameRounds.length % players.length]} {t("MUST_DEAL_CARDS")} ...
          </Alert>
          <GameRoundForm onGameSave={handleGameSave} loading={isLoading} players={players} />
        </Section>
        <Section title={t("STATISTICS")} Icon={AutoGraphRoundedIcon}>
          <Statistics gameRounds={gameRounds} players={players} />
        </Section>
        <Section title={t("GAME_TABLE")} Icon={ListAltRounded}>
          <GameTable gameRounds={gameRounds} players={players} />
        </Section>
      </Stack>
    </>
  );
}
