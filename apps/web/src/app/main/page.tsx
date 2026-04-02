import { Box, IconButton } from "@mui/material";
import { Contents, Header } from "./styles";

import { AccountBanner } from "./_components/AccountBanner";
import { GrowPoorBanner } from "./_components/GrowPoorBanner";
import Image from "next/image";
import { LedgerDashboardResponse } from "@repo/shared";
import PageContainer from "@/shared/ui/layout/PageContainer";
import React from "react";
import { SpendingChallengeBanner } from "./_components/SpendingChallengeBanner";

const getCurrentMonthRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const endDate = `${year}-${String(
    new Date(year, month + 1, 0).getDate(),
  ).padStart(2, "0")}`;

  return {
    month: `${year}-${String(month + 1).padStart(2, "0")}`,
    startDate,
    endDate,
  };
};

const getLedgerDashboard = async (
  startDate: string,
  endDate: string,
): Promise<LedgerDashboardResponse | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
  }

  const searchParams = new URLSearchParams({
    userId: "user-001",
    startDate,
    endDate,
  });

  const response = await fetch(
    `${baseUrl}/ledger/dashboard?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch ledger dashboard.");
  }

  return response.json();
};

export default async function MainPage() {
  const { month, startDate, endDate } = getCurrentMonthRange();
  const dashboard = await getLedgerDashboard(startDate, endDate);

  const monthlyExpense = dashboard?.summary.expense ?? 0;
  const hasAccount = dashboard !== null;

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
          hasAccount={hasAccount}
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
