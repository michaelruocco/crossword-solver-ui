import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { usePuzzleContext } from "../context/PuzzleContext";
import { useApi } from "../context/ApiContext";
import PuzzleFileUpload from "../components/PuzzleFileUpload";
import PuzzleList from "../components/PuzzleList";

const HomePage: React.FC = () => {
  const { setPuzzles } = usePuzzleContext();
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPuzzles = async () => {
      setLoading(true);
      try {
        setPuzzles(await api.getPuzzleSummaries());
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load puzzles");
      } finally {
        setLoading(false);
      }
    };
    fetchPuzzles();
  }, [api, setPuzzles]);

  if (loading) return <div>Loading puzzles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container sx={{ mt: 4 }}>
      <PuzzleFileUpload />

      {loading && <Typography>Loading puzzles...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <PuzzleList />
    </Container>
  );
};

export default HomePage;
