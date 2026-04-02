"use client";

import { Box } from "@mui/material";
import React from "react"
import { colors } from "@/styles/theme/tokens/color";

export const Divider = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "12px",
        minHeight: "12px",
        backgroundColor: colors.gray[150],
      }}
    />
  );
};
