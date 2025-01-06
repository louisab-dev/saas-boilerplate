import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@my/api";

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>();
