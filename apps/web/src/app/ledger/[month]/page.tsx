import {
  AmountRowWrapper,
  AmountWrapper,
  HeaderWrapper,
  MonthWrapper,
  MonthlyTotalWrapper,
  TitleWrapper,
  Wrapper,
} from "./styles";
import { IconButton, Typography } from "@mui/material";
import type {
  LedgerDashboardResponse,
  LedgerTransactionsResponse,
} from "@repo/shared";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { BarChart } from "./_components/BarChart";
import { Calendar } from "./_components/Calendar";
import { Divider } from "./_components/Divider";
import { EMPTY_DASHBOARD } from "./types";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { List } from "./_components/List";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { PieChart } from "./_components/PieChart";
import React from "react";
import { colors } from "@/styles/theme/tokens/color";
import { fetchApi } from "@/shared/lib/fetchApi";
import { getAdjacentMonth } from "@/features/ledger/utils/month";
import { isValidMonth } from "@/features/ledger/utils/isValidMonth";
import { notFound } from "next/navigation";

type LedgerPageProps = {
  params: Promise<{
    month: string;
  }>;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function getMonthDateRange(month: string) {
  const [year, monthValue] = month.split("-").map(Number);
  const lastDay = new Date(year, monthValue, 0).getDate();

  return {
    startDate: `${month}-01`,
    endDate: `${month}-${String(lastDay).padStart(2, "0")}`,
  };
}

async function getLedgerDashboard(
  month: string,
): Promise<LedgerDashboardResponse | null> {
  const { startDate, endDate } = getMonthDateRange(month);

  return fetchApi<LedgerDashboardResponse>({
    path: "/ledger/dashboard",
    searchParams: {
      userId: "user-001",
      startDate,
      endDate,
    },
  });
}

async function getLedgerTransactions(
  month: string,
): Promise<LedgerTransactionsResponse | null> {
  const { startDate, endDate } = getMonthDateRange(month);

  return fetchApi<LedgerTransactionsResponse>({
    path: "/ledger/transactions",
    searchParams: {
      userId: "user-001",
      startDate,
      endDate,
      limit: "31",
    },
  });
}

export default async function LedgerPage({ params }: LedgerPageProps) {
  const { month } = await params;

  if (!isValidMonth(month)) {
    notFound();
  }

  const prevMonth = getAdjacentMonth(month, "prev");
  const nextMonth = getAdjacentMonth(month, "next");

  const [dashboardResult, transactionsResult] = await Promise.allSettled([
    getLedgerDashboard(month),
    getLedgerTransactions(month),
  ]);

  const dashboard =
    dashboardResult.status === "fulfilled" ? dashboardResult.value : null;

  const transactions =
    transactionsResult.status === "fulfilled" ? transactionsResult.value : null;

  const safeDashboard = dashboard ?? EMPTY_DASHBOARD;
  const { summary, calendar, categorySummary, compare } = safeDashboard;
  const sections = transactions?.sections ?? [];

  console.log("dashboard", dashboard);
  console.log("compare", safeDashboard.compare);
  return (
    <PageContainer sx={{ gap: "30px" }}>
      <Wrapper>
        <HeaderWrapper>
          <Link href="/main">
            <IconButton>
              <ArrowBackIosNewIcon
                fontSize="large"
                sx={{ color: colors.black }}
              />
            </IconButton>
          </Link>

          <MonthWrapper>
            <Link href={`/ledger/${prevMonth}`}>
              <IconButton size="small">
                <ArrowLeftIcon
                  fontSize="large"
                  sx={{ color: colors.gray[500] }}
                />
              </IconButton>
            </Link>

            <Typography variant="h1">{Number(month.slice(5, 7))}월</Typography>

            <Link href={`/ledger/${nextMonth}`}>
              <IconButton size="small">
                <ArrowRightIcon
                  fontSize="large"
                  sx={{ color: colors.gray[500] }}
                />
              </IconButton>
            </Link>
          </MonthWrapper>

          <IconButton>
            <AddIcon fontSize="large" sx={{ color: colors.black }} />
          </IconButton>
        </HeaderWrapper>

        <TitleWrapper>
          <Typography variant="body2" color={colors.gray[500]}>
            가계부 이름
          </Typography>
          <IconButton size="small">
            <EditIcon sx={{ fontSize: 18, color: colors.gray[350] }} />
          </IconButton>
        </TitleWrapper>

        <AmountWrapper>
          <MonthlyTotalWrapper>
            <Typography variant="body2" fontWeight={700}>
              이번달 지출
            </Typography>

            <Typography variant="h1" color={colors.primary.main}>
              {formatCurrency(summary.expense)}원
            </Typography>
          </MonthlyTotalWrapper>

          <MonthlyTotalWrapper>
            <AmountRowWrapper>
              <Typography variant="body2" color={colors.gray[500]}>
                수입
              </Typography>
              <Typography
                variant="body1"
                fontWeight={700}
                color={colors.gray[400]}
              >
                {formatCurrency(summary.income)}원
              </Typography>
            </AmountRowWrapper>

            <AmountRowWrapper>
              <Typography variant="body2" color={colors.gray[500]}>
                남은 금액
              </Typography>
              <Typography
                variant="body1"
                fontWeight={700}
                color={
                  summary.remainingAmount >= 0
                    ? colors.primary.main
                    : colors.system.error
                }
              >
                {summary.remainingAmount >= 0
                  ? `+${formatCurrency(summary.remainingAmount)}원`
                  : `-${formatCurrency(Math.abs(summary.remainingAmount))}원`}
              </Typography>
            </AmountRowWrapper>
          </MonthlyTotalWrapper>
        </AmountWrapper>
      </Wrapper>

      <Divider />

      <Calendar month={month} calendar={calendar} />

      <Divider />

      <PieChart categorySummary={categorySummary} />

      <Divider />

      <BarChart compareData={compare} />

      <Divider />

      <List sections={sections} />
    </PageContainer>
  );
}
