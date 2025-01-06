import type { Metadata } from "next";
import "./globals.css";

import { TRPCProvider } from "@/lib/trpc/Context";
import { ThemeProvider } from "@/components/theme/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
