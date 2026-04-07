"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JWT_COOKIE_NAME } from "@repo/shared";

export async function signOutAction(): Promise<never> {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_COOKIE_NAME);
  redirect("/sign-in");
}
