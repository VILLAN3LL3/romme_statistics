import { useLoaderData, useNavigate } from "react-router-dom";

import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import RecentActorsRoundedIcon from "@mui/icons-material/RecentActorsRounded";
import { Alert, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { gameLoader, GameQuery } from "../game.query";
import LoadingIndicator from "./LoadingIndicator";
import Section from "./Section";

export default function OverviewPage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof gameLoader>>>;
  const { data, isLoading, error } = useQuery({
    ...GameQuery(),
    initialData,
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Section title="Verfügbare Spiele" Icon={MeetingRoomRoundedIcon}>
      <List>
        {data.map((game) => (
          <ListItem key={game}>
            <ListItemButton onClick={() => navigate(game)}>
              <ListItemIcon>
                <RecentActorsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={game.split("_").join(", ")} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Section>
  );
}
