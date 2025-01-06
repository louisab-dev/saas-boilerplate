import { AuthContainer } from "@/components/auth/container";
import { AuthCard } from "@/components/auth/card";

export const metadata = {
  title: "Authentication - CHANGEME",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContainer>
      <AuthCard>{children}</AuthCard>
    </AuthContainer>
  );
}
