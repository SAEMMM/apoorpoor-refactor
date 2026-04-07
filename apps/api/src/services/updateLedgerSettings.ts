import { prisma } from "@repo/db";
import type { LedgerSettingsResponse } from "@repo/shared";

export const updateLedgerSettings = async (
  userId: string,
  name: string,
): Promise<LedgerSettingsResponse> => {
  const ledger = await prisma.ledger.upsert({
    where: { userId },
    update: { name },
    create: { userId, name },
  });

  return {
    name: ledger.name,
    points: ledger.points,
  };
};
