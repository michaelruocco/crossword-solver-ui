import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import type { Clue } from "../api/CrosswordApi";

interface Props {
  open: boolean;
  clue?: Clue;
  onClose: () => void;
  onUpdate: (clue: Clue, answer: string) => void;
}

const ClueAnswerDialog: React.FC<Props> = ({
  open,
  clue,
  onClose,
  onUpdate,
}) => {
  if (!clue) {
    return;
  }

  const [answer, setAnswer] = useState(clue.answer ?? "");

  useEffect(() => {
    if (clue) {
      setAnswer(clue.answer ?? "");
    }
  }, [clue]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="span">
          {clue.id} - {clue.text}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Your Answer"
          defaultValue={clue.answer}
          onChange={(e) => setAnswer(e.target.value)}
          autoFocus
          sx={{ mt: 1 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!answer}
          onClick={() => onUpdate(clue, answer)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClueAnswerDialog;
