import { MonthlyLedger } from "@repo/shared";

export const januaryLedgerMock: MonthlyLedger = {
  userId: "user-001",
  month: "2026-01",
  days: [
    {
      date: "2026-01-02",
      items: [
        {
          id: "tx-0102-1",
          name: "월급",
          type: "income",
          category: "salary",
          amount: 3200000,
        },
        {
          id: "tx-0102-2",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -12000,
        },
      ],
    },
    {
      date: "2026-01-03",
      items: [
        {
          id: "tx-0103-1",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -5900,
        },
        {
          id: "tx-0103-2",
          name: "교통비",
          type: "expense",
          category: "transport",
          amount: -2800,
        },
      ],
    },
    {
      date: "2026-01-05",
      items: [
        {
          id: "tx-0105-1",
          name: "마트",
          type: "expense",
          category: "living",
          amount: -42800,
        },
      ],
    },
    {
      date: "2026-01-08",
      items: [
        {
          id: "tx-0108-1",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -13000,
        },
        {
          id: "tx-0108-2",
          name: "저녁",
          type: "expense",
          category: "food",
          amount: -21000,
        },
      ],
    },
    {
      date: "2026-01-10",
      items: [
        {
          id: "tx-0110-1",
          name: "생활용품",
          type: "expense",
          category: "living",
          amount: -18300,
        },
      ],
    },
    {
      date: "2026-01-12",
      items: [
        {
          id: "tx-0112-1",
          name: "병원",
          type: "expense",
          category: "health",
          amount: -24000,
        },
      ],
    },
    {
      date: "2026-01-15",
      items: [
        {
          id: "tx-0115-1",
          name: "용돈",
          type: "income",
          category: "gift",
          amount: 50000,
        },
        {
          id: "tx-0115-2",
          name: "외식",
          type: "expense",
          category: "food",
          amount: -36000,
        },
      ],
    },
    {
      date: "2026-01-18",
      items: [
        {
          id: "tx-0118-1",
          name: "온라인 쇼핑",
          type: "expense",
          category: "shopping",
          amount: -51900,
        },
      ],
    },
    {
      date: "2026-01-20",
      items: [
        {
          id: "tx-0120-1",
          name: "보너스",
          type: "income",
          category: "bonus",
          amount: 120000,
        },
      ],
    },
    {
      date: "2026-01-22",
      items: [
        {
          id: "tx-0122-1",
          name: "버스",
          type: "expense",
          category: "transport",
          amount: -1500,
        },
        {
          id: "tx-0122-2",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -11500,
        },
      ],
    },
    {
      date: "2026-01-25",
      items: [
        {
          id: "tx-0125-1",
          name: "중고 판매",
          type: "income",
          category: "etc",
          amount: 22000,
        },
      ],
    },
    {
      date: "2026-01-28",
      items: [
        {
          id: "tx-0128-1",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -6200,
        },
        {
          id: "tx-0128-2",
          name: "간식",
          type: "expense",
          category: "food",
          amount: -4800,
        },
      ],
    },
    {
      date: "2026-01-30",
      items: [
        {
          id: "tx-0130-1",
          name: "문화생활",
          type: "expense",
          category: "culture",
          amount: -18000,
        },
      ],
    },
  ],
};

export const februaryLedgerMock: MonthlyLedger = {
  userId: "user-001",
  month: "2026-02",
  days: [
    {
      date: "2026-02-02",
      items: [
        {
          id: "tx-0202-1",
          name: "월급",
          type: "income",
          category: "salary",
          amount: 3200000,
        },
        {
          id: "tx-0202-2",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -12500,
        },
      ],
    },
    {
      date: "2026-02-03",
      items: [
        {
          id: "tx-0203-1",
          name: "교통비",
          type: "expense",
          category: "transport",
          amount: -2800,
        },
        {
          id: "tx-0203-2",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -5700,
        },
      ],
    },
    {
      date: "2026-02-05",
      items: [
        {
          id: "tx-0205-1",
          name: "마트",
          type: "expense",
          category: "living",
          amount: -39200,
        },
      ],
    },
    {
      date: "2026-02-07",
      items: [
        {
          id: "tx-0207-1",
          name: "저녁",
          type: "expense",
          category: "food",
          amount: -22000,
        },
      ],
    },
    {
      date: "2026-02-10",
      items: [
        {
          id: "tx-0210-1",
          name: "생활용품",
          type: "expense",
          category: "living",
          amount: -15400,
        },
      ],
    },
    {
      date: "2026-02-12",
      items: [
        {
          id: "tx-0212-1",
          name: "병원",
          type: "expense",
          category: "health",
          amount: -18000,
        },
      ],
    },
    {
      date: "2026-02-14",
      items: [
        {
          id: "tx-0214-1",
          name: "외식",
          type: "expense",
          category: "food",
          amount: -31000,
        },
      ],
    },
    {
      date: "2026-02-16",
      items: [
        {
          id: "tx-0216-1",
          name: "용돈",
          type: "income",
          category: "gift",
          amount: 30000,
        },
      ],
    },
    {
      date: "2026-02-18",
      items: [
        {
          id: "tx-0218-1",
          name: "온라인 쇼핑",
          type: "expense",
          category: "shopping",
          amount: -47800,
        },
      ],
    },
    {
      date: "2026-02-20",
      items: [
        {
          id: "tx-0220-1",
          name: "보너스",
          type: "income",
          category: "bonus",
          amount: 150000,
        },
      ],
    },
    {
      date: "2026-02-22",
      items: [
        {
          id: "tx-0222-1",
          name: "버스",
          type: "expense",
          category: "transport",
          amount: -1500,
        },
        {
          id: "tx-0222-2",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -11800,
        },
      ],
    },
    {
      date: "2026-02-24",
      items: [
        {
          id: "tx-0224-1",
          name: "중고 판매",
          type: "income",
          category: "etc",
          amount: 18000,
        },
      ],
    },
    {
      date: "2026-02-26",
      items: [
        {
          id: "tx-0226-1",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -6100,
        },
        {
          id: "tx-0226-2",
          name: "간식",
          type: "expense",
          category: "food",
          amount: -4200,
        },
      ],
    },
    {
      date: "2026-02-28",
      items: [
        {
          id: "tx-0228-1",
          name: "쇼핑",
          type: "expense",
          category: "shopping",
          amount: -38900,
        },
      ],
    },
  ],
};

// 기존 marchLedgerMock 그대로 사용
export const marchLedgerMock: MonthlyLedger = {
  userId: "user-001",
  month: "2026-03",
  days: [
    // 기존 데이터 그대로
  ],
};

export const MONTHLY_LEDGER_MOCKS: Record<string, MonthlyLedger> = {
  "2026-01": januaryLedgerMock,
  "2026-02": februaryLedgerMock,
  "2026-03": marchLedgerMock,
};
