// src/context/ApiContext.tsx
import { createContext, useContext } from "react";
import type { CrosswordApi } from "../api/CrosswordApi";

export const ApiContext = createContext<CrosswordApi | null>(null);

export const useApi = (): CrosswordApi => {
  const api = useContext(ApiContext);
  if (!api) {
    throw new Error(
      "API not provided. Did you forget to wrap your component in ApiContext.Provider?",
    );
  }
  return api;
};
