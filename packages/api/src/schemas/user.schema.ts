import { UserModel } from "@my/db";
import { z } from "zod";

export const updateProfileSchema = UserModel.pick({});

export const onboardingMandatoryFieldsSchema = UserModel.pick({});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
