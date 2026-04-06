# Mock 데이터에서 실제 DB로 전환하기 — PostgreSQL + Prisma in Monorepo

프론트엔드 개발 초기에는 API에서 하드코딩된 mock 데이터를 반환하는 방식으로 빠르게 화면을 만들었다. 이제 CRUD로 확장할 시점이 되어, 실제 PostgreSQL을 붙이고 Prisma ORM으로 전환한 과정을 정리한다.

## 프로젝트 구조

pnpm workspace 기반 모노레포다.

```
apoorpoor-monorepo/
├── apps/
│   ├── api/          # Hono 기반 API 서버
│   └── web/          # Next.js 프론트엔드
├── packages/
│   ├── shared/       # 공통 타입 정의
│   └── db/           # ← 새로 만들 DB 패키지
└── docker-compose.yml
```

API는 Hono로 돌아가고, 가계부 데이터를 `mocks/ledger.ts`에서 직접 가져오고 있었다.

```typescript
// apps/api/src/services/getMonthlyLedger.ts (변경 전)
import { MONTHLY_LEDGER_MOCKS } from "../mocks/ledger";

export const getMonthlyLedger = async ({ userId, month }) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const monthlyLedger = MONTHLY_LEDGER_MOCKS[month];
  if (!monthlyLedger || monthlyLedger.userId !== userId) return null;
  return monthlyLedger;
};
```

4개월치 mock 데이터(71건)가 하드코딩되어 있었고, 모든 서비스(`getLedgerDashboard`, `getLedgerTransactions`)가 이 함수를 통해 데이터를 가져오고 있었다. 즉, `getMonthlyLedger` 하나만 DB로 바꾸면 전체가 전환되는 구조다.

---

## Step 1. Docker로 PostgreSQL 띄우기

로컬의 5432 포트가 이미 사용 중이었기 때문에 5433으로 매핑했다.

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16
    container_name: apoorpoor-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: apoorpoor
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
docker compose up -d
```

---

## Step 2. DB 패키지 만들기

모노레포에서 DB 관련 코드를 `packages/db`로 분리했다. API뿐 아니라 나중에 다른 앱에서도 같은 DB 클라이언트를 쓸 수 있도록 하기 위해서다.

### package.json

```json
{
  "name": "@repo/db",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "src/client.ts",
  "types": "src/client.ts",
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^6.19.3"
  },
  "devDependencies": {
    "prisma": "^6.19.3",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3"
  }
}
```

여기서 `"type": "module"`이 중요하다. API 앱이 ESM(`"type": "module"`)으로 동작하는데, db 패키지에 이 설정이 없으면 import 시 아래 에러가 난다.

```
SyntaxError: The requested module '@repo/db' does not provide an export named 'prisma'
```

### .env

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/apoorpoor?schema=public"
```

---

## Step 3. Prisma 스키마 작성

기존 `@repo/shared`에 정의된 타입을 기반으로 스키마를 만들었다.

```
// shared 패키지의 기존 타입
LedgerType: "income" | "expense"
LedgerCategory: "salary" | "bonus" | "food" | "cafe" | ...
LedgerItem: { id, name, type, category, amount }
```

이걸 Prisma enum + model로 매핑한다.

```prisma
// packages/db/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum LedgerType {
  income
  expense
}

enum LedgerCategory {
  salary
  bonus
  food
  cafe
  transport
  shopping
  living
  health
  culture
  gift
  etc
}

model LedgerItem {
  id        String         @id @default(cuid())
  userId    String
  name      String
  type      LedgerType
  category  LedgerCategory
  amount    Int
  date      DateTime       @db.Date

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId, date])
  @@map("ledger_items")
}
```

설계 포인트:

- **`@@index([userId, date])`** — 가계부 조회는 항상 "특정 유저의 특정 기간"으로 하기 때문에 복합 인덱스를 걸었다.
- **`@db.Date`** — 시간 정보가 필요 없는 날짜 데이터이므로 PostgreSQL의 `date` 타입을 사용했다.
- **`@@map("ledger_items")`** — 테이블명을 snake_case로 매핑했다.

마이그레이션 실행:

```bash
cd packages/db
pnpm db:migrate
# → Applying migration `20260406050027_init`
```

---

## Step 4. PrismaClient 싱글턴 export

