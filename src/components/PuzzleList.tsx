import React from "react";
import { usePuzzleContext } from "../context/PuzzleContext";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PuzzleTile from "./PuzzleTile";

const PuzzleList: React.FC = () => {
  const { puzzles } = usePuzzleContext();

  if (puzzles.length === 0) {
    return <Typography>No puzzles available</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {puzzles.map((puzzle) => (
        <Grid item xs={12} sm={6} md={4} key={puzzle.id}>
          <PuzzleTile puzzle={puzzle} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PuzzleList;
