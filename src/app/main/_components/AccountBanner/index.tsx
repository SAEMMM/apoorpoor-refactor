"use client";

import { Box, Typography } from "@mui/material";
import { GoAccountButton, LeftWrapper, Wrapper } from "./styles";

import Image from "next/image";
import { colors } from "@/styles/theme/tokens/color";
import dayjs from "dayjs";
import { getMonthlyExpense } from "./types";
import { isEmpty } from "lodash";
import { marchLedgerMock } from "@/mocks/ledger";
import { useRouter } from "next/navigation";

export const AccountBanner = () => {
  const router = useRouter();

  const currentMonth = dayjs(new Date()).format("YYYY-MM");

  // TODO: api 연결 시, 해당 유저 + 현재 월의 소비 액
  const hasAccount = marchLedgerMock;

  return (
    <Wrapper
      hasAccount={!isEmpty(hasAccount)}
      onClick={() => router.push(`/ledger/${currentMonth}`)}
    >
      <LeftWrapper>
        {hasAccount ? (
          <Box>
            <Typography variant="h2" color={colors.white}>
              가계부
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
            이번달 소비 : {getMonthlyExpense(hasAccount).toLocaleString()}원
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
