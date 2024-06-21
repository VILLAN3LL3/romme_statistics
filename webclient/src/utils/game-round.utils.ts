import { GameRoundVM } from "@romme/model";

export function sumUpScore(games: GameRoundVM[]): number {
  return games.reduce((total, game) => total + game.totalScore, 0);
}

export function getGameRoundWithHighestScore(games: GameRoundVM[]): GameRoundVM {
  return games.reduce((highest, game) => {
    return game.totalScore > highest.totalScore ? game : highest;
  }, games[0]);
}

export function calculateLastWonGameRound(games: GameRoundVM[], winner: string): number {
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

export function longestWinningStreak(games: GameRoundVM[], player: string) {
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

export function longestVonHandWinningStreak(games: GameRoundVM[], player: string) {
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

export function calculateLostScore(games: GameRoundVM[], index: number, player: string) {
  return games.slice(0, index + 1).reduce((sum, game) => {
    return game.winner !== player ? sum + game.totalScore : sum;
  }, 0);
}
