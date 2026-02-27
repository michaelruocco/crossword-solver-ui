import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import type { Clue } from "../api/CrosswordApi";

interface ClueItemProps {
  clue: Clue;
  onClick?: (clue: Clue) => void;
  onClearAnswer?: (clue: Clue) => void;
}

const ClueItem: React.FC<ClueItemProps> = ({
  clue,
  onClick,
  onClearAnswer,
}) => {
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
        "&:hover .clue-clear": {
          opacity: 1,
          pointerEvents: "auto",
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 3,
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              color: "primary.main",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {clue.answer}
          </Typography>
          <IconButton
            size="small"
            aria-label="Clear answer"
            className="clue-clear"
            onClick={(event) => {
              event.stopPropagation();
              onClearAnswer?.(clue);
            }}
            sx={{
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 0.15s ease",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ClueItem;
