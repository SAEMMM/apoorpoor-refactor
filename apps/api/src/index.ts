import { Hono } from "hono";
import { ledgerRoute } from "./routes/ledger";
import { serve } from "@hono/node-server";

const app = new Hono();

app.route("/ledger", ledgerRoute);

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`API server is running on http://localhost:${info.port}`);
  },
);