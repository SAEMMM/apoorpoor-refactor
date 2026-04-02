"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";

import React from "react";
import { theme } from "@/styles/theme";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}