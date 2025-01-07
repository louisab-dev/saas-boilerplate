import { createTRPCRouter, protectedProcedure } from "../trpc";
import { UserController } from "../controllers/user.controller";
import { updateProfileSchema } from "../schemas/user.schema";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const userController = new UserController(ctx);
    return userController.getMe();
  }),

  update: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const userController = new UserController(ctx);
      return userController.update(ctx.user.id, input);
    }),

  needOnboarding: protectedProcedure.query(async ({ ctx }) => {
    const userController = new UserController(ctx);
    return userController.needOnboarding();
  }),
});
