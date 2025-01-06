import type { Metadata } from "next";
import "./globals.css";

import { TRPCProvider } from "@/lib/trpc/Context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PublicEnvScript } from "next-runtime-env";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

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
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AppSidebar />
              <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                  {children}
                </div>
              </SidebarInset>
            </ThemeProvider>
          </SidebarProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
