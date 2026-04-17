import { Hono } from "hono";
import { getPoorOverview } from "../services/getPoorOverview";
import { purchasePoorItem } from "../services/purchasePoorItem";
import { setPoorItemEquipped } from "../services/setPoorItemEquipped";

type AuthEnv = {
  Variables: {
    userId: string;
  };
};

export const poorRoute = new Hono<AuthEnv>();

poorRoute.get("/", async (c) => {
  const userId = c.get("userId");
  const data = await getPoorOverview(userId);

  if (!data) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.json(data);
});

poorRoute.post("/items/:id/purchase", async (c) => {
  const userId = c.get("userId");
  const poorItemId = c.req.param("id");
  const result = await purchasePoorItem(userId, poorItemId);

  if (result.ok) {
    return c.json(result.data, 201);
  }

  switch (result.code) {
    case "USER_NOT_FOUND":
      return c.json({ message: "User not found" }, 404);
    case "ITEM_NOT_FOUND":
      return c.json({ message: "Item not found" }, 404);
    case "ITEM_INACTIVE":
      return c.json({ message: "Item is inactive" }, 400);
    case "ALREADY_OWNED":
      return c.json({ message: "Item already owned" }, 409);
    case "INSUFFICIENT_LEVEL":
      return c.json({ message: "Insufficient level" }, 400);
    case "INSUFFICIENT_POINTS":
      return c.json({ message: "Insufficient points" }, 400);
  }
});

poorRoute.patch("/items/:id/equip", async (c) => {
  const userId = c.get("userId");
  const poorItemId = c.req.param("id");
  const body = await c.req.json();
  const { equipped } = body as { equipped?: unknown };

  if (typeof equipped !== "boolean") {
    return c.json({ message: "equipped boolean is required" }, 400);
  }

  const result = await setPoorItemEquipped(userId, poorItemId, equipped);

  if (result.ok) {
    return c.json(result.data);
  }

  switch (result.code) {
    case "USER_NOT_FOUND":
      return c.json({ message: "User not found" }, 404);
    case "ITEM_NOT_FOUND":
      return c.json({ message: "Item not found" }, 404);
    case "ITEM_NOT_OWNED":
      return c.json({ message: "Item not owned" }, 400);
  }
});
