import { Params } from "react-router-dom";

import { QueryClient } from "@tanstack/react-query";

import { GameDataVM } from "./game.model";
import { loadGameDto, loadGames } from "./game.service";

export function getGameDataQueryKey(players: string[]) {
  return ["game-data", ...players];
}

export const GameDataQuery = (players: string[]) => ({
  queryKey: getGameDataQueryKey(players),
  queryFn: async () => loadGameDto(players),
});

export const gameDataLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<string> }): Promise<GameDataVM> => {
    const query = GameDataQuery(params.players?.split("_") ?? []);
    return queryClient.ensureQueryData(query);
  };

export const GameQuery = () => ({
  queryKey: ["games"],
  queryFn: async () => loadGames(),
});

export const gameLoader = (queryClient: QueryClient) => async (): Promise<string[]> => {
  const query = GameQuery();
  return queryClient.ensureQueryData(query);
};
