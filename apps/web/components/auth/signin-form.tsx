"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { SocialAuth } from "@/components/auth/social";
import { useI18n } from "@/locales/client";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function SignInForm() {
  const t = useI18n();
  const { signInWithEmail } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await signInWithEmail(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">{t("auth.signIn.title")}</h1>
          <p className="text-balance text-muted-foreground">
            {t("auth.signIn.description")}
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">{t("auth.common.emailLabel")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("auth.common.emailPlaceholder")}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {t("auth.common.emailError")}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">{t("auth.common.passwordLabel")}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t("auth.common.passwordPlaceholder")}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {t("auth.common.passwordError")}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          {t("auth.signIn.submitButton")}
        </Button>
        <SocialAuth />
        <div className="flex flex-col gap-2 text-center text-sm">
          <div className="text-muted-foreground">
            {t("auth.signIn.noAccountText")}{" "}
            <Link
              href="/signup"
              className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              {t("auth.signIn.signUpLink")}
            </Link>
          </div>
          <div className="text-muted-foreground">
            <Link
              href="/reset-password-request"
              className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              {t("auth.signIn.forgotPasswordLink")}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
