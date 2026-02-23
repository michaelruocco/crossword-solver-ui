import { z } from "zod";

export interface CrosswordApi {
  createPuzzleFromUrl(imageUrl: string): Promise<Puzzle>;
  uploadPuzzleFile(file: File): Promise<Puzzle>;

  getPuzzleSummaries(): Promise<PuzzleSummary[]>;
  getPuzzleById(puzzleId: string): Promise<Puzzle>;
  createAttempt(puzzleId: string): Promise<Attempt>;
  autoSolveAttempt(puzzleId: string, attemptId: string): Promise<Attempt>;
  getAttemptById(puzzleId: string, attemptId: string): Promise<Attempt>;
  updateAttemptAnswer(
    puzzleId: string,
    attemptId: string,
    clue: Clue,
    answer: string,
  ): Promise<Attempt>;
}

export type Coordinates = z.infer<typeof CoordinatesSchema>;
export type Cell = z.infer<typeof CellSchema>;
export type Grid = z.infer<typeof GridSchema>;
export type Clue = z.infer<typeof ClueSchema>;
export type Clues = z.infer<typeof CluesSchema>;
export type Puzzle = z.infer<typeof PuzzleSchema>;
export type PuzzleSummary = z.infer<typeof PuzzleSummarySchema>;
export type Attempt = z.infer<typeof AttemptSchema>;

export const CoordinatesSchema = z.object({ x: z.number(), y: z.number() });

export const CellSchema = z.object({
  id: z.number().optional(),
  coordinates: CoordinatesSchema,
  black: z.boolean(),
  letter: z.string().optional(),
});

export const GridSchema = z.object({
  cells: z.array(CellSchema),
  columnCount: z.number(),
  rowCount: z.number(),
});

export const ClueSchema = z.object({
  id: z.string(),
  text: z.string(),
  lengths: z.array(z.number()),
  answer: z.string().optional(),
});

export const CluesSchema = z.object({
  across: z.array(ClueSchema),
  down: z.array(ClueSchema),
});

export const PuzzleSchema = z.object({
  id: z.string(),
  name: z.string(),
  hash: z.string(),
  createdAt: z.coerce.date(),
  clues: CluesSchema,
  grid: GridSchema,
});

export const PuzzleSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  attemptCount: z.number(),
});

export const AttemptSchema = z.object({
  id: z.string(),
  solving: z.boolean(),
  puzzle: PuzzleSchema,
});
