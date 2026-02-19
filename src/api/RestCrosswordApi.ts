import type { CrosswordApi, PuzzleSummary, Puzzle } from "./CrosswordApi";

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

  private prefixBaseUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  private toFormData(file: File) {
    const data = new FormData();
    data.append("file", file);
    return data;
  }

  private async handlePuzzleResponse(response: Response): Promise<Puzzle> {
    return this.handleResponse<Puzzle>(response, [
      "createdAt",
    ]) as Promise<Puzzle>;
  }

  private async handlePuzzleSummariesResponse(
    response: Response,
  ): Promise<PuzzleSummary[]> {
    return this.handleResponse<PuzzleSummary>(response, [
      "createdAt",
    ]) as Promise<PuzzleSummary[]>;
  }

  private async handleResponse<T>(
    response: Response,
    dateFields: (keyof T)[] = [],
  ): Promise<T | T[]> {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.map((item) => this.parseResponseDates<T>(item, dateFields));
    }

    return this.parseResponseDates<T>(data, dateFields);
  }

  private parseResponseDates<T>(data: any, dateFields: (keyof T)[]): T {
    const result = { ...data };
    for (const key of dateFields) {
      if (result[key] && typeof result[key] === "string") {
        result[key] = new Date(result[key]) as any;
      }
    }
    return result as T;
  }
}
