import { prisma } from "@repo/db";

export const deleteLedgerItem = async (id: string): Promise<boolean> => {
  const existing = await prisma.ledgerItem.findUnique({ where: { id } });

  if (!existing) {
    return false;
  }

  await prisma.ledgerItem.delete({ where: { id } });

  return true;
};
