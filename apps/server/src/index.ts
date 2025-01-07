import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createTRPCContext } from "@my/api";
import { appRouter } from "@my/api";
import { renderTrpcPanel } from "trpc-panel";
import { initRateLimiter } from "./middleware/rate-limiter";
import { basicAuth } from "./middleware/basic-auth";
import { env } from "./env";
import { getSuccessHTML } from "./utils/auth";

const app = express();
async function startServer() {
  // Basic middleware
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? ["https://CHANGEME.louisab.tech"]
      : ["http://localhost:3000", "http://localhost", "http://localhost:8081"];

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST"],
    }),
  );

  app.use(express.json());

  // Rate limiting (only in production)
  if (env.NODE_ENV === "production") {
    const limiter = await initRateLimiter();
    app.use(limiter);
  }

  // Health check (excluded from rate limit)
  app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok" });
  });

  // tRPC
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: createTRPCContext,
    }),
  );

  // email verification
  app.get("/api/email-verification", async (req, res) => {
    res.send(getSuccessHTML());
  });

  // tRPC Panel (with basic auth in production)
  if (env.NODE_ENV === "production") {
    app.use("/api/panel", basicAuth, (_, res) => {
      res.send(
        renderTrpcPanel(appRouter, {
          url: `${env.API_URL}/api/trpc`,
          transformer: "superjson",
        }),
      );
    });
  } else {
    app.use("/api/panel", (_, res) => {
      res.send(
        renderTrpcPanel(appRouter, {
          url: `${env.API_URL}/api/trpc`,
          transformer: "superjson",
        }),
      );
    });
  }

  const port = env.API_PORT;
  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}, panel at http://localhost:${port}/api/panel`,
    );
  });
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
