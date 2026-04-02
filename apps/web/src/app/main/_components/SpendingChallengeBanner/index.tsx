"use client";

import { Box, Typography } from "@mui/material";

import Image from "next/image";
import { Wrapper } from "./styles";
import { colors } from "@/styles/theme/tokens/color";

export const SpendingChallengeBanner = () => {
  return (
    <Wrapper>
      <Box width={"100%"}>
        <Typography variant="h2">소비 챌린지</Typography>
        <Typography variant="body2" color={colors.gray[450]}>
          1주일 소비 챌린지
        </Typography>
      </Box>

      <Image
        src={"/images/main/challenge.png"}
        width={124}
        height={72}
        alt="challenge"
        unoptimized
      />
    </Wrapper>
  );
};
