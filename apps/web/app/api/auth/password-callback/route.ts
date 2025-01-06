import { createClient } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const error_description = requestUrl.searchParams.get("error_description");

  if (error) {
    return NextResponse.redirect(
      requestUrl.origin + "/reset-password/error?message=" + error_description,
    );
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        requestUrl.origin + "/reset-password/error?message=" + error.message,
      );
    }
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin + "/reset-password");
  } else {
    return NextResponse.redirect(requestUrl.origin + "/signin");
  }
}
