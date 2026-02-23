import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useApi } from "../context/ApiContext";
import type { Attempt, Puzzle, Clue } from "../api/CrosswordApi";
import CrosswordGrid from "../components/CrosswordGrid";
import Fade from "@mui/material/Fade";
import ClueColumns from "../components/ClueColumns";
import ClueAnswerDialog from "../components/ClueAnswerDialog";

const PuzzlePage: React.FC = () => {
  const { puzzleId } = useParams<{ puzzleId: string }>();
  if (!puzzleId) {
    throw new Error("PuzzlePage must be used with a puzzleId");
  }
  const api = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [attempt, setAttempt] = useState<Attempt>();
  const [selectedClue, setSelectedClue] = useState<Clue>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPuzzle = async () => {
      setLoading(true);
      try {
        setPuzzle(await api.getPuzzleById(puzzleId));
      } finally {
        setLoading(false);
      }
    };
    fetchPuzzle();
  }, []);

  useEffect(() => {
    if (!puzzle || !attempt?.solving) {
      return;
    }

    const interval = setInterval(() => {
      fetchAttempt(puzzle?.id, attempt.id);
    }, 2000);

    return () => clearInterval(interval);
  }, [attempt?.solving]);

  const handleStart = async () => {
    if (!puzzle) {
      throw new Error("puzzle must be loaded to start an attempt");
    }
    const newAttempt = await api.createAttempt(puzzle.id);
    setAttempt(newAttempt);
  };

  const handleSolve = async () => {
    if (!puzzle) {
      throw new Error("puzzle must be loaded to solve an attempt");
    }
    if (!attempt) {
      throw new Error("an attempt must be created before it can be solved");
    }
    const updatedAttempt = await api.autoSolveAttempt(puzzle.id, attempt.id);
    setAttempt(updatedAttempt);
  };

  const fetchAttempt = async (puzzleId: string, attemptId: string) => {
    const fetchedAttempt = await api.getAttemptById(puzzleId, attemptId);
    setAttempt(fetchedAttempt);
  };

  const handleClueClick = (clue: Clue) => {
    setSelectedClue(clue);
  };

  const handleUpdateAnswer = async (clue: Clue, answer: string) => {
    if (!puzzle) {
      throw new Error("puzzle must be loaded to update an attempt answer");
    }
    if (!attempt) {
      throw new Error(
        "an attempt must be created before answers can be updated",
      );
    }
    const updatedAttempt = await api.updateAttemptAnswer(
      puzzleId,
      attempt.id,
      clue,
      answer,
    );
    setAttempt(updatedAttempt);
    setSelectedClue(undefined);
  };

  if (!puzzle) {
    return <div>Loading puzzle...</div>;
  }

  const activePuzzle = attempt?.puzzle ?? puzzle;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
        >
          {puzzle?.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleStart}
            disabled={attempt !== undefined}
          >
            Start
          </Button>{" "}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSolve}
            disabled={attempt?.solving}
          >
            Solve
          </Button>{" "}
        </Box>

        <Fade in={!loading} timeout={300}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 2,
              width: "100%",
            }}
          >
            <CrosswordGrid grid={activePuzzle.grid} />
            <ClueColumns
              clues={activePuzzle.clues}
              onClueClick={handleClueClick}
            />
          </Box>
        </Fade>
      </Box>
      <ClueAnswerDialog
        open={!!selectedClue}
        clue={selectedClue}
        onClose={() => setSelectedClue(undefined)}
        onUpdate={(clue, answer) => handleUpdateAnswer(clue, answer)}
      />
    </>
  );
};

export default PuzzlePage;
