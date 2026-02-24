import type { AttemptSummary } from "../api/CrosswordApi";
import { Box, Typography } from "@mui/material";

interface Props {
  attempts: AttemptSummary[];
  selectedAttemptId?: string;
  onSelect: (id: string) => void;
}

export default function AttemptPanel({
  attempts,
  selectedAttemptId,
  onSelect,
}: Props) {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Attempts
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {attempts.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No attempts yet
          </Typography>
        )}

        {attempts.map((a, idx) => {
          const attemptNumber = attempts.length - idx;

          return (
            <Box
              key={a.id}
              onClick={() => onSelect(a.id)}
              sx={(theme) => ({
                p: 1,
                borderRadius: 1,
                cursor: "pointer",
                bgcolor:
                  a.id === selectedAttemptId
                    ? theme.palette.action.selected
                    : "transparent",
                "&:hover": {
                  bgcolor:
                    a.id === selectedAttemptId
                      ? theme.palette.action.selected
                      : theme.palette.action.hover,
                },
              })}
            >
              <Typography variant="body2">Attempt #{attemptNumber}</Typography>

              <Typography variant="caption" color="text.secondary">
                {a.solving ? "Solving…" : ""}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
