"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export function RequestResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { requestPasswordResetWithEmail } = useAuth();

  const onSubmit = async (data: ResetPasswordData) => {
    await requestPasswordResetWithEmail(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
        <div className="text-center">
          <Link
            href="/signin"
            className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </form>
  );
}
