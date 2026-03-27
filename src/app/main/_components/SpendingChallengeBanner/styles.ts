import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  height: "197px",
  padding: "16px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",

  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",

  cursor: "pointer",
}));
