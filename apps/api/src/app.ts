import { Hono } from "hono";
import { authRoute } from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import { ledgerRoute } from "./routes/ledger";
import { poorRoute } from "./routes/poor";

const app = new Hono();

app.get("/", (c) => c.text("API is running"));

app.route("/auth", authRoute);

app.use("/poor", authMiddleware);
app.use("/poor/*", authMiddleware);
app.route("/poor", poorRoute);

app.use("/ledger/*", authMiddleware);
app.route("/ledger", ledgerRoute);

export default app;
