import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

import { useTheme } from "@mui/material";

import { GameRoundVM } from "../game.model";
import { calculateLostScore } from "../utils/game-round.utils";

export default function DiffChart({ gameRounds, players }: Readonly<{ gameRounds: GameRoundVM[]; players: string[] }>) {
  const theme = useTheme();
  const { t } = useTranslation();

  if (!gameRounds || !players) {
    return null;
  }

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t("DEVELOPMENT_POINT_DIFFERENCE"),
      },
    },
  };

  const diff: number[] = [];

  for (let index = 0; index < gameRounds.length; index++) {
    diff.push(
      calculateLostScore(gameRounds, index, players.at(0)!) - calculateLostScore(gameRounds, index, players.at(1)!)
    );
  }

  const labels = Array.from({ length: gameRounds.length }, (_, i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: `${t("POINTS_DIFFERENCE")} ${players.at(0)!} - ${players.at(1) ?? ""}`,
        data: diff,
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
