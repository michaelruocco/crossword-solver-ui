import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useApi } from "../context/ApiContext";
import type { Puzzle } from "../api/CrosswordApi";

const PuzzlePage: React.FC = () => {
  const { puzzleId } = useParams<{ puzzleId: string }>();
  const api = useApi();
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPuzzle = async () => {
      setPuzzle(await api.getPuzzleById(puzzleId));
    };
    fetchPuzzle();
  }, []);

  return (
    <>
      <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
        {puzzle?.name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Puzzle details will go here.
      </Typography>
    </>
  );
};

export default PuzzlePage;
