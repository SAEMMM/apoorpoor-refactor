import { Box, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

export const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hasAccount",
})<{ hasAccount: boolean }>(({ hasAccount }) => ({
  width: "100%",
  height: "124px",
  padding: "13px",
  borderRadius: "12px",
  backgroundColor: hasAccount ? colors.primary.main : colors.gray[150],

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  cursor: "pointer",
}));

export const LeftWrapper = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const GoAccountButton = styled(Box)(() => ({
  width: "112px",
  height: "35px",
  borderRadius: "999px",
  backgroundColor: colors.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
