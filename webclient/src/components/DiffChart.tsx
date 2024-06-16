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

import { useTheme } from "@mui/material";

import { GameVM } from "../game.model";
import { calculateLostScore } from "../utils";

export default function DiffChart({ games }: Readonly<{ games: GameVM[] }>) {
  const theme = useTheme();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Entwicklung der Punktedifferenz",
      },
    },
  };

  const diff: number[] = [];

  for (let index = 0; index < games.length; index++) {
    diff.push(
      calculateLostScore(games, index, "Mira") -
        calculateLostScore(games, index, "Micha")
    );
  }

  const labels = Array.from({ length: games.length }, (_, i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: "Punktedifferenz Mira - Micha",
        data: diff,
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
