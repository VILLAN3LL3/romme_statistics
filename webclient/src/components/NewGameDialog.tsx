import { useTranslation } from "react-i18next";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

export interface NewGameDialogProps {
  open: boolean;
  onClose: (players: string[]) => void;
}

export default function NewGameDialog({ open, onClose }: Readonly<NewGameDialogProps>) {
  const { t } = useTranslation();
  return (
    <Dialog
      onClose={() => onClose([])}
      open={open}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          onClose([formJson.player1, formJson.player2]);
        },
      }}
    >
      <DialogTitle>{t("START_NEW_GAME")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>{t("START_NEW_GAME_DESCRIPTION")}</DialogContentText>
          <TextField
            autoFocus
            required
            id="player1"
            name="player1"
            label="Vorname Spieler*in 1"
            type="text"
            fullWidth
          />
          <TextField required id="player2" name="player2" label="Vorname Spieler*in 2" type="text" fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose([])}>{t("CANCEL")}</Button>
        <Button variant="contained" type="submit">
          {t("LETS_GO")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
