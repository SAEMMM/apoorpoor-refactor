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

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { BarChart } from "./_components/BarChart";
import { Calendar } from "./_components/Calendar";
import { Divider } from "./_components/Divider";
import EditIcon from "@mui/icons-material/Edit";
import { List } from "./_components/List";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { PieChart } from "./_components/PieChart";
import { colors } from "@/styles/theme/tokens/color";
import { getMonthlyLedger } from "@/features/ledger/api/getMonthlyLedger";
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

  if (!isValidMonth(month)) {
    notFound();
  }

  // 나중에는 세션에서 userId를 가져오면 됩니다.
  const userId = "user-001";

  const monthlyLedger = await getMonthlyLedger({
    userId,
    month,
  });

  if (!monthlyLedger) {
    notFound();
  }

  const monthlyExpense = getMonthlyExpenseTotal(monthlyLedger.days);

  return (
    <PageContainer sx={{ gap: "30px" }}>
      <Wrapper>
        <HeaderWrapper>
          <IconButton>
            <ArrowBackIosNewIcon sx={{ color: colors.black }} />
          </IconButton>
          <MonthWrapper>
            <IconButton size="small">
              <ArrowLeftIcon
                fontSize="large"
                sx={{ color: colors.gray[500] }}
              />
            </IconButton>
            <Typography variant="h1">{month.slice(5, 8)}월</Typography>
            <IconButton size="small">
              <ArrowRightIcon
                fontSize="large"
                sx={{ color: colors.gray[500] }}
              />
            </IconButton>
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

      <Calendar />

      <Divider />

      <PieChart />

      <Divider />

      <BarChart />

      <Divider />

      <List />
    </PageContainer>
  );
}
