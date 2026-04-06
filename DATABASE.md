# Database 구축 과정

## 1. PostgreSQL 컨테이너 생성

Docker Compose로 PostgreSQL 16 컨테이너를 구성했다. 로컬 5432 포트가 이미 사용 중이라 **5433** 포트로 매핑했다.

**docker-compose.yml**

```yaml
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

## 2. Prisma 스키마 정의

`packages/db` 패키지를 만들고, 기존 `@repo/shared`의 타입(`LedgerType`, `LedgerCategory`, `LedgerItem`)에 맞춰 Prisma 스키마를 작성했다.

**packages/db/prisma/schema.prisma**

```prisma
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

**packages/db/.env**

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/apoorpoor?schema=public"
```

마이그레이션 실행:

```bash
cd packages/db
pnpm db:migrate
```

Prisma Client 생성:

```bash
npx prisma generate --schema=packages/db/prisma/schema.prisma
```

---

## 3. PrismaClient 싱글턴 export

API 등 다른 패키지에서 `import { prisma } from "@repo/db"`로 사용할 수 있도록 클라이언트를 export했다.

**packages/db/src/client.ts**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type { PrismaClient } from "@prisma/client";
export { Prisma } from "@prisma/client";
```

**packages/db/package.json**의 핵심 설정:

```json
{
  "type": "module",
  "main": "src/client.ts",
  "types": "src/client.ts"
}
```

> `"type": "module"`이 없으면 ESM 기반인 API 앱에서 import할 때 `does not provide an export named 'prisma'` 에러가 발생한다.

---

## 4. Mock 데이터로 Seed

기존 `apps/api/src/mocks/ledger.ts`에 있던 4개월치(2026-01 ~ 2026-04) 데이터를 그대로 seed 스크립트로 옮겼다.

**packages/db/prisma/seed.ts** (요약)

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData = [
  // 2026-01 ~ 2026-04, 총 71건
  { userId: "user-001", name: "월급", type: "income", category: "salary", amount: 3200000, date: "2026-01-02" },
  { userId: "user-001", name: "점심", type: "expense", category: "food", amount: -12000, date: "2026-01-02" },
  // ... 나머지 항목
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
```

실행:

```bash
cd packages/db
pnpm db:seed
# → Seeded 71 ledger items
```

---

## 5. API 서비스를 Mock에서 DB로 전환

### 변경 전 (Mock)

**apps/api/src/services/getMonthlyLedger.ts**

```typescript
import { MONTHLY_LEDGER_MOCKS } from "../mocks/ledger";

export const getMonthlyLedger = async ({ userId, month }) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const monthlyLedger = MONTHLY_LEDGER_MOCKS[month];
  if (!monthlyLedger || monthlyLedger.userId !== userId) return null;
  return monthlyLedger;
};
```

### 변경 후 (DB)

**apps/api/src/services/getMonthlyLedger.ts**

```typescript
import { prisma } from "@repo/db";
import type { MonthlyLedger, DailyLedger, LedgerItem } from "@repo/shared";

export const getMonthlyLedger = async ({ userId, month }) => {
  const [year, monthValue] = month.split("-").map(Number);
  const startDate = new Date(year, monthValue - 1, 1);
  const endDate = new Date(year, monthValue, 1);

  const items = await prisma.ledgerItem.findMany({
    where: { userId, date: { gte: startDate, lt: endDate } },
    orderBy: { date: "asc" },
  });

  if (items.length === 0) return null;

  // items → days(DailyLedger[]) 형태로 그루핑
  const dayMap = new Map<string, LedgerItem[]>();
  for (const item of items) {
    const dateStr = item.date.toISOString().slice(0, 10);
    // ... 그루핑 로직
  }

  return { userId, month, days };
};
```

### 삭제한 파일

- `apps/api/src/mocks/ledger.ts` — mock 데이터 파일
- `apps/api/src/mocks/` — 디렉토리 자체 삭제

### 변경하지 않은 파일

- `apps/api/src/services/getLedgerDashboard.ts`
- `apps/api/src/services/getLedgerTransactions.ts`
- `apps/api/src/routes/ledger.ts`

이 파일들은 모두 `getMonthlyLedger`를 호출하기 때문에 내부 구현이 DB로 바뀌면서 자동으로 연결되었다.

### API에 추가한 의존성

**apps/api/package.json**

```json
{
  "dependencies": {
    "@repo/db": "workspace:*"
  }
}
```

**apps/api/.env.local**에 추가:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/apoorpoor?schema=public"
```

---

## 실행 가이드

```bash
# 1. Docker 컨테이너 시작
docker compose up -d

# 2. DB 마이그레이션 (최초 또는 스키마 변경 시)
cd packages/db && pnpm db:migrate

# 3. 시드 데이터 삽입
cd packages/db && pnpm db:seed

# 4. 개발 서버 실행
pnpm dev

# 5. DB 브라우저로 확인 (선택)
cd packages/db && pnpm db:studio
```

### DBeaver 연결 정보

| 항목 | 값 |
|------|-----|
| Host | localhost |
| Port | 5433 |
| Database | **apoorpoor** |
| Username | postgres |
| Password | postgres |
