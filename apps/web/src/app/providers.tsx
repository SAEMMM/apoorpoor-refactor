"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";

import React from "react";
import { SnackbarProvider } from "@/shared/ui/Snackbar/SnackbarProvider";
import { theme } from "@/styles/theme";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  );
}