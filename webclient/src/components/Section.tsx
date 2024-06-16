import { PropsWithChildren } from "react";

import { Box, SvgIconTypeMap, Typography } from "@mui/material";
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
      {children}
    </Box>
  );
}
