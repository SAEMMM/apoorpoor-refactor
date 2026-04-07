import { Hono } from "hono";
import { authRoute } from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import { ledgerRoute } from "./routes/ledger";

const app = new Hono();

app.get("/", (c) => c.text("API is running"));

app.route("/auth", authRoute);

app.use("/ledger/*", authMiddleware);
app.route("/ledger", ledgerRoute);

export default app;
