"use client";

import { Box, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

export const PoorContainer = styled(Box)(() => ({
  width: "240px",
  height: "280px",
  backgroundColor: "#FAFAFA",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  position: "relative",
}));

export const ProfileWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
}));

export const GoItemButton = styled(Box)(() => ({
  width: "60px",
  height: "32px",
  border: `1px solid ${colors.gray[250]}`,
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",

  fontSize: 14,
  fontWeight: 400,
  color: "#949494",
}));
