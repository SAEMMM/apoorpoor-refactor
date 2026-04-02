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
import {
  getChartSummary,
  getExpenseSummary,
} from "./_components/PieChart/types";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { BarChart } from "./_components/BarChart";
import { Calendar } from "./_components/Calendar";
import type { ComponentProps } from "react";
import { Divider } from "./_components/Divider";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { List } from "./_components/List";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { PieChart } from "./_components/PieChart";
import { colors } from "@/styles/theme/tokens/color";
import { getAdjacentMonth } from "@/features/ledger/utils/month";
import { getMonthlyLedger } from "@/features/ledger/api/getMonthlyLedger";
import { getMonthlyTotals } from "./types";
import { isValidMonth } from "@/features/ledger/utils/isValidMonth";
import { notFound } from "next/navigation";

type LedgerPageProps = {
  params: Promise<{
    month: string;
  }>;
};

type MonthlyLedgerData = NonNullable<
  Awaited<ReturnType<typeof getMonthlyLedger>>
>;
type LedgerDay = MonthlyLedgerData["days"][number];
type BarChartCompareData = ComponentProps<typeof BarChart>["compareData"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function createEmptyMonthlyLedger(
  userId: string,
  month: string,
): MonthlyLedgerData {
  return {
    userId,
    month,
    days: [],
  };
}

function getExpenseTotal(days: LedgerDay[]) {
  return days.reduce((monthAcc, day) => {
    return (
      monthAcc +
      day.items
        .filter((item) => item.type === "expense")
        .reduce((dayAcc, item) => dayAcc + Math.abs(item.amount), 0)
    );
  }, 0);
}

function getMonthDate(month: string) {
  return new Date(`${month}-01`);
}

function formatMonth(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getPreviousMonth(month: string) {
  const date = getMonthDate(month);
  date.setMonth(date.getMonth() - 1);
  return formatMonth(date);
}

function getPreviousYearSameMonth(month: string) {
  const date = getMonthDate(month);
  date.setFullYear(date.getFullYear() - 1);
  return formatMonth(date);
}

function getQuarter(month: string) {
  const monthNumber = Number(month.slice(5, 7));
  return Math.ceil(monthNumber / 3);
}

function getQuarterMonths(year: number, quarter: number) {
  const startMonth = (quarter - 1) * 3 + 1;

  return Array.from({ length: 3 }, (_, index) => {
    const monthNumber = startMonth + index;
    return `${year}-${String(monthNumber).padStart(2, "0")}`;
  });
}

function getCurrentQuarterInfo(month: string) {
  const currentDate = getMonthDate(month);

  return {
    year: currentDate.getFullYear(),
    quarter: getQuarter(month),
  };
}

function getPreviousQuarterInfo(month: string) {
  const currentDate = getMonthDate(month);
  const currentYear = currentDate.getFullYear();
  const currentQuarter = getQuarter(month);

  if (currentQuarter === 1) {
    return {
      year: currentYear - 1,
      quarter: 4,
    };
  }

  return {
    year: currentYear,
    quarter: currentQuarter - 1,
  };
}

function getMonthLabel(month: string) {
  return `${Number(month.slice(5, 7))}월`;
}

function getYearMonthLabel(month: string) {
  const year = month.slice(2, 4);
  const monthNumber = month.slice(5, 7);
  return `${year}.${monthNumber}`;
}

async function getSafeMonthlyLedger(userId: string, month: string) {
  const ledger = await getMonthlyLedger({ userId, month });
  return ledger ?? createEmptyMonthlyLedger(userId, month);
}

export default async function LedgerPage({ params }: LedgerPageProps) {
  const { month } = await params;

  const prevMonth = getAdjacentMonth(month, "prev");
  const nextMonth = getAdjacentMonth(month, "next");

  if (!isValidMonth(month)) {
    notFound();
  }

  const userId = "user-001";

  const safeMonthlyLedger = await getSafeMonthlyLedger(userId, month);
  const days = safeMonthlyLedger.days;

  const { income: monthlyIncome, expense: monthlyExpense } =
    getMonthlyTotals(days);

  const remainingAmount = monthlyIncome - monthlyExpense;

  const listItems = getExpenseSummary(safeMonthlyLedger);
  const chartItems = getChartSummary(listItems);

  const previousMonth = getPreviousMonth(month);
  const previousYearMonth = getPreviousYearSameMonth(month);

  const previousMonthlyLedger = await getSafeMonthlyLedger(
    userId,
    previousMonth,
  );
  const previousYearMonthlyLedger = await getSafeMonthlyLedger(
    userId,
    previousYearMonth,
  );

  const previousMonthExpense = getExpenseTotal(previousMonthlyLedger.days);
  const previousYearExpense = getExpenseTotal(previousYearMonthlyLedger.days);

  const currentQuarterInfo = getCurrentQuarterInfo(month);
  const previousQuarterInfo = getPreviousQuarterInfo(month);

  const currentQuarterMonths = getQuarterMonths(
    currentQuarterInfo.year,
    currentQuarterInfo.quarter,
  );

  const previousQuarterMonths = getQuarterMonths(
    previousQuarterInfo.year,
    previousQuarterInfo.quarter,
  );

  const currentQuarterLedgers = await Promise.all(
    currentQuarterMonths.map((quarterMonth) =>
      getSafeMonthlyLedger(userId, quarterMonth),
    ),
  );

  const previousQuarterLedgers = await Promise.all(
    previousQuarterMonths.map((quarterMonth) =>
      getSafeMonthlyLedger(userId, quarterMonth),
    ),
  );

  const currentQuarterExpense = currentQuarterLedgers.reduce((sum, ledger) => {
    return sum + getExpenseTotal(ledger.days);
  }, 0);

  const previousQuarterExpense = previousQuarterLedgers.reduce(
    (sum, ledger) => {
      return sum + getExpenseTotal(ledger.days);
    },
    0,
  );

  const compareData: BarChartCompareData = {
    month: [
      {
        label: getMonthLabel(previousMonth),
        amount: previousMonthExpense,
      },
      {
        label: getMonthLabel(month),
        amount: monthlyExpense,
      },
    ],
    quarter: [
      {
        label: `${previousQuarterInfo.quarter}분기`,
        amount: previousQuarterExpense,
      },
      {
        label: `${currentQuarterInfo.quarter}분기`,
        amount: currentQuarterExpense,
      },
    ],
    year: [
      {
        label: getYearMonthLabel(previousYearMonth),
        amount: previousYearExpense,
      },
      {
        label: getYearMonthLabel(month),
        amount: monthlyExpense,
      },
    ],
  };

  return (
    <PageContainer sx={{ gap: "30px" }}>
      <Wrapper>
        <HeaderWrapper>
          <Link href={`/main`}>
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
              {formatCurrency(monthlyExpense)}원
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
                {formatCurrency(monthlyIncome)}원
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
                  remainingAmount >= 0
                    ? colors.primary.main
                    : colors.system.error
                }
              >
                {remainingAmount >= 0
                  ? `+${formatCurrency(remainingAmount)}원`
                  : `-${formatCurrency(Math.abs(remainingAmount))}원`}
              </Typography>
            </AmountRowWrapper>
          </MonthlyTotalWrapper>
        </AmountWrapper>
      </Wrapper>

      <Divider />

      <Calendar month={month} monthlyLedger={safeMonthlyLedger} />

      <Divider />

      <PieChart key={month} chartItems={chartItems} listItems={listItems} />

      <Divider />

      <BarChart compareData={compareData} />

      <Divider />

      <List days={days} />
    </PageContainer>
  );
}
