import { MonthlyLedger } from "@/mocks/ledger";

export const getMonthlyExpense = (monthlyLedger: MonthlyLedger) => {
  const total = monthlyLedger.days.reduce((monthAcc, day) => {
    return (
      monthAcc +
      day.items
        .filter((item) => item.type === "expense")
        .reduce((dayAcc, item) => dayAcc + item.amount, 0)
    );
  }, 0);

  return Math.abs(total);
};
