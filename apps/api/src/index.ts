import app from "./app";
import { serve } from "@hono/node-server";

process.on("uncaughtException", (error) => {
  console.error("[api] uncaughtException", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("[api] unhandledRejection", reason);
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