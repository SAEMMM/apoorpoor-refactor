import { Box, Stack, Typography } from "@mui/material";

import PageContainer from "@/shared/ui/layout/PageContainer";
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
    <PageContainer>
      <Stack spacing={3}>
        <Typography variant="h1">{month} 가계부</Typography>

        <Box
          sx={{
            width: "100%",
            p: 2,
            borderRadius: "12px",
            backgroundColor: "#f5f5f5",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="body2">이번 달 소비</Typography>
          <Typography variant="h2">
            {formatCurrency(monthlyExpense)}원
          </Typography>
        </Box>

        <Stack spacing={2}>
          {monthlyLedger.days.map((day) => (
            <Box
              key={day.date}
              sx={{
                width: "100%",
                p: 2,
                borderRadius: "12px",
                backgroundColor: "#fafafa",
                boxSizing: "border-box",
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                {day.date}
              </Typography>

              <Stack spacing={1}>
                {day.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">{item.name}</Typography>
                    <Typography variant="body2">
                      {formatCurrency(item.amount)}원
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
    </PageContainer>
  );
}
