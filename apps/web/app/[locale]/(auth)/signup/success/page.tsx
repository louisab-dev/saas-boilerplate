"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function SignupSuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const decodedEmail = email ? decodeURIComponent(email) : "your email";

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">
            Check Your Email
          </h1>
          <p className="text-balance text-muted-foreground">
            We've sent a confirmation email to{" "}
            {decodedEmail}. Please click the link in the email to activate your
            account.
          </p>
          <ul className="mt-2 list-disc text-left text-muted-foreground">
            <li>The confirmation link will expire in 24 hours</li>
            <li>If you don't see the email, check your spam folder</li>
          </ul>
          <p className="mt-2 text-balance text-muted-foreground">
            Once you confirm your email, you'll be able to sign in to your
            account.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button asChild variant="secondary" className="w-full">
            <Link href="/signin">Go to Login</Link>
          </Button>
          <div className="text-center">
            <Link
              href="/signup"
              className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              Sign up with a different email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
