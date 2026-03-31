"use client";

import { Box } from "@mui/material";
import { BubblePosition } from "./types";
import { colors } from "@/styles/theme/tokens/color";
import { styled } from "@mui/system";

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "50px",
}));

export const TitleWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const ChartWrapper = styled(Box)(() => ({
  width: "80%",
  aspectRatio: "1 / 1",
  position: "relative",
  margin: "0 auto",
}));

export const Bubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bubblePosition",
})<{ bubblePosition: BubblePosition }>(({ bubblePosition }) => ({
  position: "absolute",
  left: bubblePosition.left,
  top: bubblePosition.top,
  transform: "translate(-50%, -50%)",
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: colors.white,
  boxShadow: "0 10px 4px rgba(0, 0, 0, 0.06)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
}));

// export const
