import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");

  // Use your production URL from the environment
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    request.nextUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${appUrl}/login`);
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Exchange Error:", error);

    return NextResponse.redirect(`${appUrl}/login`);
  }

  // Refresh session
  await supabase.auth.getUser();

  return NextResponse.redirect(`${appUrl}/auth/success`);
}