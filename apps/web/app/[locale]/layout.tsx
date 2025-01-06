import { Providers } from "./providers";

interface BaseLayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export default async function Layout({
  params,
  children,
}: Readonly<BaseLayoutProps>) {
  const { locale } = await params;
  return (
    <Providers locale={locale}>
      {children}
    </Providers>
  );
}
