"use client";

import { Box, styled } from "@mui/material";

export const Form = styled("form")(() => ({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  flexGrow: 1,
}));

export const TypoWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}));

export const FieldsWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

export const FieldWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
}));

export const SubmitButtonWrapper = styled(Box)(() => ({
  width: "100%",
  paddingTop: "24px",
  paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
}));
