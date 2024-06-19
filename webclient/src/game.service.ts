import { Game, GameDataDto, GameVM, PostGameDataDto } from "./game.model";

const baseUrl = "http://localhost:3000/games";

function createPlayersRequestParameter(players: string[]) {
  return players.join("_");
}

const mapGameToGameVm = (game: Game): GameVM => {
  return {
    ...game,
    totalScore: game.vonHand ? game.score * 2 : game.score,
  };
};

export async function loadGameDto(
  players: string[]
): Promise<{ players: string[]; games: GameVM[] }> {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(
    `${baseUrl}/${createPlayersRequestParameter(players)}`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const dto: GameDataDto = await response.json();
  return {
    players: dto.players,
    games: dto.games.map((g) => mapGameToGameVm(g)),
  };
}

export async function postGameData(gameData: PostGameDataDto): Promise<string> {
  const response = await fetch(
    `${baseUrl}/${createPlayersRequestParameter(gameData.players)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData.newGame),
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.text();
}

export async function postGame(players: string[]): Promise<void> {
  const response = await fetch(
    `${baseUrl}/${createPlayersRequestParameter(players)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ players }),
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}
