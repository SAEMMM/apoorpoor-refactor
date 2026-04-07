"use client";

import { Box, Typography } from "@mui/material";
import { GoAccountButton, LeftWrapper, Wrapper } from "./styles";

import Image from "next/image";
import React from "react";
import { colors } from "@/styles/theme/tokens/color";
import { useRouter } from "next/navigation";

type AccountBannerProps = {
  month: string;
  ledgerName: string;
  monthlyExpense: number;
};

export const AccountBanner = ({
  month,
  ledgerName,
  monthlyExpense,
}: AccountBannerProps) => {
  const hasAccount = true;
  const router = useRouter();

  return (
    <Wrapper
      hasAccount={hasAccount}
      onClick={() => router.push(`/ledger/${month}`)}
    >
      <LeftWrapper>
        {hasAccount ? (
          <Box>
            <Typography variant="h2" color={colors.white}>
              {ledgerName}
            </Typography>
            <Typography variant="body2" color={colors.white}>
              쉽고 편한 가계부 작성
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="h2">처음 오셨나요?</Typography>
            <Typography variant="body2" color={colors.gray[450]}>
              가계부를 생성해주세요
            </Typography>
          </Box>
        )}

        {hasAccount ? (
          <Typography variant="body2" fontWeight={700} color={colors.white}>
            이번달 소비 : {monthlyExpense.toLocaleString()}원
          </Typography>
        ) : (
          <GoAccountButton>
            <Typography variant="body2" color={colors.white} fontWeight={700}>
              가계부 생성하기
            </Typography>
          </GoAccountButton>
        )}
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