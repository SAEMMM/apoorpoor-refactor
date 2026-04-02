"use client";

import { Box, styled } from "@mui/material";

export const Header = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  marginBottom: "24px",
}));

export const Contents = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
}));
