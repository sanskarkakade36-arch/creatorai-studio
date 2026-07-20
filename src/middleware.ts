import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh auth session
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Ignore "not logged in" errors
  if (error && error.name !== "AuthSessionMissingError") {
    console.error("Middleware Error:", error);
  }

  console.log("Middleware User:", user?.email);

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/history",
    "/favorites",
    "/collections",
  ];

  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If not logged in, redirect to login
  if (!user && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in, prevent opening auth pages
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/history/:path*",
    "/favorites/:path*",
    "/collections/:path*",

    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",

    "/auth/:path*",
  ],
};