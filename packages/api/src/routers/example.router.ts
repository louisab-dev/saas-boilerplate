import { createTRPCRouter, publicProcedure } from "../trpc";
import { ExampleController } from "../controllers/example.controller";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const exampleController = new ExampleController(ctx);
    return exampleController.hello(input);
  }),
});
