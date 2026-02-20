import React from "react";
import type { Grid, Cell } from "../api/CrosswordApi";
import Box from "@mui/material/Box";
import CrosswordCell from "./CrosswordCell";

interface Props {
  grid: Grid;
}

const CrosswordGrid: React.FC<Props> = ({ grid }) => {
  const { cells } = grid;

  const rows = grid.rowCount + 1;
  const cols = grid.columnCount + 1;

  const matrix: Cell[][] = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => {
      const backendY = rows - 1 - rowIndex;
      const cell = cells.find(
        (c) => c.coordinates.x === colIndex && c.coordinates.y === backendY,
      );
      if (!cell) {
        throw new Error(
          `Missing cell at (${colIndex}, ${backendY}). Backend grid is incomplete.`,
        );
      }
      return cell;
    }),
  );
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 40px)`,
        gridTemplateRows: `repeat(${rows}, 40px)`,
        gap: 0,
        border: "1px solid black",
        width: "fit-content",
        mx: "auto",
      }}
    >
      {matrix.flat().map((cell, index) => (
        <CrosswordCell key={index} cell={cell} />
      ))}
    </Box>
  );
};

export default CrosswordGrid;