```typescript
// packages/db/src/client.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

개발 환경에서 핫 리로드 때마다 새 PrismaClient가 생성되면 커넥션이 쌓이는 문제가 있다. `globalThis`에 캐싱해서 이를 방지한다.

---

## Step 5. Mock 데이터를 Seed로 옮기기

기존 mock 파일에 있던 71건의 데이터를 seed 스크립트로 옮겼다.

```typescript
// packages/db/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData = [
  { userId: "user-001", name: "월급", type: "income", category: "salary", amount: 3200000, date: "2026-01-02" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -12000, date: "2026-01-02" },
  // ... 2026-01 ~ 2026-04, 총 71건
];

async function main() {
  await prisma.ledgerItem.deleteMany();

  const items = seedData.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));

  const result = await prisma.ledgerItem.createMany({ data: items });
  console.log(`Seeded ${result.count} ledger items`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
```

```bash
pnpm db:seed
# → Seeded 71 ledger items
```

`deleteMany` → `createMany` 패턴이라 반복 실행해도 멱등하다.

---

## Step 6. API 서비스를 DB로 전환

API에 `@repo/db` 의존성을 추가하고:

```json
// apps/api/package.json
{
  "dependencies": {
    "@repo/db": "workspace:*"
  }
}
```

`apps/api/.env.local`에도 DATABASE_URL을 추가한다:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/apoorpoor?schema=public"
```

그리고 `getMonthlyLedger`를 DB 조회로 교체했다.

```typescript
// apps/api/src/services/getMonthlyLedger.ts (변경 후)
import { prisma } from "@repo/db";
import type { MonthlyLedger, DailyLedger, LedgerItem } from "@repo/shared";

export const getMonthlyLedger = async ({
  userId,
  month,
}: {
  userId: string;
  month: string;
}): Promise<MonthlyLedger | null> => {
  const [year, monthValue] = month.split("-").map(Number);
  const startDate = new Date(year, monthValue - 1, 1);
  const endDate = new Date(year, monthValue, 1);

  const items = await prisma.ledgerItem.findMany({
    where: {
      userId,
      date: { gte: startDate, lt: endDate },
    },
    orderBy: { date: "asc" },
  });

  if (items.length === 0) return null;

  // DB의 flat한 row들을 날짜별로 그루핑
  const dayMap = new Map<string, LedgerItem[]>();

  for (const item of items) {
    const dateStr = item.date.toISOString().slice(0, 10);
    const ledgerItem: LedgerItem = {
      id: item.id,
      name: item.name,
      type: item.type,
      category: item.category,
      amount: item.amount,
    };

    const existing = dayMap.get(dateStr);
    if (existing) {
      existing.push(ledgerItem);
    } else {
      dayMap.set(dateStr, [ledgerItem]);
    }
  }

  const days: DailyLedger[] = Array.from(dayMap.entries()).map(
    ([date, items]) => ({ date, items }),
  );

  return { userId, month, days };
};
```

핵심은 **이 함수만 바꿨다는 것**이다. `getLedgerDashboard`, `getLedgerTransactions`, 라우트 파일은 전부 `getMonthlyLedger`를 호출하기 때문에 코드 변경 없이 자동으로 DB를 바라보게 되었다.

마지막으로 mock 파일을 삭제했다.

```bash
rm apps/api/src/mocks/ledger.ts
rmdir apps/api/src/mocks
```

---

## 결과

```bash
curl "http://localhost:3001/ledger/dashboard?userId=user-001&startDate=2026-04-01&endDate=2026-04-30"
```

```json
{
  "summary": { "income": 3358000, "expense": 197000, "remainingAmount": 3161000 },
  "calendar": [
    { "date": "2026-04-02", "income": 3200000, "expense": 11000 },
    { "date": "2026-04-04", "income": 0, "expense": 9000 },
    ...
  ],
  "categorySummary": [...],
  "compare": { "month": [...], "quarter": [...], "year": [...] }
}
```

mock 때와 동일한 응답이 DB에서 나온다.

---

## 변경된 파일 요약

| 작업 | 파일 |
|------|------|
| 생성 | `docker-compose.yml` |
| 생성 | `packages/db/` (schema, client, seed, config) |
| 수정 | `apps/api/src/services/getMonthlyLedger.ts` — mock → DB |
| 수정 | `apps/api/package.json` — `@repo/db` 의존성 추가 |
| 수정 | `apps/api/.env.local` — `DATABASE_URL` 추가 |
| 삭제 | `apps/api/src/mocks/` — mock 데이터 전체 삭제 |
| 미변경 | `getLedgerDashboard.ts`, `getLedgerTransactions.ts`, `routes/ledger.ts` |
