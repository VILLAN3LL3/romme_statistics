import { Game, GameDto } from './game.model';

const baseUrl = "http://localhost:3000/games";

function createPlayersRequestParameter(players: string[]) {
  return players.join("_");
}

export async function loadGameDto(players: string[]): Promise<GameDto> {
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
  return response.json();
}

export async function postGameData(
  newGame: Game,
  players: string[]
): Promise<string> {
  const response = await fetch(
    `${baseUrl}/${createPlayersRequestParameter(players)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
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
