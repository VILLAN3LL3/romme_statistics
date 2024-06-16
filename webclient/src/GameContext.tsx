import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Game, GameVM } from "./game.model";
import { loadGames, postGame } from "./game.service";

export interface GameContextData {
  games: GameVM[];
  loading: boolean;
  error?: string;
  saveGame?: (newGame: Game) => Promise<void>;
}

const GameContext = createContext<GameContextData>({
  games: [],
  loading: false,
  error: undefined,
  saveGame: undefined,
});

function GameProvider({ children }: Readonly<PropsWithChildren>) {
  const [games, setGames] = useState<GameVM[]>([]);
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
      let loadedGames = [];
      try {
        loadedGames = await loadGames();
        setGames(loadedGames.map((g) => mapGameToGameVm(g)));
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
        await postGame(newGame);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [games, setGames, setLoading, setError]
  );

  return useMemo(
    () => (
      <GameContext.Provider value={{ games, loading, error, saveGame }}>
        {children}
      </GameContext.Provider>
    ),
    [games, loading, error, saveGame, children]
  );
}

export { GameProvider, GameContext };
