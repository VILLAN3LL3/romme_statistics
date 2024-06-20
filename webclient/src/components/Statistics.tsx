import { Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { GameRoundVM } from "../game.model";
import {
  calculateLastWon,
  calculatePercentage,
  getGameWithHighestScore,
  longestVonHandWinningStreak,
  longestWinningStreak,
  sumUpScore,
  toGermanDateString,
} from "../utils";
import DiffChart from "./DiffChart";
import GameStatisticRow from "./GameStatisticRow";
import PlayerStatisticHeader from "./PlayerStatisticHeader";
import PlayerStatisticRow from "./PlayerStatisticRow";

export default function Statistics({
  gameRounds,
  players,
}: Readonly<{ gameRounds: GameRoundVM[]; players: string[] }>) {
  if (gameRounds.length === 0) {
    return <Alert severity="info">Keine Daten aus vergangenen Spielen vorhanden. Startet euer erstes Spiel!</Alert>;
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
    lastWonByPlayer.set(player, calculateLastWon(gameRounds, player));
  });

  const gameWithHighestScore = getGameWithHighestScore(gameRounds);

  return (
    <Grid container spacing={2}>
      <GameStatisticRow title="Anzahl Spiele" value={gameRounds.length} />
      <GameStatisticRow
        title="Höchster Gewinn"
        value={`${gameWithHighestScore.totalScore} (gewonnen von ${
          gameWithHighestScore.winner
        } am ${toGermanDateString(gameWithHighestScore.date)})`}
      />
      <Grid xs={12}>
        <hr />
      </Grid>
      <PlayerStatisticHeader players={players} />
      <PlayerStatisticRow
        title="Summe Minuspunkte"
        valueMap={scoreByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer < val)}
      />
      <PlayerStatisticRow
        title="Anzahl gewonnener Spiele"
        valueMap={wonGamesCountByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
      />
      <PlayerStatisticRow
        title="Anteil gewonnener Spiele"
        valueMap={wonGamesPercentageByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
        valueFn={(value) => `${value} %`}
      />
      <PlayerStatisticRow
        title="Längster Winning Streak"
        valueMap={longestWinningStreakByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
      />
      <PlayerStatisticRow
        title="Anzahl von Hand gewonnener Spiele"
        valueMap={vonHandWonGamesCountByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
      />
      <PlayerStatisticRow
        title="Längster von Hand Winning Streak"
        valueMap={longestVonHandWinningStreakByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer > val)}
      />
      <PlayerStatisticRow
        title="Durchschnittliche Minuspunkte pro verlorenem Spiel"
        valueMap={averageScoreByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer < val)}
        valueFn={(value) => value.toFixed(0)}
      />
      <PlayerStatisticRow
        title="Letzter Sieg vor wieviel Spielen?"
        valueMap={lastWonByPlayer}
        leaderFn={(valuePlayer, valueOthers) => valueOthers.every((val) => valuePlayer < val)}
        valueFn={(value) => (value === 0 ? "Letztes Spiel gewonnen!" : value)}
      />
      <Grid xs={12}>
        <hr />
      </Grid>
      <Grid xs={12}>
        <DiffChart games={gameRounds} players={players} />
      </Grid>
    </Grid>
  );
}
