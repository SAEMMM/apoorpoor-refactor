"use client";

import { Box, styled } from "@mui/material";

export const Form = styled("form")(() => ({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));

export const FieldsWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  flexGrow: 1,
}));

export const FieldWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
}));

export const TypeSelector = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "16px",
}));

export const DateSelector = styled(Box)(() => ({
  width: "100%",
  height: "48px",
  paddingLeft: "12px",
  borderBottom: "1px solid",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
}));

export const SubmitButtonWrapper = styled(Box)(() => ({
  width: "100%",
  paddingTop: "24px",
  paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
}));
