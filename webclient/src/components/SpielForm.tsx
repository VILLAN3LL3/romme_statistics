import { useFormik } from "formik";
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

import { Game } from "../game.model";
import { formatDate } from "../utils";

yup.setLocale(de);

const validationSchema = yup.object({
  score: yup.number().integer().positive().required("Score is required"),
  winner: yup.string().required(),
});

export function SpielForm({
  onGameSave,
  loading,
  players,
}: Readonly<{
  onGameSave: (game: Game) => void;
  loading: boolean;
  players: string[];
}>) {
  const formik = useFormik({
    initialValues: {
      score: 0,
      winner: "",
      vonHand: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onGameSave({
        ...values,
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
          label="Minuspunkte"
          name="score"
          value={formik.values.score}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.score && Boolean(formik.errors.score)}
          helperText={formik.touched.score && formik.errors.score}
          autoComplete="off"
          type="number"
          onFocus={(evt) => evt.target.select()}
        />
        <FormControl
          required
          error={formik.touched.winner && Boolean(formik.errors.score)}
        >
          <FormLabel sx={{ textAlign: "left" }}>Gewinner</FormLabel>
          <RadioGroup
            row
            name="winner"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {players.map((player) => (
              <FormControlLabel
                key={player}
                value={player}
                control={<Radio />}
                label={player}
              />
            ))}
          </RadioGroup>
          <FormHelperText>
            {formik.touched.winner && formik.errors.winner}
          </FormHelperText>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="vonHand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label="von Hand?"
          />
        </FormGroup>
        <Button variant="contained" type="submit" disabled={loading}>
          Speichern
        </Button>
      </Stack>
    </form>
  );
}
