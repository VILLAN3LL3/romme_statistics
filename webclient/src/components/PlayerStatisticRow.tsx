import StarBorder from "@mui/icons-material/StarBorder";
import { Chip } from "@mui/material";
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
  const displayedValueMira = valueFunction
    ? valueFunction(valueMira)
    : valueMira;
  const displayedValueMicha = valueFunction
    ? valueFunction(valueMicha)
    : valueMicha;
  const isSuccessForMira = successCalcMira(valueMira, valueMicha);
  return (
    <>
      <Grid xs={6}>{title}</Grid>
      <Grid xs={3}>
        {isSuccessForMira ? (
          <Chip
            color="success"
            icon={<StarBorder />}
            label={displayedValueMira}
            variant="outlined"
          />
        ) : (
          displayedValueMira
        )}
      </Grid>
      <Grid xs={3}>
        {!isSuccessForMira ? (
          <Chip
            color="success"
            icon={<StarBorder />}
            label={displayedValueMicha}
            variant="outlined"
          />
        ) : (
          displayedValueMicha
        )}
      </Grid>
    </>
  );
}
