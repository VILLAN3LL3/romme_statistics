import { Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { GameVM } from "../game.model";
import {
  calculateLastWon,
  calculatePercentage,
  getGameWithHighestScore,
  longestVonHandWinningStreak,
  longestWinningStreak,
  sumUpScore,
} from "../utils";
import GameStatisticRow from "./GameStatisticRow";
import PlayerStatisticHeader from "./PlayerStatisticHeader";
import PlayerStatisticRow from "./PlayerStatisticRow";

export default function Statistics({ games }: Readonly<{ games: GameVM[] }>) {
  if (games.length === 0) {
    return (
      <Alert severity="info">
        Keine Daten aus vergangenen Spielen vorhanden.
      </Alert>
    );
  }
  const miraWonGames = games.filter((game) => game.winner === "Mira");
  const michaWonGames = games.filter((game) => game.winner === "Micha");
  const miraWonGamesPercentage = calculatePercentage(
    miraWonGames.length,
    games.length
  );
  const michaWonGamesPercentage = calculatePercentage(
    michaWonGames.length,
    games.length
  );

  const gameWithHighestScore = getGameWithHighestScore(games);
  const miraScore = sumUpScore(michaWonGames);
  const michaScore = sumUpScore(miraWonGames);

  return (
    <Grid container spacing={2}>
      <GameStatisticRow title="Anzahl Spiele" value={games.length} />
      <GameStatisticRow
        title="Höchster Gewinn"
        value={`${gameWithHighestScore.totalScore} (gewonnen von ${
          gameWithHighestScore.winner
        } am ${new Date(gameWithHighestScore.date).toLocaleDateString(
          "de-DE"
        )})`}
      />
      <PlayerStatisticHeader />
      <PlayerStatisticRow
        title="Summe Minuspunkte"
        valueMicha={michaScore}
        valueMira={miraScore}
        successCalcMira={(valueMira, valueMicha) => valueMira < valueMicha}
      />
      <PlayerStatisticRow
        title="Anzahl gewonnener Spiele"
        valueMicha={michaWonGames.length}
        valueMira={miraWonGames.length}
        successCalcMira={(valueMira, valueMicha) => valueMira > valueMicha}
      />
      <PlayerStatisticRow
        title="Anteil gewonnener Spiele"
        valueMicha={michaWonGamesPercentage}
        valueMira={miraWonGamesPercentage}
        successCalcMira={(valueMira, valueMicha) => valueMira > valueMicha}
        valueFunction={(value) => `${value} %`}
      />
      <PlayerStatisticRow
        title="Längster Winning Streak"
        valueMicha={longestWinningStreak(games, "Micha")}
        valueMira={longestWinningStreak(games, "Mira")}
        successCalcMira={(valueMira, valueMicha) => valueMira > valueMicha}
      />
      <PlayerStatisticRow
        title="Anzahl von Hand gewonnener Spiele"
        valueMicha={michaWonGames.filter((g) => g.vonHand).length}
        valueMira={miraWonGames.filter((g) => g.vonHand).length}
        successCalcMira={(valueMira, valueMicha) => valueMira > valueMicha}
      />
      <PlayerStatisticRow
        title="Längster von Hand Winning Streak"
        valueMicha={longestVonHandWinningStreak(games, "Micha")}
        valueMira={longestVonHandWinningStreak(games, "Mira")}
        successCalcMira={(valueMira, valueMicha) => valueMira > valueMicha}
      />
      <PlayerStatisticRow
        title="Durchschnittliche Minuspunkte pro verlorenem Spiel"
        valueMicha={michaScore / michaWonGames.length}
        valueMira={miraScore / michaWonGames.length}
        successCalcMira={(valueMira, valueMicha) => valueMicha > valueMira}
        valueFunction={(value) => value.toFixed(0)}
      />
      <PlayerStatisticRow
        title="Letzter Sieg vor wieviel Spielen?"
        valueMicha={calculateLastWon(games, "Micha")}
        valueMira={calculateLastWon(games, "Mira")}
        successCalcMira={(valueMira, valueMicha) => valueMira < valueMicha}
        valueFunction={(value) =>
          value === 0 ? "Letztes Spiel gewonnen!" : value
        }
      />
    </Grid>
  );
}
