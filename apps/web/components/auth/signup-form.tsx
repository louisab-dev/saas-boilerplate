"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialAuth } from "@/components/auth/social";
import { useI18n } from "@/locales/client";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const t = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { signUpWithEmail } = useAuth();

  const onSubmit = async (data: SignUpFormData) => {
    await signUpWithEmail(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">{t("auth.signUp.title")}</h1>
          <p className="text-balance text-muted-foreground">
            {t("auth.signUp.description")}
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
          {t("auth.signUp.submitButton")}
        </Button>
        <SocialAuth />
        <div className="text-center text-sm text-muted-foreground">
          {t("auth.signUp.haveAccountText")}{" "}
          <Link
            href="/signin"
            className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
          >
            {t("auth.signUp.signInLink")}
          </Link>
        </div>
      </div>
    </form>
  );
}
