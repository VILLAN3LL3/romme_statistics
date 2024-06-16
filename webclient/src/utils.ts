import { GameVM } from "./game.model";

export function sumUpScore(games: GameVM[]): number {
  return games.reduce((total, game) => total + game.totalScore, 0);
}

export function calculatePercentage(num1: number, num2: number): number {
  return roundTo2Digits((num1 / num2) * 100);
}

function roundTo2Digits(num: number): number {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export function getGameWithHighestScore(games: GameVM[]): GameVM {
  return games.reduce((highest, game) => {
    return game.totalScore > highest.totalScore ? game : highest;
  }, games[0]);
}

export function formatDate(date: Date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function calculateLastWon(games: GameVM[], winner: string): number {
  let lastWon = 0;
  for (let index = games.length - 1; index > -1; index--) {
    const element = games[index];
    if (element.winner === winner) {
      return lastWon;
    }
    lastWon++;
  }
  return lastWon;
}

export function longestWinningStreak(games: GameVM[], player: string) {
  let maxStreak = 0;
  let currentStreak = 0;

  for (const element of games) {
    if (element.winner === player) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
}

export function longestVonHandWinningStreak(games: GameVM[], player: string) {
  let maxStreak = 0;
  let currentStreak = 0;

  for (const element of games) {
    if (element.winner === player && element.vonHand) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
}

export function toGermanDateString(date: string): string {
  return new Date(date).toLocaleDateString("de-DE");
}

export function calculateLostScore(
  games: GameVM[],
  index: number,
  player: string
) {
  return games.slice(0, index + 1).reduce((sum, game) => {
    return game.winner !== player ? sum + game.totalScore : sum;
  }, 0);
}
