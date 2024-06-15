import Grid from "@mui/material/Unstable_Grid2";

import { Game } from "../game.model";
import {
  calculateLastWon,
  calculatePercentage,
  getGameWithHighestScore,
  longestWinningStreak,
  sumUpScore,
} from "../utils";
import PlayerStatisticRow from "./PlayerStatisticRow";

export default function Statistics({ games }: Readonly<{ games: Game[] }>) {
  if (games.length === 0) {
    return null;
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
      <Grid xs={6}>Anzahl Spiele:</Grid>
      <Grid xs={6}>{games.length}</Grid>

      <Grid xs={6}>Höchster Gewinn:</Grid>
      <Grid xs={6}>{`${gameWithHighestScore.score} (gewonnen von ${
        gameWithHighestScore.winner
      } am ${new Date(gameWithHighestScore.date).toLocaleDateString(
        "de-DE"
      )})`}</Grid>
      <Grid xs={12}>
        <hr />
      </Grid>
      <Grid xs={6}></Grid>
      <Grid xs={3}>
        <strong>Mira</strong>
      </Grid>
      <Grid xs={3}>
        <strong>Micha</strong>
      </Grid>

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
        title="Anzahl von Hand gewonnener Spiele"
        valueMicha={michaWonGames.filter((g) => g.vonHand).length}
        valueMira={miraWonGames.filter((g) => g.vonHand).length}
        successCalcMira={(valueMira, valueMicha) => valueMira > valueMicha}
      />
      <PlayerStatisticRow
        title="Längster Winning Streak"
        valueMicha={longestWinningStreak(games, "Micha")}
        valueMira={longestWinningStreak(games, "Mira")}
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

// ToDo: Längste Gewinnserie
// ToDo: Letzter Gewinn vor x Spielen
