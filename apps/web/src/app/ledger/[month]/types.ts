export const getMonthlyTotals = (
  days: { items: { type: string; amount: number }[] }[],
) => {
  return days.reduce(
    (acc, day) => {
      day.items.forEach((item) => {
        if (item.type === "income") {
          acc.income += item.amount;
        } else if (item.type === "expense") {
          acc.expense += Math.abs(item.amount);
        }
      });

      return acc;
    },
    { income: 0, expense: 0 },
  );
};
