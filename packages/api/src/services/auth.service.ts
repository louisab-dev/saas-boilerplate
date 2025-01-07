import { Context } from "../trpc";
import { SignUpResponseSchema, SignUpSchema } from "../schemas/auth.schema";
import { TRPCError } from "@trpc/server";
import { createClient } from "@supabase/supabase-js";
import { env } from "../env";

export class AuthService {
  private supabase;
  private supabaseAdmin;
  constructor(private ctx: Context) {
    this.supabase = createClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!, {});
    this.supabaseAdmin = createClient(
      env.SUPABASE_URL!,
      env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }

  async signup(input: SignUpSchema): Promise<SignUpResponseSchema> {
    const { email, password, redirectTo } = input;

    // Check that the email is not already taken
    const emailTaken = await this.ctx.prisma.user.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already taken",
      });
    }

    // Create the supabase user
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    }

    if (!data || !data.user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error creating user",
      });
    }

    // Create the prisma user
    const user = await this.ctx.prisma.user.create({
      data: {
        id: data.user.id, // Using Supabase UUID as profile ID
        email: data.user.email!,
        isAdmin: false,
      },
    });

    return { success: true, user };
  }

  async deleteUser(input: { userId: string }): Promise<boolean> {
    const { userId } = input;

    // Delete supabase user
    const { error } = await this.supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    }

    // Delete user from database
    await this.ctx.prisma.user.delete({
      where: { id: userId },
    });

    return true;
  }
}
