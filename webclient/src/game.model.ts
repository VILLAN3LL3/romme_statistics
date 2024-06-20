export interface GameDataDto {
  gameId: string;
  gameRounds: GameRound[];
  players: string[];
}

export interface PostGameDataDto {
  newGameRound: GameRound;
  gameId: string;
}

export interface GameRound {
  score: number;
  winner: string;
  vonHand: boolean;
  date: string;
}

export interface GameRoundVM extends GameRound {
  totalScore: number;
}

export interface GameDataVM {
  gameId: string;
  gameRounds: GameRoundVM[];
  players: string[];
}
