export interface GameDto {
  games: Game[];
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
