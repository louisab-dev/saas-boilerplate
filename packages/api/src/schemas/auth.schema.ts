import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpResponseSchema = z.object({
  success: z.boolean(),
  user: z.object({
    id: z.string(),
    email: z.string(),
  }),
});

export type SignUpResponseSchema = z.infer<typeof signUpResponseSchema>;
