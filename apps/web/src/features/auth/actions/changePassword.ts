"use server";

import { fetchApi } from "@/shared/lib/fetchApi";

export async function changePasswordAction(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ error?: string }> {
  const result = await fetchApi<{ message: string }>({
    path: "/auth/password",
    method: "PATCH",
    body: data,
  });

  if (!result) {
    return { error: "현재 비밀번호가 올바르지 않습니다." };
  }

  return {};
}
