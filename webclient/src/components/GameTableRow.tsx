import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { TableCell, TableRow } from "@mui/material";

import { GameVM } from "../game.model";
import { calculateLostScore, toGermanDateString } from "../utils";

export default function GameTableRow({
  game,
  index,
  games,
}: Readonly<{ game: GameVM; index: number; games: GameVM[] }>) {
  const isMiraWinner = game.winner === "Mira";
  const lostScoreMicha = calculateLostScore(games, index, "Micha");
  const lostScoreMira = calculateLostScore(games, index, "Mira");

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{toGermanDateString(game.date)}</TableCell>
      <TableCell align="right">
        {isMiraWinner ? "-" : game.totalScore}
        {isMiraWinner && game.vonHand && (
          <>
            &nbsp;
            <BackHandOutlinedIcon fontSize="small" />
          </>
        )}
      </TableCell>
      <TableCell align="right">{lostScoreMira}</TableCell>
      <TableCell align="right">
        {isMiraWinner ? game.totalScore : "-"}
        {!isMiraWinner && game.vonHand && (
          <>
            &nbsp;
            <BackHandOutlinedIcon fontSize="small" />
          </>
        )}
      </TableCell>
      <TableCell align="right">{lostScoreMicha}</TableCell>
      <TableCell align="right">{lostScoreMira - lostScoreMicha}</TableCell>
    </TableRow>
  );
}
