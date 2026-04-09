import * as bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedItem = {
  name: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

const seedData: SeedItem[] = [
  // 2026-01
  {
    name: "월급",
    type: "income",
    category: "salary",
    amount: 3200000,
    date: "2026-01-02",
  },
  {
    name: "점심",
    type: "expense",
    category: "food",
    amount: -12000,
    date: "2026-01-02",
  },
  {
    name: "카페",
    type: "expense",
    category: "cafe",
    amount: -5900,
    date: "2026-01-03",
  },
  {
    name: "교통비",
    type: "expense",
    category: "transport",
    amount: -2800,
    date: "2026-01-03",
  },
  {
    name: "마트",
    type: "expense",
    category: "living",
    amount: -42800,
    date: "2026-01-05",
  },
  {
    name: "점심",
    type: "expense",
    category: "food",
    amount: -13000,
    date: "2026-01-08",
  },
  {
    name: "저녁",
    type: "expense",
    category: "food",
    amount: -21000,
    date: "2026-01-08",
  },
  {
    name: "생활용품",
    type: "expense",
    category: "living",
    amount: -18300,
    date: "2026-01-10",
  },
  {
    name: "병원",
    type: "expense",
    category: "health",
    amount: -24000,
    date: "2026-01-12",
  },
  {
    name: "용돈",
    type: "income",
    category: "gift",
    amount: 50000,
    date: "2026-01-15",
  },
  {
    name: "외식",
    type: "expense",
    category: "food",
    amount: -36000,
    date: "2026-01-15",
  },
  {
    name: "온라인 쇼핑",
    type: "expense",
    category: "shopping",
    amount: -51900,
    date: "2026-01-18",
  },
  {
    name: "보너스",
    type: "income",
    category: "bonus",
    amount: 120000,
    date: "2026-01-20",
  },
  {
    name: "버스",
    type: "expense",
    category: "transport",
    amount: -1500,
    date: "2026-01-22",
  },
  {
    name: "점심",
    type: "expense",
    category: "food",
    amount: -11500,
    date: "2026-01-22",
  },
  {
    name: "중고 판매",
    type: "income",
    category: "etc",
    amount: 22000,
    date: "2026-01-25",
  },
  {
    name: "카페",
    type: "expense",
    category: "cafe",
    amount: -6200,
    date: "2026-01-28",
  },
  {
    name: "간식",
    type: "expense",
    category: "food",
    amount: -4800,
    date: "2026-01-28",
  },
  {
    name: "문화생활",
    type: "expense",
    category: "culture",
    amount: -18000,
    date: "2026-01-30",
  },

  // 2026-02
  {
    name: "월급",
    type: "income",
    category: "salary",
    amount: 3200000,
    date: "2026-02-02",
  },
  {
    name: "점심",
    type: "expense",
    category: "food",
    amount: -12500,
    date: "2026-02-02",
  },
  {
    name: "교통비",
    type: "expense",
    category: "transport",
    amount: -2800,
    date: "2026-02-03",
  },
  {
    name: "카페",
    type: "expense",
    category: "cafe",
    amount: -5700,
    date: "2026-02-03",
  },
  {
    name: "마트",
    type: "expense",
    category: "living",
    amount: -39200,
    date: "2026-02-05",
  },
  {
    name: "저녁",
    type: "expense",
    category: "food",
    amount: -22000,
    date: "2026-02-07",
  },
  {
    name: "생활용품",
    type: "expense",
    category: "living",
    amount: -15400,
    date: "2026-02-10",
  },
  {
    name: "병원",
    type: "expense",
    category: "health",
    amount: -18000,
    date: "2026-02-12",
  },
  {
    name: "외식",
    type: "expense",
    category: "food",
    amount: -31000,
    date: "2026-02-14",
  },
  {
    name: "용돈",
    type: "income",
    category: "gift",
    amount: 30000,
    date: "2026-02-16",
  },
  {
    name: "온라인 쇼핑",
    type: "expense",
    category: "shopping",
    amount: -47800,
    date: "2026-02-18",
  },
  {
    name: "보너스",
    type: "income",
    category: "bonus",
    amount: 150000,
    date: "2026-02-20",
  },
  {
    name: "버스",
    type: "expense",
    category: "transport",
    amount: -1500,
    date: "2026-02-22",
  },
  {
    name: "점심",
    type: "expense",
    category: "food",
    amount: -11800,
    date: "2026-02-22",
  },
  {
    name: "중고 판매",
    type: "income",
    category: "etc",
    amount: 18000,
    date: "2026-02-24",
  },
  {
    name: "카페",
    type: "expense",
    category: "cafe",
    amount: -6100,
    date: "2026-02-26",
  },
  {
    name: "간식",
    type: "expense",
    category: "food",
    amount: -4200,
    date: "2026-02-26",
  },
  {
    name: "쇼핑",
    type: "expense",
    category: "shopping",
    amount: -38900,
    date: "2026-02-28",
  },

  // 2026-03
  {
    name: "월급",
    type: "income",
    category: "salary",
    amount: 3200000,
    date: "2026-03-02",
  },
  {
    name: "점심",
    type: "expense",
    category: "food",
    amount: -13000,
    date: "2026-03-02",
  },
  {
    name: "카페",
    type: "expense",
    category: "cafe",
    amount: -6500,
    date: "2026-03-03",
  },
  {
    name: "교통비",
    type: "expense",
    category: "transport",
    amount: -2800,
    date: "2026-03-03",
  },
  {
    name: "마트",
    type: "expense",
    category: "living",
    amount: -46800,
    date: "2026-03-05",
  },
  {
    name: "병원",
    type: "expense",
    category: "health",
    amount: -27000,
    date: "2026-03-08",
  },
  {
    name: "생활용품",
    type: "expense",
    category: "living",
    amount: -21200,
    date: "2026-03-10",
  },
  {
    name: "외식",
    type: "expense",
    category: "food",
    amount: -42000,
    date: "2026-03-14",
  },
  {
    name: "디저트",
    type: "expense",
    category: "cafe",
    amount: -9800,
    date: "2026-03-14",
  },
  {
    name: "용돈",
    type: "income",
    category: "gift",
    amount: 70000,
    date: "2026-03-16",
  },
  {
    name: "온라인 쇼핑",
    type: "expense",
    category: "shopping",
    amount: -83200,
    date: "2026-03-18",
  },
  {
    name: "중고 판매",
    type: "income",
    category: "etc",
    amount: 35000,
    date: "2026-03-20",
  },
  {
    name: "버스",
    type: "expense",
    category: "transport",
    amount: -1500,
    date: "2026-03-22",
  },
  {
    name: "점심",
    type: "expense",
    category: "food",
    amount: -12000,
    date: "2026-03-22",
  },
  {
    name: "문화생활",
    type: "expense",
    category: "culture",
    amount: -25000,
    date: "2026-03-25",
  },
  {
    name: "카페",
    type: "expense",
    category: "cafe",
    amount: -5900,
    date: "2026-03-27",
  },
  {
    name: "간식",
    type: "expense",
    category: "food",
    amount: -4500,
    date: "2026-03-27",
  },
  {
    name: "보너스",
    type: "income",
    category: "bonus",
    amount: 100000,
    date: "2026-03-30",
  },

  // 2026-04
  {
    name: "월급",
    type: "income",
    category: "salary",
    amount: 3200000,
    date: "2026-04-02",
  },
  {
    name: "점심",
    type: "expense",
    category: "food",
    amount: -11000,
    date: "2026-04-02",
  },
  {
    name: "교통비",
    type: "expense",
    category: "transport",
    amount: -3200,
    date: "2026-04-04",
  },
  {
    name: "카페",
    type: "expense",
    category: "cafe",
    amount: -5800,
    date: "2026-04-04",
  },
  {
    name: "마트",
    type: "expense",
    category: "living",
    amount: -35100,
    date: "2026-04-06",
  },
  {
    name: "약국",
    type: "expense",
    category: "health",
    amount: -9800,
    date: "2026-04-09",
  },
  {
    name: "브런치",
    type: "expense",
    category: "food",
    amount: -28000,
    date: "2026-04-12",
  },
  {
    name: "용돈",
    type: "income",
    category: "gift",
    amount: 50000,
    date: "2026-04-15",
  },
  {
    name: "생활용품",
    type: "expense",
    category: "living",
    amount: -16400,
    date: "2026-04-15",
  },
  {
    name: "쇼핑",
    type: "expense",
    category: "shopping",
    amount: -42900,
    date: "2026-04-18",
  },
  {
    name: "중고 판매",
    type: "income",
    category: "etc",
    amount: 28000,
    date: "2026-04-20",
  },
  {
    name: "버스",
    type: "expense",
    category: "transport",
    amount: -1500,
    date: "2026-04-22",
  },
  {
    name: "저녁",
    type: "expense",
    category: "food",
    amount: -19000,
    date: "2026-04-22",
  },
  {
    name: "카페",
    type: "expense",
    category: "cafe",
    amount: -6300,
    date: "2026-04-24",
  },
  {
    name: "문화생활",
    type: "expense",
    category: "culture",
    amount: -18000,
    date: "2026-04-27",
  },
  {
    name: "보너스",
    type: "income",
    category: "bonus",
    amount: 80000,
    date: "2026-04-29",
  },
];

const poorItems = [
  {
    code: "clothes-01",
    name: "축축한 종이박스",
    category: "clothes",
    price: 20,
    requiredLevel: 1,
    imgUrl: "",
    sortOrder: 1,
    isActive: true,
  },
  {
    code: "clothes-02",
    name: "꼬질꼬질 홀터넥",
    category: "clothes",
    price: 20,
    requiredLevel: 2,
    imgUrl: "",
    sortOrder: 2,
    isActive: true,
  },
  {
    code: "clothes-03",
    name: "꼬질꼬질 난닝구",
    category: "clothes",
    price: 20,
    requiredLevel: 3,
    imgUrl: "",
    sortOrder: 3,
    isActive: true,
  },
  {
    code: "clothes-04",
    name: "구찌..아니 아구찜",
    category: "clothes",
    price: 20,
    requiredLevel: 4,
    imgUrl: "",
    sortOrder: 4,
    isActive: true,
  },
  {
    code: "clothes-05",
    name: "늘어난 반팔",
    category: "clothes",
    price: 20,
    requiredLevel: 4,
    imgUrl: "",
    sortOrder: 5,
    isActive: true,
  },
];

async function main() {
  await prisma.ledgerItem.deleteMany();
  await prisma.ledger.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("test1234", 12);

  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: hashedPassword,
      poorName: "테스트푸어",
      ledger: {
        create: {
          name: "테스트푸어의 가계부",
        },
      },
    },
  });

  const items = seedData.map((item) => ({
    userId: user.id,
    name: item.name,
    type: item.type as "income" | "expense",
    category: item.category as any,
    amount: item.amount,
    date: new Date(item.date),
  }));

  const result = await prisma.ledgerItem.createMany({ data: items });
  console.log(`Seeded user: ${user.email} (password: test1234)`);
  console.log(`Seeded ${result.count} ledger items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
