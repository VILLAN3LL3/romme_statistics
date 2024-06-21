import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";

import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import RecentActorsRoundedIcon from "@mui/icons-material/RecentActorsRounded";
import { Alert, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { gameLoader, GameQuery, useGameMutation } from "@romme/query";

import LoadingIndicator from "../components/LoadingIndicator";
import NewGameDialog from "../components/NewGameDialog";
import Section from "../components/Section";

export default function OverviewPage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof gameLoader>>>;
  const { data, isLoading, error } = useQuery({
    ...GameQuery(),
    initialData,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate } = useGameMutation();

  function handleDialogClose(players: string[]) {
    setIsDialogOpen(false);
    if (players.length > 0) {
      mutate(players);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <>
      <Section title={t("SELECT_GAME")} Icon={MeetingRoomRoundedIcon}>
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
              <ListItemText primary={t("START_NEW_GAME")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Section>
      <NewGameDialog open={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
}
