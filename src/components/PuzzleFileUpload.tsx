import React, { useRef, useState } from "react";
import { useApi } from "../context/ApiContext";
import { usePuzzleContext } from "../context/PuzzleContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";

const PuzzleFileUpload: React.FC = () => {
  const api = useApi();
  const { addPuzzle } = usePuzzleContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus("Uploading file...");

    try {
      const puzzle = await api.uploadPuzzleFile(file);
      addPuzzle(puzzle);
      setStatus(`Puzzle created: ${puzzle.name}`);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleClick}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Puzzle"}
      </Button>

      {status && (
        <Typography
          sx={{ mt: 1 }}
          color={status.startsWith("Error") ? "error" : "primary"}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default PuzzleFileUpload;
