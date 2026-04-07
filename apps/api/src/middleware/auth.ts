import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { verifyToken } from "../lib/jwt";
import { JWT_COOKIE_NAME } from "@repo/shared";

type AuthEnv = {
  Variables: {
    userId: string;
  };
};

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const token = getCookie(c, JWT_COOKIE_NAME);

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  c.set("userId", payload.userId);

  await next();
});
