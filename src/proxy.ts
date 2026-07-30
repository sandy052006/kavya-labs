// ─────────────────────────────────────────────────────────────────────────────
// proxy.ts — Server-side route protection via NextAuth v5
//
// NextAuth v5's `auth()` runs on the edge runtime on EVERY matching request
// before the page renders, making client-side bypass impossible.
// Next.js 16 uses 'proxy' instead of 'middleware'
// ─────────────────────────────────────────────────────────────────────────────
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = auth((req) => {
  const { nextUrl, auth: session } = req as NextRequest & { auth: { user?: { role?: string } } | null };
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";

  // Protect /dashboard — redirect unauthenticated to sign-in
  if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    const signInUrl = new URL("/auth/signin", nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Protect /admin — redirect non-admins
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const signInUrl = new URL("/auth/signin", nextUrl.origin);
      signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  // Run on /dashboard and /admin routes — skip API, static files, etc.
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
