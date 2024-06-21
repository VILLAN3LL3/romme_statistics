import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { de } from "yup-locales";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

import { GameRound } from "@romme/model";
import { formatDate } from "@romme/utils";

yup.setLocale(de);

interface FormValue {
  score: number;
  winner?: string;
  vonHand: boolean;
}

const validationSchema = yup.object({
  score: yup.number().integer().positive().required(),
  winner: yup.string().required(),
});

export default function GameRoundForm({
  onGameSave,
  loading,
  players,
}: Readonly<{
  onGameSave: (gameRound: GameRound) => void;
  loading: boolean;
  players: string[];
}>) {
  const { t } = useTranslation();
  const formik = useFormik<FormValue>({
    initialValues: {
      score: 0,
      winner: undefined,
      vonHand: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onGameSave({
        ...values,
        winner: values.winner ?? "",
        date: formatDate(new Date()),
      });
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          required
          label={t("MINUS_POINTS")}
          name="score"
          value={formik.values.score}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.score && Boolean(formik.errors.score)}
          helperText={formik.touched.score && formik.errors.score}
          autoComplete="off"
          type="number"
          onFocus={(evt) => evt.target.select()}
          autoFocus
        />
        <FormControl required error={formik.touched.winner && Boolean(formik.errors.winner)}>
          <FormLabel sx={{ textAlign: "left" }}>{t("WINNER")}</FormLabel>
          <RadioGroup row name="winner" onChange={formik.handleChange} onBlur={formik.handleBlur}>
            {players.map((player) => (
              <FormControlLabel
                key={player}
                value={player}
                control={<Radio />}
                label={player}
                checked={formik.values.winner === player}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{formik.touched.winner && formik.errors.winner}</FormHelperText>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="vonHand" onChange={formik.handleChange} onBlur={formik.handleBlur} />}
            label={t("WITHIN_ONE_TURN") + "?"}
          />
        </FormGroup>
        <Button variant="contained" type="submit" disabled={loading}>
          {t("SAVE")}
        </Button>
      </Stack>
    </form>
  );
}
