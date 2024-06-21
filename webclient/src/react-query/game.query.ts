import { useNavigate } from "react-router-dom";

import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { loadExistingGameIds, postGame } from "@romme/service";

import { getGameDataQueryKey } from "./game-data.query";

export const GameQuery = () => ({
  queryKey: ["games"],
  queryFn: async () => loadExistingGameIds(),
});

export const gameLoader = (queryClient: QueryClient) => async (): Promise<string[]> => {
  const query = GameQuery();
  return queryClient.ensureQueryData(query);
};

export function useGameMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: postGame,
    onSuccess: (gameId: string) => {
      queryClient.invalidateQueries({ queryKey: getGameDataQueryKey(gameId) });
      navigate(gameId);
    },
  });
  return { mutate };
}
