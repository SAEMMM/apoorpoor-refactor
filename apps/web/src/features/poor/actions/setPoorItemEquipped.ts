"use server";

import { fetchApi } from "@/shared/lib/fetchApi";
import { revalidatePath } from "next/cache";
import type {
  SetPoorItemEquippedRequest,
  SetPoorItemEquippedResponse,
} from "@repo/shared";

type SetPoorItemEquippedActionResult =
  | {
      success: true;
      data: SetPoorItemEquippedResponse;
    }
  | {
      success: false;
      error: string;
    };

export async function setPoorItemEquippedAction(
  itemId: string,
  equipped: boolean,
): Promise<SetPoorItemEquippedActionResult> {
  const body: SetPoorItemEquippedRequest = { equipped };

  const result = await fetchApi<SetPoorItemEquippedResponse>({
    path: `/poor/items/${itemId}/equip`,
    method: "PATCH",
    body,
  });

  if (!result) {
    return {
      success: false,
      error: equipped
        ? "착용에 실패했습니다. 잠시 후 다시 시도해주세요."
        : "해제에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  revalidatePath("/poor");
  revalidatePath("/poor/items");

  return {
    success: true,
    data: result,
  };
}
