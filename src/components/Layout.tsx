import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import MainAppBar from "./MainAppBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <MainAppBar />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
