import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { ApiContext } from "./context/ApiContext.tsx";
import { RestCrosswordApi } from "./api/RestCrosswordApi.ts";
import { PuzzleProvider } from "./context/PuzzleContext.tsx";

const api = new RestCrosswordApi(import.meta.env.VITE_API_BASE_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <ApiContext.Provider value={api}>
      <PuzzleProvider>
        <App />
      </PuzzleProvider>
    </ApiContext.Provider>
  </StrictMode>,
);
