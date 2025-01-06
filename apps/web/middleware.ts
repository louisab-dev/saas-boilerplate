import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/auth/middleware";
import { createI18nMiddleware } from "next-international/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  // First handle the session update
  const sessionResponse = await updateSession(request);
  if (sessionResponse.status !== 200) {
    return sessionResponse;
  }

  // Then handle i18n
  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
