export interface CrosswordApi {
  createPuzzleFromUrl(imageUrl: string): Promise<Puzzle>;
  uploadPuzzleFile(file: File): Promise<Puzzle>;

  getPuzzleSummaries(): Promise<PuzzleSummary[]>;
  getPuzzleById(puzzleId: string): Promise<Puzzle>;
}

export type PuzzleSummary = {
  id: string;
  name: string;
  createdAt: Date;
  attemptCount: number;
};

export type Puzzle = {
  id: string;
  name: string;
  hash: string;
  createdAt: Date;
  clues: Clues;
  grid: Grid;
};

export type Clues = {
  across: Clue[];
  down: Clue[];
};

export type Clue = {
  id: number;
  text: string;
  lengths: number[];
  answer?: string;
};

export type Grid = {
  cells: Cell[];
  columnWidth: number;
  rowHeight: number;
};

export type Cell = {
  id: number;
  coordinates: Coordinates;
  black: boolean;
  character: string;
};

export type Coordinates = {
  x: number;
  y: number;
};
