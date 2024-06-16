import Grid from "@mui/material/Unstable_Grid2";

export interface GameStatisticRowProps {
  title: string;
  value: number | string;
}

export default function GameStatisticRow({
  title,
  value,
}: Readonly<GameStatisticRowProps>) {
  return (
    <>
      <Grid xs={6}>{title}:</Grid>
      <Grid xs={6}>{value}</Grid>
    </>
  );
}
