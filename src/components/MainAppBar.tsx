import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MainAppBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          Crossword Solver
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
