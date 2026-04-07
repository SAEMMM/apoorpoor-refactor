import { Box, IconButton } from "@mui/material";
import { Contents, Header } from "./styles";

import { AccountBanner } from "./_components/AccountBanner";
import { GrowPoorBanner } from "./_components/GrowPoorBanner";
import Image from "next/image";
import { LedgerDashboardResponse, LedgerSettingsResponse } from "@repo/shared";
import PageContainer from "@/shared/ui/layout/PageContainer";
import React from "react";
import { SpendingChallengeBanner } from "./_components/SpendingChallengeBanner";
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
      userId: "user-001",
      startDate,
      endDate,
    },
  });
};

export default async function MainPage() {
  const { month, startDate, endDate } = getCurrentMonthRange();

  const [dashboard, settings] = await Promise.all([
    getLedgerDashboard(startDate, endDate),
    fetchApi<LedgerSettingsResponse>({
      path: "/ledger/settings",
      searchParams: { userId: "user-001" },
    }),
  ]);

  const monthlyExpense = dashboard?.summary.expense ?? 0;
  const hasAccount = dashboard !== null;
  const ledgerName = settings?.name ?? "가계부";

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
