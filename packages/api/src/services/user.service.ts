import { type PrismaClient, type User } from "@my/db";
import { TRPCError } from "@trpc/server";
import {
  onboardingMandatoryFieldsSchema,
  type UpdateProfileInput,
} from "../schemas/user.schema";

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    return user;
  }

  // Check that all the mandatory fields are filled
  async needOnboarding(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const requiredFields = Object.keys(onboardingMandatoryFieldsSchema.shape);
    const missingFields = requiredFields.filter(
      (field) => !user[field as keyof User],
    );

    return missingFields.length > 0;
  }

  async update(id: string, data: Partial<UpdateProfileInput>): Promise<User> {
    // First check if user exists
    await this.findById(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error updating user",
        cause: error,
      });
    }
  }
}
