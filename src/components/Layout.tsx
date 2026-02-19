import React, { ReactNode } from "react";
import { Container } from "@mui/material";
import MainAppBar from "./MainAppBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MainAppBar />
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default Layout;
