import { useTranslation } from "react-i18next";

import { Alert, Snackbar } from "@mui/material";

export interface GameDataSavedSnackbarProps {
  open: boolean;
  onClose: () => void;
}

export default function GameDataSavedSnackbar({ open, onClose }: Readonly<GameDataSavedSnackbarProps>) {
  const { t } = useTranslation();

  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={6000}>
      <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
        {t("GAME_ROUND_DATA_SAVED")}
      </Alert>
    </Snackbar>
  );
}
