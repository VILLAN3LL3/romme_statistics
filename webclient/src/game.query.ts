import { Params } from "react-router-dom";

import { QueryClient } from "@tanstack/react-query";

import { GameDataVM } from "./game.model";
import { loadGameDto } from "./game.service";

export const GameQuery = (players: string[]) => ({
  queryKey: ["game", ...players],
  queryFn: async () => loadGameDto(players),
});

export const gameLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<string> }): Promise<GameDataVM> => {
    const query = GameQuery(params.players?.split("_") ?? []);
    return queryClient.ensureQueryData(query);
  };
