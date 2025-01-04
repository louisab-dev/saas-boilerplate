import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  API_PORT: z.string().default("4000"),
  API_URL: z.string(),
  AUTH_JWT_SECRET: z.string(),
  TRPC_PANEL_USERNAME: z.string(),
  TRPC_PANEL_PASSWORD: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
