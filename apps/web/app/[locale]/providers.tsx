"use client";

import { TRPCProvider } from "@/lib/trpc/Context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { I18nProviderClient } from "@/locales/client";

interface ProvidersProps {
  locale: string;
  children: React.ReactNode;
}

export function Providers({ locale, children }: ProvidersProps) {
  return (
    <TRPCProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <I18nProviderClient locale={locale}>
          {children}
        </I18nProviderClient>
      </ThemeProvider>
    </TRPCProvider>
  );
}
