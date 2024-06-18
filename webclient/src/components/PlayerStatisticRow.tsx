import StarBorder from "@mui/icons-material/StarBorder";
import { Chip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export interface PlayerStatisticRowProps {
  title: string;
  valueMap: Map<string, number>;
  leaderFn: (valuePlayer: number, valueOthers: number[]) => boolean;
  valueFn?: (value: number) => string | number;
}

export default function PlayerStatisticRow({
  title,
  valueMap,
  leaderFn,
  valueFn,
}: Readonly<PlayerStatisticRowProps>) {
  if (!valueMap) {
    return <Grid xs={12}>N/A</Grid>;
  }
  return (
    <>
      <Grid xs={6}>{title}</Grid>
      {Array.from(valueMap.keys()).map((key) => {
        const filteredValueMap = new Map(valueMap);
        filteredValueMap.delete(key);
        const value = valueMap.get(key) ?? 0;
        const isLeader = leaderFn(value, Array.from(filteredValueMap.values()));
        const displayedValue = valueFn ? valueFn(value) : value;
        return (
          <Grid xs={3} key={key}>
            {isLeader ? (
              <Chip
                color="success"
                icon={<StarBorder />}
                label={displayedValue}
                variant="outlined"
              />
            ) : (
              displayedValue
            )}
          </Grid>
        );
      })}
    </>
  );
}
