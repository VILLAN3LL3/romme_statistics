import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

import { Alert, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import { GameRoundVM } from "../game.model";
import GameTableRow from "./GameTableRow";

export default function GameTable({ gameRounds, players }: Readonly<{ gameRounds: GameRoundVM[]; players: string[] }>) {
  const { t } = useTranslation();
  if (gameRounds.length === 0) {
    return <Alert severity="info">{t("NO_GAME_DATA_AVAILABLE")}</Alert>;
  }
  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>No.</TableCell>
          <TableCell>{t("DATE")}</TableCell>
          {players.map((player) => (
            <Fragment key={player}>
              <TableCell align="right">
                {player} ({t("CURRENT_ROUND")})
              </TableCell>
              <TableCell align="right">
                {player} ({t("TOTAL")})
              </TableCell>
            </Fragment>
          ))}
          <TableCell align="right">{t("DIFFERENCE")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gameRounds.map((gameRound, i, gameRounds) => (
          <GameTableRow key={i} gameRound={gameRound} index={i} gameRounds={gameRounds} players={players} />
        ))}
      </TableBody>
    </Table>
  );
}
