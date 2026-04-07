import { Box, styled } from "@mui/material";

export const FiltersWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "8px",
  marginBottom: "16px",
}));

export const EmptyWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "12px",
  padding: "40px 0",
}));
