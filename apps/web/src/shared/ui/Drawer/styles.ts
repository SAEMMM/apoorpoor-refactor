import { Box, Drawer, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

export const MuiDrawer = styled(Drawer)(() => ({
  ".MuiPaper-root": {
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  },
}));

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  padding: "30px",
  backgroundColor: colors.white,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

export const Header = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
