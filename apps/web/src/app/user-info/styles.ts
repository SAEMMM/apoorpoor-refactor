"use client";

import { Box, styled } from "@mui/material";
import { colors } from "@/styles/theme/tokens/color";

export const InfoSection = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

export const InfoRow = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const Divider = styled(Box)(() => ({
  width: "100%",
  height: "1px",
  backgroundColor: colors.gray[150],
}));
