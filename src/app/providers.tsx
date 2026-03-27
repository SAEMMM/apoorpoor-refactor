"use client";

import { CssBaseline } from "@mui/material";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}
