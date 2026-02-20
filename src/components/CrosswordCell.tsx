import React from "react";
import Box from "@mui/material/Box";

import type { Cell } from "../api/CrosswordApi";

interface Props {
  cell: Cell;
}

const CrosswordCell: React.FC<Props> = ({ cell }) => {
  if (cell.black) {
    return <Box sx={{ width: 40, height: 40, backgroundColor: "black" }} />;
  }

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        border: "1px solid #ccc",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        fontWeight: "bold",
      }}
    >
      {cell.id && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 1,
            fontSize: "0.5rem",
            fontWeight: "bold",
            pointerEvents: "none",
            color: "#333",
          }}
        >
          {cell.id}
        </Box>
      )}
      <Box sx={{ zIndex: 1, color: "primary.main" }}>
        {cell.letter?.toUpperCase()}
      </Box>
    </Box>
  );
};

export default CrosswordCell;
