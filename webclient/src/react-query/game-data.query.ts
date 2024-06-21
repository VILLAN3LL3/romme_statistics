import { Params } from "react-router-dom";

import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { GameDataVM } from "../game.model";
import { loadGameDto, postGameData } from "../game.service";

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

export function useGameDataMutation(gameId: string, onSuccess: () => void) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postGameData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGameDataQueryKey(gameId) });
      onSuccess();
    },
  });
  return { mutate };
}
