import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedItem = {
  userId: string;
  name: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

const seedData: SeedItem[] = [
  // 2026-01
  { userId: "user-001", name: "월급", type: "income", category: "salary", amount: 3200000, date: "2026-01-02" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -12000, date: "2026-01-02" },
  { userId: "user-001", name: "카페", type: "expense", category: "cafe", amount: -5900, date: "2026-01-03" },
  { userId: "user-001", name: "교통비", type: "expense", category: "transport", amount: -2800, date: "2026-01-03" },
  { userId: "user-001", name: "마트", type: "expense", category: "living", amount: -42800, date: "2026-01-05" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -13000, date: "2026-01-08" },
  { userId: "user-001", name: "저녁", type: "expense", category: "food", amount: -21000, date: "2026-01-08" },
  { userId: "user-001", name: "생활용품", type: "expense", category: "living", amount: -18300, date: "2026-01-10" },
  { userId: "user-001", name: "병원", type: "expense", category: "health", amount: -24000, date: "2026-01-12" },
  { userId: "user-001", name: "용돈", type: "income", category: "gift", amount: 50000, date: "2026-01-15" },
  { userId: "user-001", name: "외식", type: "expense", category: "food", amount: -36000, date: "2026-01-15" },
  { userId: "user-001", name: "온라인 쇼핑", type: "expense", category: "shopping", amount: -51900, date: "2026-01-18" },
  { userId: "user-001", name: "보너스", type: "income", category: "bonus", amount: 120000, date: "2026-01-20" },
  { userId: "user-001", name: "버스", type: "expense", category: "transport", amount: -1500, date: "2026-01-22" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -11500, date: "2026-01-22" },
  { userId: "user-001", name: "중고 판매", type: "income", category: "etc", amount: 22000, date: "2026-01-25" },
  { userId: "user-001", name: "카페", type: "expense", category: "cafe", amount: -6200, date: "2026-01-28" },
  { userId: "user-001", name: "간식", type: "expense", category: "food", amount: -4800, date: "2026-01-28" },
  { userId: "user-001", name: "문화생활", type: "expense", category: "culture", amount: -18000, date: "2026-01-30" },

  // 2026-02
  { userId: "user-001", name: "월급", type: "income", category: "salary", amount: 3200000, date: "2026-02-02" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -12500, date: "2026-02-02" },
  { userId: "user-001", name: "교통비", type: "expense", category: "transport", amount: -2800, date: "2026-02-03" },
  { userId: "user-001", name: "카페", type: "expense", category: "cafe", amount: -5700, date: "2026-02-03" },
  { userId: "user-001", name: "마트", type: "expense", category: "living", amount: -39200, date: "2026-02-05" },
  { userId: "user-001", name: "저녁", type: "expense", category: "food", amount: -22000, date: "2026-02-07" },
  { userId: "user-001", name: "생활용품", type: "expense", category: "living", amount: -15400, date: "2026-02-10" },
  { userId: "user-001", name: "병원", type: "expense", category: "health", amount: -18000, date: "2026-02-12" },
  { userId: "user-001", name: "외식", type: "expense", category: "food", amount: -31000, date: "2026-02-14" },
  { userId: "user-001", name: "용돈", type: "income", category: "gift", amount: 30000, date: "2026-02-16" },
  { userId: "user-001", name: "온라인 쇼핑", type: "expense", category: "shopping", amount: -47800, date: "2026-02-18" },
  { userId: "user-001", name: "보너스", type: "income", category: "bonus", amount: 150000, date: "2026-02-20" },
  { userId: "user-001", name: "버스", type: "expense", category: "transport", amount: -1500, date: "2026-02-22" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -11800, date: "2026-02-22" },
  { userId: "user-001", name: "중고 판매", type: "income", category: "etc", amount: 18000, date: "2026-02-24" },
  { userId: "user-001", name: "카페", type: "expense", category: "cafe", amount: -6100, date: "2026-02-26" },
  { userId: "user-001", name: "간식", type: "expense", category: "food", amount: -4200, date: "2026-02-26" },
  { userId: "user-001", name: "쇼핑", type: "expense", category: "shopping", amount: -38900, date: "2026-02-28" },

  // 2026-03
  { userId: "user-001", name: "월급", type: "income", category: "salary", amount: 3200000, date: "2026-03-02" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -13000, date: "2026-03-02" },
  { userId: "user-001", name: "카페", type: "expense", category: "cafe", amount: -6500, date: "2026-03-03" },
  { userId: "user-001", name: "교통비", type: "expense", category: "transport", amount: -2800, date: "2026-03-03" },
  { userId: "user-001", name: "마트", type: "expense", category: "living", amount: -46800, date: "2026-03-05" },
  { userId: "user-001", name: "병원", type: "expense", category: "health", amount: -27000, date: "2026-03-08" },
  { userId: "user-001", name: "생활용품", type: "expense", category: "living", amount: -21200, date: "2026-03-10" },
  { userId: "user-001", name: "외식", type: "expense", category: "food", amount: -42000, date: "2026-03-14" },
  { userId: "user-001", name: "디저트", type: "expense", category: "cafe", amount: -9800, date: "2026-03-14" },
  { userId: "user-001", name: "용돈", type: "income", category: "gift", amount: 70000, date: "2026-03-16" },
  { userId: "user-001", name: "온라인 쇼핑", type: "expense", category: "shopping", amount: -83200, date: "2026-03-18" },
  { userId: "user-001", name: "중고 판매", type: "income", category: "etc", amount: 35000, date: "2026-03-20" },
  { userId: "user-001", name: "버스", type: "expense", category: "transport", amount: -1500, date: "2026-03-22" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -12000, date: "2026-03-22" },
  { userId: "user-001", name: "문화생활", type: "expense", category: "culture", amount: -25000, date: "2026-03-25" },
  { userId: "user-001", name: "카페", type: "expense", category: "cafe", amount: -5900, date: "2026-03-27" },
  { userId: "user-001", name: "간식", type: "expense", category: "food", amount: -4500, date: "2026-03-27" },
  { userId: "user-001", name: "보너스", type: "income", category: "bonus", amount: 100000, date: "2026-03-30" },

  // 2026-04
  { userId: "user-001", name: "월급", type: "income", category: "salary", amount: 3200000, date: "2026-04-02" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -11000, date: "2026-04-02" },
  { userId: "user-001", name: "교통비", type: "expense", category: "transport", amount: -3200, date: "2026-04-04" },
  { userId: "user-001", name: "카페", type: "expense", category: "cafe", amount: -5800, date: "2026-04-04" },
  { userId: "user-001", name: "마트", type: "expense", category: "living", amount: -35100, date: "2026-04-06" },
  { userId: "user-001", name: "약국", type: "expense", category: "health", amount: -9800, date: "2026-04-09" },
  { userId: "user-001", name: "브런치", type: "expense", category: "food", amount: -28000, date: "2026-04-12" },
  { userId: "user-001", name: "용돈", type: "income", category: "gift", amount: 50000, date: "2026-04-15" },
  { userId: "user-001", name: "생활용품", type: "expense", category: "living", amount: -16400, date: "2026-04-15" },
  { userId: "user-001", name: "쇼핑", type: "expense", category: "shopping", amount: -42900, date: "2026-04-18" },
  { userId: "user-001", name: "중고 판매", type: "income", category: "etc", amount: 28000, date: "2026-04-20" },
  { userId: "user-001", name: "버스", type: "expense", category: "transport", amount: -1500, date: "2026-04-22" },
  { userId: "user-001", name: "저녁", type: "expense", category: "food", amount: -19000, date: "2026-04-22" },
  { userId: "user-001", name: "카페", type: "expense", category: "cafe", amount: -6300, date: "2026-04-24" },
  { userId: "user-001", name: "문화생활", type: "expense", category: "culture", amount: -18000, date: "2026-04-27" },
  { userId: "user-001", name: "보너스", type: "income", category: "bonus", amount: 80000, date: "2026-04-29" },
];

async function main() {
  await prisma.ledgerItem.deleteMany();

  const items = seedData.map((item) => ({
    userId: item.userId,
    name: item.name,
    type: item.type as "income" | "expense",
    category: item.category as any,
    amount: item.amount,
    date: new Date(item.date),
  }));

  const result = await prisma.ledgerItem.createMany({ data: items });
  console.log(`Seeded ${result.count} ledger items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
