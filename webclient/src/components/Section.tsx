import { PropsWithChildren } from "react";

import { Box, Paper, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface SectionProps extends PropsWithChildren {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
}

export default function Section({
  title,
  children,
  Icon,
}: Readonly<SectionProps>) {
  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h2">
        <Icon sx={{ fontSize: 40 }} />
        &nbsp;{title}
      </Typography>
      <Paper sx={{ paddingX: 3, paddingY: 5 }}>{children}</Paper>
    </Box>
  );
}
