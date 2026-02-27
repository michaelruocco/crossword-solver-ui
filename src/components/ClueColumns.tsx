import React from "react";
import Box from "@mui/material/Box";
import type { Clues, Clue } from "../api/CrosswordApi";
import ClueList from "./ClueList";

interface Props {
  clues: Clues;
  onClueClick?: (clue: Clue) => void;
  onClearAnswer?: (clue: Clue) => void;
}

const ClueColumns: React.FC<Props> = ({
  clues,
  onClueClick,
  onClearAnswer,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        gap: 2,
      }}
    >
      <ClueList
        title="Across"
        clues={clues.across}
        onClueClick={onClueClick}
        onClearAnswer={onClearAnswer}
      />
      <ClueList
        title="Down"
        clues={clues.down}
        onClueClick={onClueClick}
        onClearAnswer={onClearAnswer}
      />
    </Box>
  );
};

export default ClueColumns;
