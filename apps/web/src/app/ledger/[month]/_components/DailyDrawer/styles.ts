import { Box, Drawer, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

export const ItemsWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

export const Item = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
}));

export const ColWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}));

export const RowWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const AddItemButton = styled(Box)(() => ({
  width: "fit-content",
  height: "52px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
}));

export const Circle = styled(Box)(() => ({
  width: "27px",
  height: "27px",
  borderRadius: "50%",
  backgroundColor: colors.gray[150],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const MoreFunctions = styled(Box)(() => ({
  width: "fit-content",
  display: "flex",
  backgroundColor: "#F5F5F5",
  borderRadius: "4px",
}));

export const FunctionWrapper = styled(Box)(() => ({
  padding: "7px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
