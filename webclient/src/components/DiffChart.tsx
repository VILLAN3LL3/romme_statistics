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

export default function DiffChart({
  games,
  players,
}: Readonly<{ games: GameVM[]; players: string[] }>) {
  const theme = useTheme();

  if (!games || !players) {
    return null;
  }

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
      calculateLostScore(games, index, players.at(0)!) -
        calculateLostScore(games, index, players.at(1)!)
    );
  }

  const labels = Array.from({ length: games.length }, (_, i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: `Punktedifferenz ${players.at(0)!} - ${players.at(1) ?? ""}`,
        data: diff,
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
