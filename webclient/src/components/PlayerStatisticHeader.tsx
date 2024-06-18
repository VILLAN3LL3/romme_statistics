import Grid from "@mui/material/Unstable_Grid2";

export default function PlayerStatisticHeader({
  players,
}: Readonly<{ players: string[] }>) {
  return (
    <>
      <Grid xs={6}></Grid>
      {players.map((player) => (
        <Grid xs={3} key={player}>
          <strong>{player}</strong>
        </Grid>
      ))}
    </>
  );
}
