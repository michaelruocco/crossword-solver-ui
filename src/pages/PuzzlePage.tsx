import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { useApi } from "../context/ApiContext";
import type {
  Attempt,
  Puzzle,
  Clue,
  AttemptSummary,
} from "../api/CrosswordApi";
import CrosswordGrid from "../components/CrosswordGrid";
import Fade from "@mui/material/Fade";
import ClueColumns from "../components/ClueColumns";
import ClueAnswerDialog from "../components/ClueAnswerDialog";
import AttemptSidebar from "../components/AttemptSidebar";

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
  const [attempts, setAttempts] = useState<AttemptSummary[]>([]);
  const [selectedAttemptId, setSelectedAttemptId] = useState<string>();
  const [sidebarWidth, setSidebarWidth] = useState(44);
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
  }, [puzzleId]);

  useEffect(() => {
    const fetchAttempts = async () => {
      const list = await api.getPuzzleAttemptSummaries(puzzleId);
      setAttempts(list);
      if (!selectedAttemptId && list.length > 0) {
        setSelectedAttemptId(list[0].id);
      }
    };
    fetchAttempts();
  }, [puzzleId]);

  useEffect(() => {
    const fetchSelectedAttempt = async () => {
      if (!puzzleId) {
        return;
      }
      if (!selectedAttemptId) {
        return;
      }
      const selectedAttempt = await api.getAttemptById(
        puzzleId,
        selectedAttemptId,
      );
      setAttempt(selectedAttempt);
    };
    fetchSelectedAttempt();
  }, [selectedAttemptId]);

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
      return;
    }
    const newAttempt = await api.createAttempt(puzzle.id);
    setSelectedAttemptId(newAttempt.id);
    setAttempt(newAttempt);
  };

  const handleSolve = async () => {
    if (!puzzle) {
      return;
    }
    if (!attempt) {
      return;
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
      return;
    }
    if (!attempt) {
      return;
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

  const handleSelectAttempt = (id: string) => {
    setSelectedAttemptId(id);
  };

  if (!puzzle) {
    return <div>Loading puzzle...</div>;
  }

  const activePuzzle = attempt?.puzzle ?? puzzle;

  console.log(`sidebar width ${sidebarWidth}`);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <AttemptSidebar
        defaultOpen={false}
        attempts={attempts}
        selectedAttemptId={selectedAttemptId}
        onSelect={handleSelectAttempt}
        onWidthChange={(w) => setSidebarWidth(w)}
      />
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
        }}
      >
        <Container sx={{ mt: 4 }}>
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
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSolve}
                disabled={attempt?.solving}
              >
                Solve
              </Button>
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
        </Container>
      </Box>
    </Box>
  );
};

export default PuzzlePage;
