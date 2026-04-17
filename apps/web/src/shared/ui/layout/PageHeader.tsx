"use client";

import { Box, IconButton, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import { colors } from "@/styles/theme/tokens/color";

interface PageHeaderProps {
  title: string;
  referenceUrl: string;
}

export default function PageHeader(props: PageHeaderProps) {
  const { title, referenceUrl } = props;

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link href={referenceUrl} style={{ position: "absolute", left: 0 }}>
        <IconButton size="small">
          <ArrowBackIosNewIcon
            sx={{ width: "24px", height: "24px", color: colors.black }}
          />
        </IconButton>
      </Link>

      <Typography variant="h2">{title}</Typography>
    </Box>
  );
}
