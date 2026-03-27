"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  centered?: boolean;
};

export default function PageContainer({
  children,
  centered = false,
}: PageContainerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        px: 2,
        py: 3,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        ...(centered && {
          alignItems: "center",
          justifyContent: "center",
        }),
      }}
    >
      {children}
    </Box>
  );
}
