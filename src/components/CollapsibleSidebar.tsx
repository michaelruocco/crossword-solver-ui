import React from "react";
import { Box, IconButton, Drawer, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  defaultOpen: boolean;
  children: React.ReactNode;
  drawerWidth: number;
  railWidth: number;
  onWidthChange: (width: number) => void;
};

export default function CollapsibleSidebar({
  defaultOpen,
  children,
  drawerWidth,
  railWidth,
  onWidthChange,
}: Props) {
  const [open, setOpen] = React.useState<boolean>(defaultOpen);

  const width = open ? drawerWidth : railWidth;

  const handleToggle = () => {
    const newOpen = !open;
    setOpen(newOpen);
    onWidthChange(newOpen ? drawerWidth : railWidth);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={true}
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          position: "relative",
          width,
          height: "100%",
          overflowX: "hidden",
          transition: (t) =>
            t.transitions.create("width", {
              duration: t.transitions.duration.shorter,
            }),
          boxSizing: "border-box",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          flex: 1,
          p: open ? 1 : 0,
          justifyContent: open ? "space-between" : "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            overflow: "auto",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
            transition: (t) =>
              t.transitions.create("opacity", {
                duration: t.transitions.duration.shorter,
              }),
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexShrink: 0,
            justifyContent: "center",
            alignItems: "center",
            p: 0.5,
          }}
        >
          <IconButton
            size="small"
            aria-label={open ? "Close sidebar" : "Open sidebar"}
            onClick={handleToggle}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
}
