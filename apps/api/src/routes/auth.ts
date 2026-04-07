import { Hono } from "hono";
import bcrypt from "bcrypt";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { signUp } from "../services/auth/signup";
import { signIn } from "../services/auth/signin";
import { signToken, verifyToken } from "../lib/jwt";
import { prisma } from "@repo/db";
import { JWT_COOKIE_NAME } from "@repo/shared";

export const authRoute = new Hono();

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "Lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  secure: process.env.NODE_ENV === "production",
};

authRoute.post("/signup", async (c) => {
  const body = await c.req.json();
  const { email, password, poorName } = body;

  if (!email || !password || !poorName) {
    return c.json({ message: "email, password, poorName are required" }, 400);
  }

  const result = await signUp({ email, password, poorName });

  if ("error" in result) {
    return c.json({ message: result.error }, 409);
  }

  const token = await signToken({
    userId: result.user.id,
    email: result.user.email,
  });

  setCookie(c, JWT_COOKIE_NAME, token, COOKIE_OPTIONS);

  return c.json({ user: result.user }, 201);
});

authRoute.post("/signin", async (c) => {
  const body = await c.req.json();
  const { email, password } = body;

  if (!email || !password) {
    return c.json({ message: "email, password are required" }, 400);
  }

  const result = await signIn({ email, password });

  if ("error" in result) {
    return c.json({ message: result.error }, 401);
  }

  const token = await signToken({
    userId: result.user.id,
    email: result.user.email,
  });

  setCookie(c, JWT_COOKIE_NAME, token, COOKIE_OPTIONS);

  return c.json({ user: result.user });
});

authRoute.post("/signout", async (c) => {
  deleteCookie(c, JWT_COOKIE_NAME, { path: "/" });
  return c.json({ message: "Signed out" });
});

authRoute.get("/me", async (c) => {
  const token = getCookie(c, JWT_COOKIE_NAME);

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, poorName: true },
  });

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.json({ user });
});

authRoute.patch("/password", async (c) => {
  const token = getCookie(c, JWT_COOKIE_NAME);

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const body = await c.req.json();
  const { currentPassword, newPassword } = body;

  if (!currentPassword || !newPassword) {
    return c.json({ message: "currentPassword, newPassword are required" }, 400);
  }

  if (newPassword.length < 8) {
    return c.json({ message: "비밀번호는 8자 이상이어야 합니다." }, 400);
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    return c.json({ message: "현재 비밀번호가 올바르지 않습니다." }, 401);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: payload.userId },
    data: { password: hashedPassword },
  });

  return c.json({ message: "Password updated" });
});
