import { z } from "zod";
import {
  type Attempt,
  type CrosswordApi,
  type PuzzleSummary,
  type Puzzle,
  PuzzleSchema,
  AttemptSchema,
  PuzzleSummarySchema,
  type Clue,
  type AttemptSummary,
  AttemptSummarySchema,
} from "./CrosswordApi";

export class RestCrosswordApi implements CrosswordApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async createPuzzleFromUrl(imageUrl: string): Promise<Puzzle> {
    const url = this.prefixBaseUrl("/v1/puzzles");
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    };

    const response = await fetch(url, request);

    return this.handlePuzzleResponse(response);
  }

  async uploadPuzzleFile(file: File): Promise<Puzzle> {
    const url = this.prefixBaseUrl("/v1/puzzle-files");
    const request = {
      method: "POST",
      body: this.toFormData(file),
    };

    const response = await fetch(url, request);

    return this.handlePuzzleResponse(response);
  }

  async getPuzzleSummaries(): Promise<PuzzleSummary[]> {
    const url = this.prefixBaseUrl("/v1/puzzle-summaries");

    const response = await fetch(url);

    return this.handlePuzzleSummariesResponse(response);
  }

  async getPuzzleById(puzzleId: string): Promise<Puzzle> {
    const url = this.prefixBaseUrl(`/v1/puzzles/${puzzleId}`);

    const response = await fetch(url);

    return this.handlePuzzleResponse(response);
  }

  async createAttempt(puzzleId: string): Promise<Attempt> {
    const url = this.prefixBaseUrl(`/v1/puzzles/${puzzleId}/attempts`);
    const request = {
      method: "POST",
    };

    const response = await fetch(url, request);

    return this.handleAttemptResponse(response);
  }

  async autoSolveAttempt(
    puzzleId: string,
    attemptId: string,
  ): Promise<Attempt> {
    const url = this.prefixBaseUrl(
      `/v1/puzzles/${puzzleId}/attempts/${attemptId}/automatic-answers`,
    );
    const request = {
      method: "POST",
    };

    const response = await fetch(url, request);

    return this.handleAttemptResponse(response);
  }

  async getAttemptById(puzzleId: string, attemptId: string): Promise<Attempt> {
    const url = this.prefixBaseUrl(
      `/v1/puzzles/${puzzleId}/attempts/${attemptId}`,
    );

    const response = await fetch(url);

    return this.handleAttemptResponse(response);
  }

  async updateAttemptAnswer(
    puzzleId: string,
    attemptId: string,
    clue: Clue,
    answer: string,
  ): Promise<Attempt> {
    const url = this.prefixBaseUrl(
      `/v1/puzzles/${puzzleId}/attempts/${attemptId}/answers`,
    );
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: clue.id,
        value: answer.toUpperCase(),
      }),
    };

    const response = await fetch(url, request);

    return this.handleAttemptResponse(response);
  }

  async getPuzzleAttemptSummaries(puzzleId: string): Promise<AttemptSummary[]> {
    const url = this.prefixBaseUrl(`/v1/puzzles/${puzzleId}/attempt-summaries`);

    const response = await fetch(url);

    return this.handleAttemptSummariesResponse(response);
  }

  private prefixBaseUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  private toFormData(file: File) {
    const data = new FormData();
    data.append("file", file);
    return data;
  }

  private async handlePuzzleResponse(response: Response): Promise<Puzzle> {
    return this.parse(response, PuzzleSchema);
  }

  private async handlePuzzleSummariesResponse(
    response: Response,
  ): Promise<PuzzleSummary[]> {
    return this.parse(response, z.array(PuzzleSummarySchema));
  }

  private async handleAttemptResponse(response: Response): Promise<Attempt> {
    return this.parse(response, AttemptSchema);
  }

  private async handleAttemptSummariesResponse(
    response: Response,
  ): Promise<AttemptSummary[]> {
    return this.parse(response, z.array(AttemptSummarySchema));
  }

  private async parse<T>(response: Response, schema: z.ZodType<T>): Promise<T> {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return schema.parse(json);
  }
}
