import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { createTRPCRouter } from "../trpc";
import { exampleRouter } from "./example.router";
import { authRouter } from "./auth.router";
import { userRouter } from "./user.router";
import { adminRouter } from "./admin.router";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
