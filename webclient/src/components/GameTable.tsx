import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { GameVM } from "../game.model";
import GameTableRow from "./GameTableRow";

export default function GameTable({
  games,
  players,
}: Readonly<{ games: GameVM[]; players: string[] }>) {
  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>No.</TableCell>
          <TableCell>Datum</TableCell>
          {players.map((player) => (
            <>
              <TableCell align="right">{player} (aktuelles Spiel)</TableCell>
              <TableCell align="right">{player} (Summe)</TableCell>
            </>
          ))}
          <TableCell align="right">Differenz</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map((game, i, games) => (
          <GameTableRow
            key={i}
            game={game}
            index={i}
            games={games}
            players={players}
          />
        ))}
      </TableBody>
    </Table>
  );
}
