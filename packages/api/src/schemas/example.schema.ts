import { z } from "zod";

export const exampleSchema = z.object({
  hello: z.string(),
});

export type ExampleSchema = z.infer<typeof exampleSchema>;
