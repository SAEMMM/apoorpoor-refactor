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
import { getChartSummary, getExpenseSummary } from "./_components/PieChart/types";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { BarChart } from "./_components/BarChart";
import { Calendar } from "./_components/Calendar";
import { Divider } from "./_components/Divider";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { List } from "./_components/List";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { PieChart } from "./_components/PieChart";
import { colors } from "@/styles/theme/tokens/color";
import { getAdjacentMonth } from "@/features/ledger/utils/month";
import { getMonthlyLedger } from "@/features/ledger/api/getMonthlyLedger";
import { isValidMonth } from "@/features/ledger/utils/isValidMonth";
import { marchLedgerMock } from "@/mocks/ledger";
import { notFound } from "next/navigation";

type LedgerPageProps = {
  params: Promise<{
    month: string;
  }>;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function getMonthlyExpenseTotal(
  days: { items: { type: string; amount: number }[] }[],
) {
  const total = days.reduce((monthAcc, day) => {
    return (
      monthAcc +
      day.items
        .filter((item) => item.type === "expense")
        .reduce((dayAcc, item) => dayAcc + item.amount, 0)
    );
  }, 0);

  return Math.abs(total);
}

export default async function LedgerPage({ params }: LedgerPageProps) {
  const { month } = await params;

  const prevMonth = getAdjacentMonth(month, "prev");
  const nextMonth = getAdjacentMonth(month, "next");

  if (!isValidMonth(month)) {
    notFound();
  }

  // TODO: 세션에서 userId를 가져오면 됨
  const userId = "user-001";

  const monthlyLedger = await getMonthlyLedger({
    userId,
    month,
  });

  const days = monthlyLedger?.days ?? [];

  const monthlyExpense = getMonthlyExpenseTotal(days);

  const listItems = getExpenseSummary(marchLedgerMock);
  const chartItems = getChartSummary(listItems);

  return (
    <PageContainer sx={{ gap: "30px" }}>
      <Wrapper>
        <HeaderWrapper>
          <IconButton>
            <ArrowBackIosNewIcon
              fontSize="large"
              sx={{ color: colors.black }}
            />
          </IconButton>
          <MonthWrapper>
            <Link href={`/ledger/${prevMonth}`}>
              <IconButton size="small">
                <ArrowLeftIcon
                  fontSize="large"
                  sx={{ color: colors.gray[500] }}
                />
              </IconButton>
            </Link>
            <Typography variant="h1">{month.slice(5, 8)}월</Typography>
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
              이번달 소비 금액
            </Typography>

            <Typography variant="h1" color={colors.primary.main}>
              {monthlyExpense.toLocaleString()}원
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
                80,000원
              </Typography>
            </AmountRowWrapper>
            <AmountRowWrapper>
              <Typography variant="body2" color={colors.gray[500]}>
                지출
              </Typography>
              <Typography variant="body1" fontWeight={700} color={colors.black}>
                60,000원
              </Typography>
            </AmountRowWrapper>
          </MonthlyTotalWrapper>
        </AmountWrapper>
      </Wrapper>

      <Divider />

      <Calendar month={month} />

      <Divider />

      <PieChart chartItems={chartItems} listItems={listItems} />

      <Divider />

      <BarChart />

      <Divider />

      <List />
    </PageContainer>
  );
}
