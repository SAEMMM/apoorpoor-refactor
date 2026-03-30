"use client";

import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const HeaderWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const MonthWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 0,
}));

export const TitleWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",

  cursor: "pointer",
}));

export const AmountWrapper = styled(Box)(() => ({
  width: "100%",
  marginTop: "78px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

export const MonthlyTotalWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const AmountRowWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));
