export interface GameDataDto {
  games: Game[];
  players: string[];
}

export interface PostGameDataDto {
  newGame: Game;
  players: string[];
}

export interface Game {
  score: number;
  winner: string;
  vonHand: boolean;
  date: string;
}

export interface GameVM extends Game {
  totalScore: number;
}

export interface GameDataVM {
  games: GameVM[];
  players: string[];
}
