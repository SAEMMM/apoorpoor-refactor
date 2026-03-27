import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  height: "197px",
  padding: "16px 16px 0px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",

  cursor: "pointer",
}));
