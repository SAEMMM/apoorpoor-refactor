"use server";

import { fetchApi } from "@/shared/lib/fetchApi";
import { revalidatePath } from "next/cache";
import type { PurchasePoorItemResponse } from "@repo/shared";

type PurchasePoorItemActionResult =
  | {
      success: true;
      data: PurchasePoorItemResponse;
    }
  | {
      success: false;
      error: string;
    };

export async function purchasePoorItemAction(
  itemId: string,
): Promise<PurchasePoorItemActionResult> {
  const result = await fetchApi<PurchasePoorItemResponse>({
    path: `/poor/items/${itemId}/purchase`,
    method: "POST",
  });

  if (!result) {
    return {
      success: false,
      error: "구매에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  revalidatePath("/poor");
  revalidatePath("/poor/items");

  return {
    success: true,
    data: result,
  };
}
