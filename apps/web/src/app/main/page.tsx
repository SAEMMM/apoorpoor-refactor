import {
  AuthResponse,
  LedgerDashboardResponse,
  LedgerSettingsResponse,
} from "@repo/shared";
import { Box, IconButton, Typography } from "@mui/material";
import { Contents, Header } from "./styles";

import { AccountBanner } from "./_components/AccountBanner";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { GrowPoorBanner } from "./_components/GrowPoorBanner";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
import React from "react";
import { SpendingChallengeBanner } from "./_components/SpendingChallengeBanner";
import { colors } from "@/styles/theme/tokens/color";
import dayjs from "dayjs";
import { fetchApi } from "@/shared/lib/fetchApi";

const getCurrentMonthRange = () => {
  const now = dayjs();

  return {
    month: now.format("YYYY-MM"),
    startDate: now.startOf("month").format("YYYY-MM-DD"),
    endDate: now.endOf("month").format("YYYY-MM-DD"),
  };
};

const getLedgerDashboard = async (
  startDate: string,
  endDate: string,
): Promise<LedgerDashboardResponse | null> => {
  return fetchApi<LedgerDashboardResponse>({
    path: "/ledger/dashboard",
    searchParams: {
      startDate,
      endDate,
    },
  });
};

export default async function MainPage() {
  const { month, startDate, endDate } = getCurrentMonthRange();

  const [dashboard, settings, auth] = await Promise.all([
    getLedgerDashboard(startDate, endDate),
    fetchApi<LedgerSettingsResponse>({
      path: "/ledger/settings",
    }),
    fetchApi<AuthResponse>({
      path: "/auth/me",
    }),
  ]);

  const monthlyExpense = dashboard?.summary.expense ?? 0;
  const ledgerName = settings?.name ?? "가계부";
  const user = auth?.user ?? null;

  console.log(user);
  return (
    <PageContainer>
      <Header>
        <IconButton
          size="small"
          sx={{
            p: 0,
            width: 44,
            height: 44,
          }}
        >
          <Image
            src={"/images/main/howto.png"}
            width={44}
            height={44}
            alt="how to"
            unoptimized
          />
        </IconButton>

        <Link href="/user-info">
          <IconButton size="small">
            <AccountCircleIcon
              fontSize="large"
              sx={{ color: colors.gray[350] }}
            />
          </IconButton>
        </Link>
      </Header>

      <Contents>
        <AccountBanner
          month={month}
          ledgerName={ledgerName}
          monthlyExpense={monthlyExpense}
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <GrowPoorBanner />
          <SpendingChallengeBanner />
        </Box>
      </Contents>
    </PageContainer>
  );
}
