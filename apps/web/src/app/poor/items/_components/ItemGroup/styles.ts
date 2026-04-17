"use client";

import { Box, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

export const TabsWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  borderBottom: `1px solid ${colors.gray[150]}`,
}));

export const Tab = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ isSelected }) => ({
  height: "44px",
  padding: "14px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: `1px solid ${isSelected ? colors.primary.main : "transparent"}`,
}));

export const ItemWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
}));

export const ImageWrapper = styled(Box)(() => ({
  width: "100%",
  height: "150px",

  position: "relative",

  padding: "8px",

  backgroundColor: colors.gray[150],
  borderRadius: "20px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",

  boxSizing: "border-box",
}));

export const LockedImageWrapper = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "150px",
  paddingTop: "24px",
  backgroundColor: "#14305C80",
  borderRadius: "20px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const RequiredLevelChip = styled(Box)(() => ({
  width: "60px",
  height: "60px",
  borderRadius: "22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF80",
}));

export const ImageArea = styled(Box)(() => ({
  width: "100%",
  minHeight: "68px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}));

export const ItemName = styled(Box)(() => ({
  width: "100%",
  minHeight: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

export const StatusChip = styled(Box)(() => ({
  width: "100%",
  height: "32px",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
