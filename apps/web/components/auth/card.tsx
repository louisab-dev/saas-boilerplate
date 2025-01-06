"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/locales/client";

export function AuthCard({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useI18n();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          {children}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/auth-placeholder.svg"
              alt={t("auth.card.imageAlt")}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        {t("auth.common.termsText")}{" "}
        <a href="#">{t("auth.common.termsLink")}</a> {t("auth.common.and")}{" "}
        <a href="#">{t("auth.common.privacyLink")}</a>.
      </div>
    </div>
  );
}
