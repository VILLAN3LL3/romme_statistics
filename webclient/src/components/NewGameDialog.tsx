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
      <DialogTitle>Neues Spiel beginnen</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>
            Um ein neues Spiel zu beginnen, gib hier die Vornamen der beiden Spieler*innen ein.
          </DialogContentText>
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
        <Button onClick={() => onClose([])}>Abbrechen</Button>
        <Button variant="contained" type="submit">
          Los geht's!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
