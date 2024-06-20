import { GameDataDto, GameDataVM, GameRound, GameRoundVM, PostGameDataDto } from "./game.model";

const baseUrl = "http://localhost:3000/games";

function createGameId(players: string[]) {
  return players.join("_");
}

const mapGameToGameVm = (game: GameRound): GameRoundVM => {
  return {
    ...game,
    totalScore: game.vonHand ? game.score * 2 : game.score,
  };
};

export async function loadExistingGameIds(): Promise<string[]> {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  const response = await fetch(baseUrl, requestOptions);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function loadGameDto(gameId: string): Promise<GameDataVM> {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(`${baseUrl}/${gameId}`, requestOptions);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const dto: GameDataDto = await response.json();
  return {
    players: dto.players,
    gameId,
    gameRounds: dto.gameRounds.map((g) => mapGameToGameVm(g)),
  };
}

export async function postGameData(dto: PostGameDataDto): Promise<string> {
  const response = await fetch(`${baseUrl}/${dto.gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto.newGameRound),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.text();
}

export async function postGame(players: string[]): Promise<string> {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ players }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return createGameId(players);
}
