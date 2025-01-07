import { type inferAsyncReturnType } from "@trpc/server";
import { type createTRPCContext } from "../trpc";
import { UserService } from "../services/user.service";
import { type User } from "@my/db";
import { type UpdateProfileInput } from "../schemas/user.schema";
import { TRPCError } from "@trpc/server";

type Context = inferAsyncReturnType<typeof createTRPCContext>;

export class UserController {
  private userService: UserService;

  constructor(private ctx: Context) {
    this.userService = new UserService(ctx.prisma);
  }

  private ensureAuthorized(userId: string) {
    if (!this.ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    if (this.ctx.user.id !== userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You can only modify your own data",
      });
    }
  }

  async getMe(): Promise<User> {
    if (!this.ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return this.userService.findById(this.ctx.user.id);
  }

  async needOnboarding(): Promise<boolean> {
    if (!this.ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return await this.userService.needOnboarding(this.ctx.user.id);
  }

  async update(userId: string, data: UpdateProfileInput): Promise<User> {
    this.ensureAuthorized(userId);
    return this.userService.update(userId, data);
  }
}
