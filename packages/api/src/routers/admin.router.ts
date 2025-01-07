import { adminProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import { AuthController } from "../controllers/auth.controller";

export const adminRouter = createTRPCRouter({
  deleteUser: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authController = new AuthController(ctx);
      return authController.deleteUser(input);
    }),
});
