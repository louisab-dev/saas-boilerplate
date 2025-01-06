"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  const defaultError = {
    reasons: [
      "An invalid or expired reset token",
      "A technical issue on our end",
    ],
  };

  const decodedMessage = errorMessage ? decodeURIComponent(errorMessage) : null;

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">
            Password Reset Failed
          </h1>
          {decodedMessage
            ? (
              <p className="text-balance text-muted-foreground">
                {decodedMessage}
              </p>
            )
            : (
              <>
                <p className="text-balance text-muted-foreground">
                  We're sorry, but we couldn't reset your password. This could
                  be due to:
                </p>
                <ul className="mt-2 list-disc text-left text-muted-foreground">
                  {defaultError.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </>
            )}
          <p className="mt-2 text-balance text-muted-foreground">
            Please try resetting your password again. If the problem persists,
            contact our support team.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/reset-password-request">Try Again</Link>
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
      </div>
    </div>
  );
}
