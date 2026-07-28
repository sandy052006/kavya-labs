import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard && !isAuth) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", "/dashboard");
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Only protect /dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
