import type { PoorItemView, PoorUserSummary } from "@repo/shared";
import type { Prisma } from "@repo/db";

type PoorItemWithOwnership = Prisma.PoorItemGetPayload<{
  include: {
    ownedBy: {
      where: { userId: string };
      select: { id: true; equipped: true };
    };
  };
}>;

export const mapPoorUserSummary = (user: {
  id: string;
  poorName: string;
  level: number;
  points: number;
}): PoorUserSummary => ({
  id: user.id,
  poorName: user.poorName,
  level: user.level,
  points: user.points,
});

export const mapPoorItemView = (
  item: PoorItemWithOwnership,
  user: PoorUserSummary,
): PoorItemView => {
  const owned = item.ownedBy[0];
  const isOwned = owned !== undefined;
  const isEquipped = owned?.equipped ?? false;

  return {
    id: item.id,
    code: item.code,
    name: item.name,
    category: item.category,
    price: item.price,
    requiredLevel: item.requiredLevel,
    imgUrl: item.imgUrl,
    sortOrder: item.sortOrder,
    isActive: item.isActive,
    isOwned,
    isEquipped,
    canPurchase:
      item.isActive &&
      !isOwned &&
      user.level >= item.requiredLevel,
  };
};
