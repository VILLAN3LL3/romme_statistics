import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import RecentActorsRoundedIcon from "@mui/icons-material/RecentActorsRounded";
import { Alert, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { gameLoader, GameQuery, getGameDataQueryKey } from "../game.query";
import { postGame } from "../game.service";
import LoadingIndicator from "./LoadingIndicator";
import NewGameDialog from "./NewGameDialog";
import Section from "./Section";

export default function OverviewPage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof gameLoader>>>;
  const { data, isLoading, error } = useQuery({
    ...GameQuery(),
    initialData,
  });
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postGame,
    onSuccess: (game: string) => {
      queryClient.invalidateQueries({ queryKey: getGameDataQueryKey(game.split("_")) });
      navigate(game);
    },
  });

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
          {data.map((game) => (
            <>
              <Divider component="li" />
              <ListItem key={game} divider={true}>
                <ListItemButton onClick={() => navigate(game)}>
                  <ListItemIcon>
                    <RecentActorsRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={game.split("_").join(", ")} />
                </ListItemButton>
              </ListItem>
            </>
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
