export function getAdjacentMonth(
  month: string,
  direction: "prev" | "next",
): string {
  const [year, monthValue] = month.split("-").map(Number);

  if (!year || !monthValue) {
    throw new Error("유효하지 않은 month 형식입니다.");
  }

  const date = new Date(year, monthValue - 1, 1);

  if (direction === "prev") {
    date.setMonth(date.getMonth() - 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }

  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, "0");

  return `${nextYear}-${nextMonth}`;
}
