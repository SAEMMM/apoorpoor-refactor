"use client";

import { Box, Typography } from "@mui/material";

import Image from "next/image";
import React from "react"
import { Wrapper } from "./styles";
import { colors } from "@/styles/theme/tokens/color";

export const GrowPoorBanner = () => {
  return (
    <Wrapper>
      <Box width={"100%"}>
        <Typography variant="h2">푸어 키우기</Typography>
        <Typography variant="body2" color={colors.gray[450]}>
          나만의 푸어 키우기
        </Typography>
      </Box>

      <Image
        src={"/images/main/main-poor.png"}
        width={122}
        height={225}
        alt="poor"
        unoptimized
      />
    </Wrapper>
  );
};
