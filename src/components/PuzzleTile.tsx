import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { PuzzleSummary } from "../api/CrosswordApi";
import { ShortDateTime } from "./ShortDateTime";

interface PuzzleTileProps {
  puzzle: PuzzleSummary;
}

const PuzzleTile: React.FC<PuzzleTileProps> = ({ puzzle }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/puzzle/${puzzle.id}`)}>
        <CardContent>
          <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
            {puzzle.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created: <ShortDateTime date={puzzle.createdAt} showTime={true} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Attempts: {puzzle.attemptCount}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PuzzleTile;
