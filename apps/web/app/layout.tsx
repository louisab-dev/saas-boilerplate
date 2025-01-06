import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PublicEnvScript } from "next-runtime-env";
import { Toaster } from "@/components/ui/toaster";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: "CHANGEME",
  description: "CHANGEME",
};

interface RootLayoutProps {
  params: { locale: string };
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  console.log("Root layout");
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PublicEnvScript />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
