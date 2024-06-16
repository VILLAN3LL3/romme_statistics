import Grid from "@mui/material/Unstable_Grid2";

export default function PlayerStatisticHeader() {
  return (
    <>
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
    </>
  );
}
