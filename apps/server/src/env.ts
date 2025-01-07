import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  API_PORT: z.string().default("4000"),
  API_URL: z.string(),
  TRPC_PANEL_USERNAME: z.string(),
  TRPC_PANEL_PASSWORD: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  REDIS_URL: z.string(),
});

export const env = envSchema.parse(process.env);
