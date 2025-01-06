"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/locales/client";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const t = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { changePasswordWithEmail } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: t("auth.passwordResetConfirm.errorTitle"),
        description: t("auth.passwordResetConfirm.errorMismatch"),
        variant: "destructive",
      });
      return;
    }

    const success = await changePasswordWithEmail(data.password);
    if (success) {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">
            {t("auth.passwordResetConfirm.title")}
          </h1>
          <p className="text-balance text-muted-foreground">
            {t("auth.passwordResetConfirm.description")}
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">
            {t("auth.passwordResetConfirm.newPasswordLabel")}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={t("auth.passwordResetConfirm.newPasswordPlaceholder")}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {t("auth.common.passwordError")}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">
            {t("auth.passwordResetConfirm.confirmPasswordLabel")}
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder={t(
              "auth.passwordResetConfirm.confirmPasswordPlaceholder",
            )}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {t("auth.passwordResetConfirm.passwordMismatch")}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          {t("auth.passwordResetConfirm.submitButton")}
        </Button>
      </div>
    </form>
  );
}
