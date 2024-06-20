import { Params } from "react-router-dom";

import { QueryClient } from "@tanstack/react-query";

import { GameDataVM } from "./game.model";
import { loadExistingGameIds, loadGameDto } from "./game.service";

export function getGameDataQueryKey(gameId: string) {
  return ["game-data", gameId];
}

export const GameDataQuery = (gameId: string) => ({
  queryKey: getGameDataQueryKey(gameId),
  queryFn: async () => loadGameDto(gameId),
});

export const gameDataLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<string> }): Promise<GameDataVM> => {
    const query = GameDataQuery(params.gameId ?? "");
    return queryClient.ensureQueryData(query);
  };

export const GameQuery = () => ({
  queryKey: ["games"],
  queryFn: async () => loadExistingGameIds(),
});

export const gameLoader = (queryClient: QueryClient) => async (): Promise<string[]> => {
  const query = GameQuery();
  return queryClient.ensureQueryData(query);
};
