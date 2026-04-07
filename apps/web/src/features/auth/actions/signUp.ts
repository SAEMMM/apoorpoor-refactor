"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JWT_COOKIE_NAME } from "@repo/shared";

export async function signUpAction(data: {
  email: string;
  password: string;
  poorName: string;
}): Promise<{ error: string } | never> {
  const baseUrl = process.env.API_BASE_URL;

  const response = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "회원가입에 실패했습니다." }));
    return { error: error.message };
  }

  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    const tokenMatch = setCookieHeader.match(new RegExp(`${JWT_COOKIE_NAME}=([^;]+)`));
    if (tokenMatch) {
      const cookieStore = await cookies();
      cookieStore.set(JWT_COOKIE_NAME, tokenMatch[1], {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
      });
    }
  }

  redirect("/main");
}
