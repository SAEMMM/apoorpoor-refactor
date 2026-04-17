import { Box, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "32px",
}));

export const ItemInfoWrapper = styled(Box)(() => ({
  width: "100%",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: colors.gray[150],
}));

export const ItemInfoRow = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
}));
