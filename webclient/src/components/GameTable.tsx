import { Fragment } from "react/jsx-runtime";

import { Alert, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import { GameRoundVM } from "../game.model";
import GameTableRow from "./GameTableRow";

export default function GameTable({ gameRounds, players }: Readonly<{ gameRounds: GameRoundVM[]; players: string[] }>) {
  if (gameRounds.length === 0) {
    return <Alert severity="info">Keine Daten aus vergangenen Spielen vorhanden. Startet euer erstes Spiel!</Alert>;
  }
  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>No.</TableCell>
          <TableCell>Datum</TableCell>
          {players.map((player) => (
            <Fragment key={player}>
              <TableCell align="right">{player} (aktuelles Spiel)</TableCell>
              <TableCell align="right">{player} (Summe)</TableCell>
            </Fragment>
          ))}
          <TableCell align="right">Differenz</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gameRounds.map((game, i, games) => (
          <GameTableRow key={i} game={game} index={i} games={games} players={players} />
        ))}
      </TableBody>
    </Table>
  );
}
