import { prisma } from "@repo/db";
import type { Prisma } from "@repo/db";
import type { PoorItemView, SetPoorItemEquippedResponse } from "@repo/shared";
import { mapPoorItemView, mapPoorUserSummary } from "./poorItemView";

type SetPoorItemEquippedErrorCode =
  | "USER_NOT_FOUND"
  | "ITEM_NOT_FOUND"
  | "ITEM_NOT_OWNED";

type SetPoorItemEquippedResult =
  | {
      ok: true;
      data: SetPoorItemEquippedResponse;
    }
  | {
      ok: false;
      code: SetPoorItemEquippedErrorCode;
    };

export const setPoorItemEquipped = async (
  userId: string,
  poorItemId: string,
  equipped: boolean,
): Promise<SetPoorItemEquippedResult> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, poorName: true, level: true, points: true },
  });

  if (!user) {
    return { ok: false, code: "USER_NOT_FOUND" };
  }

  const poorItem = await prisma.poorItem.findUnique({
    where: { id: poorItemId },
    select: { id: true, category: true },
  });

  if (!poorItem) {
    return { ok: false, code: "ITEM_NOT_FOUND" };
  }

  const ownedItem = await prisma.userPoorItem.findFirst({
    where: {
      userId,
      poorItemId,
    },
    select: { id: true },
  });

  if (!ownedItem) {
    return { ok: false, code: "ITEM_NOT_OWNED" };
  }

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    if (equipped) {
      await tx.userPoorItem.updateMany({
        where: {
          userId,
          equipped: true,
          poorItem: {
            category: poorItem.category,
          },
        },
        data: {
          equipped: false,
        },
      });
    }

    await tx.userPoorItem.update({
      where: { id: ownedItem.id },
      data: { equipped },
    });
  });

  const refreshedUser = mapPoorUserSummary(user);
  const refreshedItems = await prisma.poorItem.findMany({
    include: {
      ownedBy: {
        where: { userId },
        select: { id: true, equipped: true },
      },
    },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  const itemViews: PoorItemView[] = refreshedItems.map((item) =>
    mapPoorItemView(item, refreshedUser),
  );
  const targetItem = itemViews.find((item) => item.id === poorItemId);

  if (!targetItem) {
    return { ok: false, code: "ITEM_NOT_FOUND" };
  }

  return {
    ok: true,
    data: {
      item: targetItem,
      equippedItems: itemViews.filter((item) => item.isEquipped),
    },
  };
};
