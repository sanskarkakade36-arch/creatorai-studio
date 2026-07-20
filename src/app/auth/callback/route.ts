import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");

  if (!code) {
    console.error("OAuth Error: No code received.");

    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=no_code`
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("OAuth Exchange Error:", error.message);

    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=oauth_failed`
    );
  }

  console.log("OAuth login successful");

  return NextResponse.redirect(
    `${requestUrl.origin}/dashboard`
  );
}