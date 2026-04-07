"use server";

import { fetchApi } from "@/shared/lib/fetchApi";
import { revalidatePath } from "next/cache";
import type { LedgerSettingsResponse } from "@repo/shared";

export async function updateLedgerNameAction(
  name: string,
): Promise<LedgerSettingsResponse | null> {
  const result = await fetchApi<LedgerSettingsResponse>({
    path: "/ledger/settings",
    method: "PATCH",
    body: { name },
  });

  revalidatePath("/ledger");

  return result;
}
