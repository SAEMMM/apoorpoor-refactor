import { prisma } from "@repo/db";
import type { LedgerSettingsResponse } from "@repo/shared";

export const getLedgerSettings = async (
  userId: string,
): Promise<LedgerSettingsResponse> => {
  const ledger = await prisma.ledger.findUnique({ where: { userId } });

  return {
    name: ledger?.name ?? "가계부 이름",
  };
};
