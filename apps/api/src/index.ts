import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ ok: true, service: "api" });
});

app.get("/ledger/health", (c) => {
  return c.json({ ok: true });
});

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`API server is running on http://localhost:${info.port}`);
  },
);
