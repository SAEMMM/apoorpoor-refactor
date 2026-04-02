export type LedgerType = "income" | "expense";

export type LedgerCategory =
  | "salary"
  | "bonus"
  | "food"
  | "cafe"
  | "transport"
  | "shopping"
  | "living"
  | "health"
  | "culture"
  | "gift"
  | "etc";

export type LedgerItem = {
  id: string;
  name: string;
  type: LedgerType;
  category: LedgerCategory;
  amount: number; // income은 양수, expense는 음수
};

export type DailyLedger = {
  date: string; // YYYY-MM-DD
  items: LedgerItem[];
};

export type MonthlyLedger = {
  userId: string;
  month: string; // YYYY-MM
  days: DailyLedger[];
};

// 가계부 mock data
export const marchLedgerMock: MonthlyLedger = {
  userId: "user-001",
  month: "2026-03",
  days: [
    {
      date: "2026-03-01",
      items: [
        {
          id: "tx-0301-1",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -12000,
        },
        {
          id: "tx-0301-2",
          name: "편의점",
          type: "expense",
          category: "living",
          amount: -4300,
        },
      ],
    },
    {
      date: "2026-03-02",
      items: [
        {
          id: "tx-0302-1",
          name: "교통비",
          type: "expense",
          category: "transport",
          amount: -2800,
        },
        {
          id: "tx-0302-2",
          name: "저녁",
          type: "expense",
          category: "food",
          amount: -18000,
        },
      ],
    },
    {
      date: "2026-03-03",
      items: [
        {
          id: "tx-0303-1",
          name: "월급",
          type: "income",
          category: "salary",
          amount: 3200000,
        },
        {
          id: "tx-0303-2",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -5800,
        },
        {
          id: "tx-0303-3",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -13000,
        },
      ],
    },
    {
      date: "2026-03-04",
      items: [
        {
          id: "tx-0304-1",
          name: "마트",
          type: "expense",
          category: "living",
          amount: -35600,
        },
        {
          id: "tx-0304-2",
          name: "버스",
          type: "expense",
          category: "transport",
          amount: -1500,
        },
      ],
    },
    {
      date: "2026-03-05",
      items: [
        {
          id: "tx-0305-1",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -11000,
        },
        {
          id: "tx-0305-2",
          name: "약국",
          type: "expense",
          category: "health",
          amount: -8700,
        },
      ],
    },
    {
      date: "2026-03-06",
      items: [
        {
          id: "tx-0306-1",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -6200,
        },
        {
          id: "tx-0306-2",
          name: "저녁",
          type: "expense",
          category: "food",
          amount: -22000,
        },
      ],
    },
    {
      date: "2026-03-07",
      items: [
        {
          id: "tx-0307-1",
          name: "온라인 쇼핑",
          type: "expense",
          category: "shopping",
          amount: -45900,
        },
        {
          id: "tx-0307-2",
          name: "편의점",
          type: "expense",
          category: "living",
          amount: -5200,
        },
      ],
    },
    {
      date: "2026-03-08",
      items: [
        {
          id: "tx-0308-1",
          name: "외식",
          type: "expense",
          category: "food",
          amount: -28000,
        },
      ],
    },
    {
      date: "2026-03-09",
      items: [
        {
          id: "tx-0309-1",
          name: "교통비",
          type: "expense",
          category: "transport",
          amount: -2800,
        },
        {
          id: "tx-0309-2",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -12500,
        },
      ],
    },
    {
      date: "2026-03-10",
      items: [
        {
          id: "tx-0310-1",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -5500,
        },
        {
          id: "tx-0310-2",
          name: "생활용품",
          type: "expense",
          category: "living",
          amount: -16400,
        },
      ],
    },
    {
      date: "2026-03-11",
      items: [
        {
          id: "tx-0311-1",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -14000,
        },
        {
          id: "tx-0311-2",
          name: "버스",
          type: "expense",
          category: "transport",
          amount: -1500,
        },
        {
          id: "tx-0311-3",
          name: "중고 판매",
          type: "income",
          category: "etc",
          amount: 25000,
        },
      ],
    },
    {
      date: "2026-03-12",
      items: [
        {
          id: "tx-0312-1",
          name: "병원",
          type: "expense",
          category: "health",
          amount: -18000,
        },
      ],
    },
    {
      date: "2026-03-13",
      items: [
        {
          id: "tx-0313-1",
          name: "저녁",
          type: "expense",
          category: "food",
          amount: -21000,
        },
        {
          id: "tx-0313-2",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -6100,
        },
      ],
    },
    {
      date: "2026-03-14",
      items: [
        {
          id: "tx-0314-1",
          name: "문화생활",
          type: "expense",
          category: "culture",
          amount: -18000,
        },
        {
          id: "tx-0314-2",
          name: "간식",
          type: "expense",
          category: "food",
          amount: -4900,
        },
      ],
    },
    {
      date: "2026-03-15",
      items: [
        {
          id: "tx-0315-1",
          name: "용돈",
          type: "income",
          category: "gift",
          amount: 50000,
        },
        {
          id: "tx-0315-2",
          name: "외식",
          type: "expense",
          category: "food",
          amount: -34000,
        },
      ],
    },
    {
      date: "2026-03-16",
      items: [
        {
          id: "tx-0316-1",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -12000,
        },
        {
          id: "tx-0316-2",
          name: "택시",
          type: "expense",
          category: "transport",
          amount: -9800,
        },
      ],
    },
    {
      date: "2026-03-17",
      items: [
        {
          id: "tx-0317-1",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -5900,
        },
        {
          id: "tx-0317-2",
          name: "마트",
          type: "expense",
          category: "living",
          amount: -28700,
        },
      ],
    },
    {
      date: "2026-03-18",
      items: [
        {
          id: "tx-0318-1",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -13500,
        },
      ],
    },
    {
      date: "2026-03-19",
      items: [
        {
          id: "tx-0319-1",
          name: "교통비",
          type: "expense",
          category: "transport",
          amount: -2800,
        },
        {
          id: "tx-0319-2",
          name: "저녁",
          type: "expense",
          category: "food",
          amount: -17000,
        },
      ],
    },
    {
      date: "2026-03-20",
      items: [
        {
          id: "tx-0320-1",
          name: "보너스",
          type: "income",
          category: "bonus",
          amount: 150000,
        },
        {
          id: "tx-0320-2",
          name: "쇼핑",
          type: "expense",
          category: "shopping",
          amount: -62900,
        },
      ],
    },
    {
      date: "2026-03-21",
      items: [
        {
          id: "tx-0321-1",
          name: "외식",
          type: "expense",
          category: "food",
          amount: -39000,
        },
        {
          id: "tx-0321-2",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -6800,
        },
      ],
    },
    {
      date: "2026-03-22",
      items: [
        {
          id: "tx-0322-1",
          name: "생활용품",
          type: "expense",
          category: "living",
          amount: -21100,
        },
      ],
    },
    {
      date: "2026-03-23",
      items: [
        {
          id: "tx-0323-1",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -12500,
        },
        {
          id: "tx-0323-2",
          name: "버스",
          type: "expense",
          category: "transport",
          amount: -1500,
        },
      ],
    },
    {
      date: "2026-03-24",
      items: [
        {
          id: "tx-0324-1",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -5700,
        },
        {
          id: "tx-0324-2",
          name: "병원",
          type: "expense",
          category: "health",
          amount: -24000,
        },
      ],
    },
    {
      date: "2026-03-25",
      items: [
        {
          id: "tx-0325-1",
          name: "중고 판매",
          type: "income",
          category: "etc",
          amount: 18000,
        },
        {
          id: "tx-0325-2",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -13000,
        },
      ],
    },
    {
      date: "2026-03-26",
      items: [
        {
          id: "tx-0326-1",
          name: "교통비",
          type: "expense",
          category: "transport",
          amount: -2800,
        },
        {
          id: "tx-0326-2",
          name: "저녁",
          type: "expense",
          category: "food",
          amount: -19000,
        },
      ],
    },
    {
      date: "2026-03-27",
      items: [
        {
          id: "tx-0327-1",
          name: "간식",
          type: "expense",
          category: "food",
          amount: -3500,
        },
        {
          id: "tx-0327-2",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -5200,
        },
      ],
    },
    {
      date: "2026-03-28",
      items: [
        {
          id: "tx-0328-1",
          name: "쇼핑",
          type: "expense",
          category: "shopping",
          amount: -41800,
        },
        {
          id: "tx-0328-2",
          name: "외식",
          type: "expense",
          category: "food",
          amount: -26000,
        },
      ],
    },
    {
      date: "2026-03-29",
      items: [
        {
          id: "tx-0329-1",
          name: "용돈",
          type: "income",
          category: "gift",
          amount: 30000,
        },
      ],
    },
    {
      date: "2026-03-30",
      items: [
        {
          id: "tx-0330-1",
          name: "점심",
          type: "expense",
          category: "food",
          amount: -11500,
        },
        {
          id: "tx-0330-2",
          name: "마트",
          type: "expense",
          category: "living",
          amount: -32400,
        },
      ],
    },
    {
      date: "2026-03-31",
      items: [
        {
          id: "tx-0331-1",
          name: "카페",
          type: "expense",
          category: "cafe",
          amount: -6000,
        },
        {
          id: "tx-0331-2",
          name: "저녁",
          type: "expense",
          category: "food",
          amount: -21000,
        },
      ],
    },
  ],
};
