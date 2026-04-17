import type { PoorItemView, PoorUserSummary } from "@repo/shared";
import type { PoorItemCategory } from "@repo/shared";

export type PoorItemWithOwnership = {
  id: string;
  code: string;
  name: string;
  category: PoorItemCategory;
  price: number;
  requiredLevel: number;
  imgUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  ownedBy: Array<{
    id: string;
    equipped: boolean;
  }>;
};

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
