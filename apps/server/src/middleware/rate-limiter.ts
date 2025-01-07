import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";
import { env } from "../env";

const initRateLimiter = async () => {
  const redisClient = createClient({
    url: env.REDIS_URL || "redis://localhost:6379",
    socket: {
      connectTimeout: 10000,
    },
  });

  redisClient.on("error", (err) => console.error("Redis Client Error:", err));
  redisClient.on("connect", () => console.log("Redis Client Connected"));

  await redisClient.connect();

  process.on("SIGTERM", async () => {
    await redisClient.quit();
    process.exit(0);
  });

  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,

    // Skip rate limiting for tRPC routes
    skip: (req) => req.path.startsWith("/trpc"),

    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
      prefix: "rate-limit:",
    }),
  });
};

export { initRateLimiter };
