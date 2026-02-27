import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Clue } from "../api/CrosswordApi";
import ClueItem from "./ClueItem";

interface Props {
  title: string;
  clues: Clue[];
  onClueClick?: (clue: Clue) => void;
  onClearAnswer?: (clue: Clue) => void;
}

const ClueList: React.FC<Props> = ({
  title,
  clues,
  onClueClick,
  onClearAnswer,
}) => {
  return (
    <Box
      sx={{
        textAlign: "left",
        padding: "5px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        {title}
      </Typography>
      {clues.map((clue) => (
        <ClueItem
          key={clue.id}
          clue={clue}
          onClick={onClueClick}
          onClearAnswer={onClearAnswer}
        />
      ))}
    </Box>
  );
};

export default ClueList;
