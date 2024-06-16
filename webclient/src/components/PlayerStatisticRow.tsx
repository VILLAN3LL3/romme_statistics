import Grid from "@mui/material/Unstable_Grid2";

export interface PlayerStatisticRowProps {
  title: string;
  valueMira: number;
  valueMicha: number;
  successCalcMira: (valueMira: number, valueMicha: number) => boolean;
  valueFunction?: (value: number) => string | number;
}

export default function PlayerStatisticRow({
  title,
  valueMicha,
  valueMira,
  successCalcMira,
  valueFunction,
}: Readonly<PlayerStatisticRowProps>) {
  return (
    <>
      <Grid xs={6}>{title}</Grid>
      <Grid
        xs={3}
        sx={{
          color: (theme) =>
            successCalcMira(valueMira, valueMicha)
              ? theme.palette.success.dark
              : "inherit",
        }}
      >
        {valueFunction ? valueFunction(valueMira) : valueMira}
      </Grid>
      <Grid
        xs={3}
        sx={{
          color: (theme) =>
            !successCalcMira(valueMira, valueMicha)
              ? theme.palette.success.dark
              : "inherit",
        }}
      >
        {valueFunction ? valueFunction(valueMicha) : valueMicha}
      </Grid>
    </>
  );
}
