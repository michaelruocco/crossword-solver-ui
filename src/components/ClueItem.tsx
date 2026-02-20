import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Clue } from "../api/CrosswordApi";

interface ClueItemProps {
  clue: Clue;
  onClick?: (clue: Clue) => void;
}

const ClueItem: React.FC<ClueItemProps> = ({ clue, onClick }) => {
  function toNumber(id: string): number {
    return parseInt(id, 10);
  }

  return (
    <Box
      onClick={() => onClick?.(clue)}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        cursor: "pointer",
        borderRadius: 1,
        transition: "background-color 0.15s ease, font-weight 0.15s ease",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <Typography
        sx={{
          width: "26px",
          fontWeight: "bold",
          transition: "color 0.15s ease",
          "&:hover": {
            color: "text.primary",
          },
        }}
      >
        {toNumber(clue.id)}
      </Typography>

      <Typography
        sx={{
          flex: 1,
        }}
      >
        {clue.text}
      </Typography>

      {clue.answer && (
        <Typography
          sx={{
            pl: 5,
            textAlign: "left",
            color: "primary.main",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {clue.answer}
        </Typography>
      )}
    </Box>
  );
};

export default ClueItem;
