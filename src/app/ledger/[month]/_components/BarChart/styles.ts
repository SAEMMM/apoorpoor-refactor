import { Box, Typography, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

export const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
}));

export const ChartHeader = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

export const ChartTitleRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

export const Description = styled(Typography)``;

export const ChartContent = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
}));

export const BarsWrapper = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: "16px",
}));

export const BarItem = styled(Box)(() => ({
  width: "40%",
  maxWidth: "96px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "16px",
}));

export const Bar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "heightPercent",
})<{ heightPercent: number; backgroundColor: string }>(
  ({ heightPercent, backgroundColor }) => ({
    width: "100%",
    height: heightPercent,
    borderRadius: "12px 12px 0 0",
    backgroundColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
  }),
);

export const ChartBottomLine = styled(Box)(() => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "1px",
  backgroundColor: colors.gray[300],
}));
