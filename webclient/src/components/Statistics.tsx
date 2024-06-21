import { useTranslation } from "react-i18next";

import { Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { GameRoundVM } from "../game.model";
import { toLocalizedDateString } from "../utils/date.utils";
import {
  calculateLastWonGameRound,
  getGameRoundWithHighestScore,
  longestVonHandWinningStreak,
  longestWinningStreak,
  sumUpScore,
} from "../utils/game-round.utils";
import { calculatePercentage } from "../utils/number.utils";
import DiffChart from "./DiffChart";
import GameStatisticRow from "./GameStatisticRow";
import PlayerStatisticHeader from "./PlayerStatisticHeader";
import PlayerStatisticRow from "./PlayerStatisticRow";

export default function Statistics({
  gameRounds,
  players,
}: Readonly<{ gameRounds: GameRoundVM[]; players: string[] }>) {
  const { t } = useTranslation();
  if (gameRounds.length === 0) {
    return <Alert severity="info">{t("NO_GAME_DATA_AVAILABLE")}</Alert>;
  }

  const wonGamesCountByPlayer = new Map<string, number>();
  const wonGamesPercentageByPlayer = new Map<string, number>();
  const scoreByPlayer = new Map<string, number>();
  const longestWinningStreakByPlayer = new Map<string, number>();
  const vonHandWonGamesCountByPlayer = new Map<string, number>();
  const longestVonHandWinningStreakByPlayer = new Map<string, number>();
  const averageScoreByPlayer = new Map<string, number>();
  const lastWonByPlayer = new Map<string, number>();

  players.forEach((player) => {
    const wonGames = gameRounds.filter((game) => game.winner === player);
    const lostGames = gameRounds.filter((game) => game.winner !== player);
    const score = sumUpScore(lostGames);
    const wonGamesCount = wonGames.length;

    wonGamesCountByPlayer.set(player, wonGamesCount);
    wonGamesPercentageByPlayer.set(player, calculatePercentage(wonGamesCount, gameRounds.length));
    scoreByPlayer.set(player, score);
    longestWinningStreakByPlayer.set(player, longestWinningStreak(gameRounds, player));
    vonHandWonGamesCountByPlayer.set(player, wonGames.filter((g) => g.vonHand).length);
    longestVonHandWinningStreakByPlayer.set(player, longestVonHandWinningStreak(gameRounds, player));
    averageScoreByPlayer.set(player, lostGames.length ? score / lostGames.length : 0);
    lastWonByPlayer.set(player, calculateLastWonGameRound(gameRounds, player));
  });

  const gameWithHighestScore = getGameRoundWithHighestScore(gameRounds);

  return (
    <Grid container spacing={2}>
      <GameStatisticRow title={t("NUMBER_OF_GAME_ROUNDS")} value={gameRounds.length} />
      <GameStatisticRow
        title={t("HIGHEST_PROFIT")}
        value={`${gameWithHighestScore.totalScore} (${t("WON_BY")} ${
          gameWithHighestScore.winner
        } ${t("ON")} ${toLocalizedDateString(gameWithHighestScore.date)})`}
      />
      <Grid xs={12}>
        <hr />
      </Grid>
      <PlayerStatisticHeader players={players} />
      <PlayerStatisticRow
        title={t("TOTAL_MINUS_POINTS")}
        valueMap={scoreByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer < val)}
      />
      <PlayerStatisticRow
        title={t("NUMBER_OF_WON_GAME_ROUNDS")}
        valueMap={wonGamesCountByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
      />
      <PlayerStatisticRow
        title={t("PERCENTAGE_OF_GAME_ROUNDS_WON")}
        valueMap={wonGamesPercentageByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
        valueFn={(value) => `${value} %`}
      />
      <PlayerStatisticRow
        title={t("LONGEST_WINNING_STREAK")}
        valueMap={longestWinningStreakByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
      />
      <PlayerStatisticRow
        title={t("NUMBER_OF_IN_ONE_TURN_WON_GAME_ROUNDS")}
        valueMap={vonHandWonGamesCountByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
      />
      <PlayerStatisticRow
        title={t("LONGEST_ONE_TURN_WINNING_STREAK")}
        valueMap={longestVonHandWinningStreakByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
      />
      <PlayerStatisticRow
        title={t("AVERAGE_MINUS_POINTS")}
        valueMap={averageScoreByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer < val)}
        valueFn={(value) => value.toFixed(0)}
      />
      <PlayerStatisticRow
        title={t("LAST_WIN_HOW_MANY_ROUNDS_AGO")}
        valueMap={lastWonByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer < val)}
        valueFn={(value) => (value === 0 ? t("LAST_ROUND_WON") : value)}
      />
      <Grid xs={12}>
        <hr />
      </Grid>
      <Grid xs={12}>
        <DiffChart gameRounds={gameRounds} players={players} />
      </Grid>
    </Grid>
  );
}
