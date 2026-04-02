"use client";

import { Box } from "@mui/material";
import React from "react";
import { colors } from "@/styles/theme/tokens/color";
import { keyframes } from "@mui/system";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-8px);
    opacity: 1;
  }
`;

const dotStyle = {
  width: 20,
  height: 20,
  borderRadius: "50%",
  flexShrink: 0,
} as const;

export default function LoadingPage() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Box
          sx={{
            ...dotStyle,
            backgroundColor: colors.primary.main,
            animation: `${bounce} 1.2s infinite ease-in-out`,
            animationDelay: "0s",
          }}
        />
        <Box
          sx={{
            ...dotStyle,
            backgroundColor: colors.secondary.main,
            animation: `${bounce} 1.2s infinite ease-in-out`,
            animationDelay: "0.2s",
          }}
        />
        <Box
          sx={{
            ...dotStyle,
            backgroundColor: colors.primary.main,
            animation: `${bounce} 1.2s infinite ease-in-out`,
            animationDelay: "0.4s",
          }}
        />
      </Box>
    </Box>
  );
}
