import { createTRPCRouter, publicProcedure } from "../trpc";
import { AuthController } from "../controllers/auth.controller";
import { signUpResponseSchema, signUpSchema } from "../schemas/auth.schema";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(signUpSchema)
    .output(signUpResponseSchema)
    .mutation(async ({ ctx, input }) => {
      const authController = new AuthController(ctx);
      return authController.signup(input);
    }),
});
