import { Game } from './game.model';

const baseUrl = "http://localhost:3000/games";

export async function loadGames(): Promise<Game[]> {
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

export async function postGame(newGame: Game): Promise<string> {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.text();
}
