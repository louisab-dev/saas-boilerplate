"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/locales/client";

export default function SignupSuccessPage() {
  const t = useI18n();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const decodedEmail = email
    ? decodeURIComponent(email)
    : t("auth.signupSuccess.defaultEmail");

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">
            {t("auth.signupSuccess.title")}
          </h1>
          <p className="text-balance text-muted-foreground">
            {t("auth.signupSuccess.emailSentText", { email: decodedEmail })}
          </p>
          <ul className="mt-2 list-disc text-left text-muted-foreground">
            <li>{t("auth.signupSuccess.expiryNote")}</li>
            <li>{t("auth.signupSuccess.spamNote")}</li>
          </ul>
          <p className="mt-2 text-balance text-muted-foreground">
            {t("auth.signupSuccess.confirmationNote")}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button asChild variant="secondary" className="w-full">
            <Link href="/signin">{t("auth.signupSuccess.loginButton")}</Link>
          </Button>
          <div className="text-center">
            <Link
              href="/signup"
              className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              {t("auth.signupSuccess.differentEmailLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
