import { prisma } from "@repo/db";
import type { PurchasePoorItemResponse } from "@repo/shared";
import { mapPoorItemView, mapPoorUserSummary } from "./poorItemView";

type PurchasePoorItemErrorCode =
  | "USER_NOT_FOUND"
  | "ITEM_NOT_FOUND"
  | "ITEM_INACTIVE"
  | "ALREADY_OWNED"
  | "INSUFFICIENT_LEVEL"
  | "INSUFFICIENT_POINTS";

type PurchasePoorItemResult =
  | {
      ok: true;
      data: PurchasePoorItemResponse;
    }
  | {
      ok: false;
      code: PurchasePoorItemErrorCode;
    };

export const purchasePoorItem = async (
  userId: string,
  poorItemId: string,
): Promise<PurchasePoorItemResult> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, poorName: true, level: true, points: true },
  });

  if (!user) {
    return { ok: false, code: "USER_NOT_FOUND" };
  }

  const poorItem = await prisma.poorItem.findUnique({
    where: { id: poorItemId },
    include: {
      ownedBy: {
        where: { userId },
        select: { id: true, equipped: true },
      },
    },
  });

  if (!poorItem) {
    return { ok: false, code: "ITEM_NOT_FOUND" };
  }

  if (!poorItem.isActive) {
    return { ok: false, code: "ITEM_INACTIVE" };
  }

  if (poorItem.ownedBy.length > 0) {
    return { ok: false, code: "ALREADY_OWNED" };
  }

  if (user.level < poorItem.requiredLevel) {
    return { ok: false, code: "INSUFFICIENT_LEVEL" };
  }

  if (user.points < poorItem.price) {
    return { ok: false, code: "INSUFFICIENT_POINTS" };
  }

  const purchaseResult = await prisma.$transaction(async (tx) => {
    const ownedItem = await tx.userPoorItem.create({
      data: {
        userId,
        poorItemId,
        equipped: false,
      },
    });

    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: {
        points: { decrement: poorItem.price },
      },
      select: {
        id: true,
        poorName: true,
        level: true,
        points: true,
      },
    });

    await tx.poorItemTransaction.create({
      data: {
        userId,
        poorItemId,
        type: "purchase",
        pointAmount: -poorItem.price,
      },
    });

    const purchasedItem = await tx.poorItem.findUniqueOrThrow({
      where: { id: poorItemId },
      include: {
        ownedBy: {
          where: { userId },
          select: { id: true, equipped: true },
        },
      },
    });

    return {
      ownedItem,
      updatedUser,
      purchasedItem,
    };
  });

  const poorUser = mapPoorUserSummary(purchaseResult.updatedUser);

  return {
    ok: true,
    data: {
      user: poorUser,
      item: mapPoorItemView(purchaseResult.purchasedItem, poorUser),
      purchasedAt: purchaseResult.ownedItem.purchasedAt.toISOString(),
    },
  };
};
