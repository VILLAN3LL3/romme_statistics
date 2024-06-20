import { Fragment, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import RecentActorsRoundedIcon from "@mui/icons-material/RecentActorsRounded";
import { Alert, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../components/LoadingIndicator";
import NewGameDialog from "../components/NewGameDialog";
import Section from "../components/Section";
import { gameLoader, GameQuery, useGameMutation } from "../game.query";

export default function OverviewPage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof gameLoader>>>;
  const { data, isLoading, error } = useQuery({
    ...GameQuery(),
    initialData,
  });
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate } = useGameMutation();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <>
      <Section title="Spiel wählen" Icon={MeetingRoomRoundedIcon}>
        <List>
          {data.map((gameId) => (
            <Fragment key={gameId}>
              <Divider component="li" />
              <ListItem key={gameId} divider={true}>
                <ListItemButton onClick={() => navigate(gameId)}>
                  <ListItemIcon>
                    <RecentActorsRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={gameId.split("_").join(", ")} />
                </ListItemButton>
              </ListItem>
            </Fragment>
          ))}
          <ListItem key="new" divider={true}>
            <ListItemButton onClick={() => setIsDialogOpen(true)}>
              <ListItemIcon>
                <PersonAddRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Neues Spiel beginnen" />
            </ListItemButton>
          </ListItem>
        </List>
      </Section>
      <NewGameDialog open={isDialogOpen} onClose={(players) => (players.length > 0 ? mutate(players) : {})} />
    </>
  );
}
