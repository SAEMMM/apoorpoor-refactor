"use server";

import { fetchApi } from "@/shared/lib/fetchApi";
import { revalidatePath } from "next/cache";
import type {
  CreateLedgerItemRequest,
  UpdateLedgerItemRequest,
  LedgerItemResponse,
} from "@repo/shared";

export async function createLedgerItemAction(
  data: CreateLedgerItemRequest,
): Promise<LedgerItemResponse | null> {
  const result = await fetchApi<LedgerItemResponse>({
    path: "/ledger/items",
    method: "POST",
    body: data,
  });

  revalidatePath("/ledger");

  return result;
}

export async function updateLedgerItemAction(
  id: string,
  data: UpdateLedgerItemRequest,
): Promise<LedgerItemResponse | null> {
  const result = await fetchApi<LedgerItemResponse>({
    path: `/ledger/items/${id}`,
    method: "PATCH",
    body: data,
  });

  revalidatePath("/ledger");

  return result;
}

export async function deleteLedgerItemAction(
  id: string,
): Promise<boolean> {
  const result = await fetchApi<{ message: string }>({
    path: `/ledger/items/${id}`,
    method: "DELETE",
  });

  revalidatePath("/ledger");

  return result !== null;
}
