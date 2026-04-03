import { Hono } from "hono";
import { ledgerRoute } from "./routes/ledger";

const app = new Hono();

app.get("/", (c) => c.text("API is running"));
app.route("/ledger", ledgerRoute);

export default app;