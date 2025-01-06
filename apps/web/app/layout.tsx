import type { Metadata } from "next";
import "./globals.css";

import { TRPCProvider } from "@/lib/trpc/Context";
import { PublicEnvScript } from "next-runtime-env";

export const metadata: Metadata = {
  title: "CHANGEME",
  description: "CHANGEME",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
