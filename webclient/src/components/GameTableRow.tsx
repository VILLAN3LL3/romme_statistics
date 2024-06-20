import { Fragment } from "react/jsx-runtime";

import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { TableCell, TableRow } from "@mui/material";

import { GameRoundVM } from "../game.model";
import { toGermanDateString } from "../utils/date.utils";
import { calculateLostScore } from "../utils/game-round.utils";

export default function GameTableRow({
  game,
  index,
  games,
  players,
}: Readonly<{
  game: GameRoundVM;
  index: number;
  games: GameRoundVM[];
  players: string[];
}>) {
  const lostScoreByPlayer = new Map<string, number>();
  players.forEach((player) => lostScoreByPlayer.set(player, calculateLostScore(games, index, player)));

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{toGermanDateString(game.date)}</TableCell>
      {players.map((player) => {
        const isWinner = game.winner === player;
        return (
          <Fragment key={player}>
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
          </Fragment>
        );
      })}
      <TableCell align="right">
        {lostScoreByPlayer.values().next().value - lostScoreByPlayer.values().next().value}
      </TableCell>
    </TableRow>
  );
}
