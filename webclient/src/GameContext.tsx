import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import { Game, GameDto, GameVM } from './game.model';
import { loadGameDto, postGameData } from './game.service';

export interface GameContextData {
  games: GameVM[];
  players: string[];
  loading: boolean;
  error?: string;
  saveGame?: (newGame: Game) => Promise<void>;
}

const GameContext = createContext<GameContextData>({
  games: [],
  players: [],
  loading: false,
  error: undefined,
  saveGame: undefined,
});

function GameProvider({ children }: Readonly<PropsWithChildren>) {
  const [games, setGames] = useState<GameVM[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const mapGameToGameVm = (game: Game): GameVM => {
    return {
      ...game,
      totalScore: game.vonHand ? game.score * 2 : game.score,
    };
  };

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      let dto: GameDto = { games: [], players: [] };
      try {
        dto = await loadGameDto();
        setGames(dto.games.map((g) => mapGameToGameVm(g)));
        setPlayers(dto.players);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, []);

  const saveGame = useCallback(
    async (newGame: Game) => {
      setLoading(true);
      try {
        setGames([...games, newGame].map((g) => mapGameToGameVm(g)));
        await postGameData(newGame, players);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [games, players, setGames, setLoading, setError]
  );

  return useMemo(
    () => (
      <GameContext.Provider
        value={{ games, players, loading, error, saveGame }}
      >
        {children}
      </GameContext.Provider>
    ),
    [games, players, loading, error, saveGame, children]
  );
}

export { GameProvider, GameContext };
