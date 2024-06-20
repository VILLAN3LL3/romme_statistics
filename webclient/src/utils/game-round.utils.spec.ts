import { describe, expect, test } from "vitest";

import { GameRoundVM } from "../game.model";
import {
  calculateLastWonGameRound,
  calculateLostScore,
  getGameRoundWithHighestScore,
  longestVonHandWinningStreak,
  longestWinningStreak,
  sumUpScore,
} from "./game-round.utils";

describe("game-round.utils", () => {
  const dummyGameRoundVM: GameRoundVM = {
    winner: "Max",
    score: 10,
    vonHand: true,
    totalScore: 20,
    date: "2024-06-20",
  };

  describe("sumUpScore", () => {
    test("should return 0 if the games array is empty", () => {
      const games: GameRoundVM[] = [];
      const result = sumUpScore(games);
      expect(result).toBe(0);
    });

    test("should correctly sum up the total scores of all games", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, totalScore: 10 },
        { ...dummyGameRoundVM, totalScore: 20 },
        { ...dummyGameRoundVM, totalScore: 30 },
      ];
      const result = sumUpScore(games);
      expect(result).toBe(60);
    });

    test("should handle negative scores correctly", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, totalScore: 10 },
        { ...dummyGameRoundVM, totalScore: -20 },
        { ...dummyGameRoundVM, totalScore: 30 },
      ];
      const result = sumUpScore(games);
      expect(result).toBe(20);
    });
  });

  describe("getGameRoundWithHighestScore", () => {
    test("should return the game with the highest score", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, totalScore: 10 },
        { ...dummyGameRoundVM, totalScore: 20 },
        { ...dummyGameRoundVM, totalScore: 30 },
      ];
      const result = getGameRoundWithHighestScore(games);
      expect(result).toEqual(games[2]);
    });

    test("should return the first game if there are multiple games with the same highest score", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, totalScore: 30 },
        { ...dummyGameRoundVM, totalScore: 20 },
        { ...dummyGameRoundVM, totalScore: 30 },
      ];
      const result = getGameRoundWithHighestScore(games);
      expect(result).toEqual(games[0]);
    });

    test("should handle negative scores correctly", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, totalScore: -10 },
        { ...dummyGameRoundVM, totalScore: -20 },
        { ...dummyGameRoundVM, totalScore: -30 },
      ];
      const result = getGameRoundWithHighestScore(games);
      expect(result).toEqual(games[0]);
    });

    test("should return the first game if the games array is empty", () => {
      const games: GameRoundVM[] = [];
      const result = getGameRoundWithHighestScore(games);
      expect(result).toEqual(games[0]);
    });
  });

  describe("calculateLastWonGameRound", () => {
    test("should return the index of the last game won by the specified winner", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Bob" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Bob" },
        { ...dummyGameRoundVM, winner: "Alice" },
      ];
      const result = calculateLastWonGameRound(games, "Alice");
      expect(result).toBe(0);
    });

    test("should return the total number of games if the specified winner has not won any games", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Bob" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Bob" },
        { ...dummyGameRoundVM, winner: "Alice" },
      ];
      const result = calculateLastWonGameRound(games, "Charlie");
      expect(result).toBe(games.length);
    });

    test("should return 0 if the games array is empty", () => {
      const games: GameRoundVM[] = [];
      const result = calculateLastWonGameRound(games, "Alice");
      expect(result).toBe(0);
    });
  });

  describe("longestWinningStreak", () => {
    test("should return the longest winning streak of the specified player", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Bob" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Bob" },
        { ...dummyGameRoundVM, winner: "Alice" },
      ];
      const result = longestWinningStreak(games, "Alice");
      expect(result).toBe(3);
    });

    test("should return 0 if the specified player has not won any games", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Bob" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Alice" },
        { ...dummyGameRoundVM, winner: "Bob" },
        { ...dummyGameRoundVM, winner: "Alice" },
      ];
      const result = longestWinningStreak(games, "Charlie");
      expect(result).toBe(0);
    });

    test("should return 0 if the games array is empty", () => {
      const games: GameRoundVM[] = [];
      const result = longestWinningStreak(games, "Alice");
      expect(result).toBe(0);
    });
  });

  describe("longestVonHandWinningStreak", () => {
    test("should return the longest vonHand winning streak of the specified player", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, winner: "Alice", vonHand: true },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: true },
        { ...dummyGameRoundVM, winner: "Bob", vonHand: true },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: true },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: true },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: true },
        { ...dummyGameRoundVM, winner: "Bob", vonHand: true },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: true },
      ];
      const result = longestVonHandWinningStreak(games, "Alice");
      expect(result).toBe(3);
    });

    test("should return 0 if the specified player has not won any vonHand games", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, winner: "Alice", vonHand: false },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: false },
        { ...dummyGameRoundVM, winner: "Bob", vonHand: true },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: false },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: false },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: false },
        { ...dummyGameRoundVM, winner: "Bob", vonHand: true },
        { ...dummyGameRoundVM, winner: "Alice", vonHand: false },
      ];
      const result = longestVonHandWinningStreak(games, "Alice");
      expect(result).toBe(0);
    });

    test("should return 0 if the games array is empty", () => {
      const games: GameRoundVM[] = [];
      const result = longestVonHandWinningStreak(games, "Alice");
      expect(result).toBe(0);
    });
  });

  describe("calculateLostScore", () => {
    test("should return the total score of games lost by the specified player up to the given index", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, winner: "Alice", totalScore: 10 },
        { ...dummyGameRoundVM, winner: "Bob", totalScore: 20 },
        { ...dummyGameRoundVM, winner: "Alice", totalScore: 30 },
        { ...dummyGameRoundVM, winner: "Bob", totalScore: 40 },
        { ...dummyGameRoundVM, winner: "Alice", totalScore: 50 },
      ];
      const result = calculateLostScore(games, 3, "Alice");
      expect(result).toBe(60); // Bob won two games with total scores of 20 and 40
    });

    test("should return 0 if the specified player has not lost any games up to the given index", () => {
      const games: GameRoundVM[] = [
        { ...dummyGameRoundVM, winner: "Alice", totalScore: 10 },
        { ...dummyGameRoundVM, winner: "Alice", totalScore: 20 },
        { ...dummyGameRoundVM, winner: "Alice", totalScore: 30 },
        { ...dummyGameRoundVM, winner: "Alice", totalScore: 40 },
        { ...dummyGameRoundVM, winner: "Alice", totalScore: 50 },
      ];
      const result = calculateLostScore(games, 3, "Alice");
      expect(result).toBe(0); // Alice won all games up to index 3
    });

    test("should return 0 if the games array is empty", () => {
      const games: GameRoundVM[] = [];
      const result = calculateLostScore(games, 3, "Alice");
      expect(result).toBe(0);
    });
  });
});
