import { Button } from "@/components/ui/button";
import { AppleIcon, GoogleIcon, MetaIcon } from "@/components/auth/icons";
import { useI18n } from "@/locales/client";

export function SocialAuth() {
  const t = useI18n();
  return (
    <>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          {t("auth.socials.continueWith")}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Button variant="outline" className="w-full">
          <AppleIcon />
          <span className="sr-only">Sign in with Apple</span>
        </Button>
        <Button variant="outline" className="w-full">
          <GoogleIcon />
          <span className="sr-only">Sign in with Google</span>
        </Button>
        <Button variant="outline" className="w-full">
          <MetaIcon />
          <span className="sr-only">Sign in with Meta</span>
        </Button>
      </div>
    </>
  );
}
