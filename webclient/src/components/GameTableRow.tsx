import { Fragment } from "react/jsx-runtime";

import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { TableCell, TableRow } from "@mui/material";

import { GameRoundVM } from "@romme/model";
import { calculateLostScore, toLocalizedDateString } from "@romme/utils";

export default function GameTableRow({
  gameRound,
  index,
  gameRounds,
  players,
}: Readonly<{
  gameRound: GameRoundVM;
  index: number;
  gameRounds: GameRoundVM[];
  players: string[];
}>) {
  const lostScoreByPlayer = new Map<string, number>();
  players.forEach((player) => lostScoreByPlayer.set(player, calculateLostScore(gameRounds, index, player)));

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{toLocalizedDateString(gameRound.date)}</TableCell>
      {players.map((player) => {
        const isWinner = gameRound.winner === player;
        return (
          <Fragment key={player}>
            <TableCell align="right">
              {isWinner ? "-" : gameRound.totalScore}
              {isWinner && gameRound.vonHand && (
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
