"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { colors } from "@/styles/theme/tokens/color";

type MobileAppShellProps = {
  children: ReactNode;
};

export default function MobileAppShell({ children }: MobileAppShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        backgroundColor: colors.primary.main,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        id="app-shell"
        sx={{
          width: "100%",
          maxWidth: "430px",
          minHeight: "100dvh",
          backgroundColor: colors.white,
          boxSizing: "border-box",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
