import { Hono } from "hono";
import { createLedgerItem } from "../services/createLedgerItem";
import { deleteLedgerItem } from "../services/deleteLedgerItem";
import { getLedgerDashboard } from "../services/getLedgerDashboard";
import { getLedgerItem } from "../services/getLedgerItem";
import { getLedgerSettings } from "../services/getLedgerSettings";
import { getLedgerTransactions } from "../services/getLedgerTransactions";
import { updateLedgerItem } from "../services/updateLedgerItem";
import { updateLedgerSettings } from "../services/updateLedgerSettings";

type AuthEnv = {
  Variables: {
    userId: string;
  };
};

export const ledgerRoute = new Hono<AuthEnv>();

ledgerRoute.get("/settings", async (c) => {
  const userId = c.get("userId");
  const data = await getLedgerSettings(userId);
  return c.json(data);
});

ledgerRoute.patch("/settings", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const { name } = body;

  if (!name) return c.json({ message: "name is required" }, 400);

  const data = await updateLedgerSettings(userId, name);
  return c.json(data);
});

ledgerRoute.get("/dashboard", async (c) => {
  const userId = c.get("userId");
  const startDate = c.req.query("startDate");
  const endDate = c.req.query("endDate");

  if (!startDate || !endDate) {
    return c.json({ message: "startDate, endDate are required" }, 400);
  }

  const data = await getLedgerDashboard({ userId, startDate, endDate });

  if (!data) {
    return c.json({ message: "Ledger not found" }, 404);
  }

  return c.json(data);
});

ledgerRoute.get("/items/:id", async (c) => {
  const id = c.req.param("id");
  const data = await getLedgerItem(id);

  if (!data) {
    return c.json({ message: "Item not found" }, 404);
  }

  return c.json(data);
});

ledgerRoute.post("/items", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const { name, type, category, amount, date } = body;

  if (!name || !type || !category || amount === undefined || !date) {
    return c.json(
      { message: "name, type, category, amount, date are required" },
      400,
    );
  }

  const data = await createLedgerItem(userId, {
    name,
    type,
    category,
    amount,
    date,
  });

  return c.json(data, 201);
});

ledgerRoute.patch("/items/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const data = await updateLedgerItem(id, body);

  if (!data) {
    return c.json({ message: "Item not found" }, 404);
  }

  return c.json(data);
});

ledgerRoute.delete("/items/:id", async (c) => {
  const id = c.req.param("id");
  const deleted = await deleteLedgerItem(id);

  if (!deleted) {
    return c.json({ message: "Item not found" }, 404);
  }

  return c.json({ message: "Deleted" });
});

ledgerRoute.get("/transactions", async (c) => {
  const userId = c.get("userId");
  const startDate = c.req.query("startDate");
  const endDate = c.req.query("endDate");
  const cursor = c.req.query("cursor");
  const limit = Number(c.req.query("limit") ?? 10);

  if (!startDate || !endDate) {
    return c.json({ message: "startDate, endDate are required" }, 400);
  }

  const data = await getLedgerTransactions({
    userId,
    startDate,
    endDate,
    cursor,
    limit,
  });

  if (!data) {
    return c.json({ message: "Ledger not found" }, 404);
  }

  return c.json(data);
});
