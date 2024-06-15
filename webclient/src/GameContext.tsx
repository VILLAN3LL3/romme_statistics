import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Game } from "./game.model";
import { loadGames, postGame } from "./game.service";

export interface GameContextData {
  games: Game[];
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

const GameDispatchContext = createContext<
  Dispatch<SetStateAction<Game[]>> | undefined
>(undefined);

function GameProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const getGames = async () => {
    setLoading(true);
    let loadedGames = [];
    try {
      loadedGames = await loadGames();
      setGames(loadedGames);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const saveGame = useCallback(
    async (newGame: Game) => {
      setLoading(true);
      try {
        setGames([...games, newGame]);
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

export { GameProvider, GameContext, GameDispatchContext };
