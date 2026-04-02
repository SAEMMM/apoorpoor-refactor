import { Hono } from "hono";
import { getLedgerDashboard } from "../services/getLedgerDashboard";
import { getLedgerTransactions } from "../services/getLedgerTransactions";

export const ledgerRoute = new Hono();

ledgerRoute.get("/dashboard", async (c) => {
  const userId = c.req.query("userId");
  const startDate = c.req.query("startDate");
  const endDate = c.req.query("endDate");

  if (!userId || !startDate || !endDate) {
    return c.json({ message: "userId, startDate, endDate are required" }, 400);
  }

  const data = await getLedgerDashboard({
    userId,
    startDate,
    endDate,
  });

  if (!data) {
    return c.json({ message: "Ledger not found" }, 404);
  }

  return c.json(data);
});

ledgerRoute.get("/transactions", async (c) => {
  const userId = c.req.query("userId");
  const startDate = c.req.query("startDate");
  const endDate = c.req.query("endDate");
  const cursor = c.req.query("cursor");
  const limit = Number(c.req.query("limit") ?? 10);

  if (!userId || !startDate || !endDate) {
    return c.json({ message: "userId, startDate, endDate are required" }, 400);
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