import { prisma } from "@repo/db";
import type { PoorItemView, PoorOverviewResponse } from "@repo/shared";
import {
  mapPoorItemView,
  mapPoorUserSummary,
  type PoorItemWithOwnership,
} from "./poorItemView";

export const getPoorOverview = async (
  userId: string,
): Promise<PoorOverviewResponse | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      poorName: true,
      level: true,
      points: true,
    },
  });

  if (!user) {
    return null;
  }

  const poorUser = mapPoorUserSummary(user);
  const items = await prisma.poorItem.findMany({
    include: {
      ownedBy: {
        where: { userId },
        select: { id: true, equipped: true },
      },
    },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  const itemViews: PoorItemView[] = items.map((item: PoorItemWithOwnership) =>
    mapPoorItemView(item, poorUser),
  );

  return {
    user: poorUser,
    items: itemViews,
    ownedItems: itemViews.filter((item) => item.isOwned),
    equippedItems: itemViews.filter((item) => item.isEquipped),
    purchasableItems: itemViews.filter((item) => item.canPurchase),
  };
};
