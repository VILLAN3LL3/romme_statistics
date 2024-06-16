import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { GameVM } from "../game.model";
import GameTableRow from "./GameTableRow";

export default function GameTable({ games }: Readonly<{ games: GameVM[] }>) {
  return (
    <TableContainer component={Paper} sx={{ paddingY: 5, paddingX: 3 }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Datum</TableCell>
            <TableCell align="right">Mira (aktuelles Spiel)</TableCell>
            <TableCell align="right">Mira (Summe)</TableCell>
            <TableCell align="right">Micha (aktuelles Spiel)</TableCell>
            <TableCell align="right">Micha (Summe)</TableCell>
            <TableCell align="right">Differenz</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game, i, games) => (
            <GameTableRow key={i} game={game} index={i} games={games} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
