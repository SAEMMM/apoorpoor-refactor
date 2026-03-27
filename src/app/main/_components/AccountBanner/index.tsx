"use client";

import { Box, Typography } from "@mui/material";
import { GoAccountButton, LeftWrapper, Wrapper } from "./styles";

import Image from "next/image";
import { colors } from "@/styles/theme/tokens/color";

export const AccountBanner = () => {
  return (
    <Wrapper>
      <LeftWrapper>
        <Box>
          <Typography variant="h2">처음 오셨나요?</Typography>
          <Typography variant="body2" color={colors.gray[450]}>
            가계부를 생성해주세요
          </Typography>
        </Box>

        <GoAccountButton>
          <Typography variant="body2" color={colors.white} fontWeight={700}>
            가계부 생성하기
          </Typography>
        </GoAccountButton>
      </LeftWrapper>

      <Image
        src={"/images/main/account.png"}
        width={77}
        height={97}
        alt="account img"
        unoptimized
      />
    </Wrapper>
  );
};
