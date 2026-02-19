import React, { createContext, useContext, useState } from "react";
import type { PuzzleSummary, Puzzle } from "../api/CrosswordApi";

interface PuzzleContextType {
  puzzles: PuzzleSummary[];
  setPuzzles: React.Dispatch<React.SetStateAction<PuzzleSummary[]>>;
  addPuzzle: (puzzle: Puzzle) => void;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const PuzzleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [puzzles, setPuzzles] = useState<PuzzleSummary[]>([]);

  const addPuzzle = (puzzle: Puzzle) => {
    var summary: PuzzleSummary = {
      id: puzzle.id,
      name: puzzle.name,
      createdAt: puzzle.createdAt,
      attemptCount: 0,
    };
    setPuzzles((prev) => [summary, ...prev]);
  };

  return (
    <PuzzleContext.Provider value={{ puzzles, setPuzzles, addPuzzle }}>
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error("usePuzzleContext must be used within a PuzzleProvider");
  }
  return context;
};
