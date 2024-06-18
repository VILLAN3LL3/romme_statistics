import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { TableCell, TableRow } from "@mui/material";

import { GameVM } from "../game.model";
import { calculateLostScore, toGermanDateString } from "../utils";

export default function GameTableRow({
  game,
  index,
  games,
  players,
}: Readonly<{
  game: GameVM;
  index: number;
  games: GameVM[];
  players: string[];
}>) {
  const lostScoreByPlayer = new Map<string, number>();
  players.forEach((player) =>
    lostScoreByPlayer.set(player, calculateLostScore(games, index, player))
  );

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{toGermanDateString(game.date)}</TableCell>
      {players.map((player) => {
        const isWinner = game.winner === player;
        return (
          <>
            <TableCell align="right">
              {isWinner ? "-" : game.totalScore}
              {isWinner && game.vonHand && (
                <>
                  &nbsp;
                  <BackHandOutlinedIcon color="success" fontSize="small" />
                </>
              )}
            </TableCell>
            <TableCell align="right">{lostScoreByPlayer.get(player)}</TableCell>
          </>
        );
      })}
      <TableCell align="right">
        {lostScoreByPlayer.values().next().value -
          lostScoreByPlayer.values().next().value}
      </TableCell>
    </TableRow>
  );
}
