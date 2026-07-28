import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth protection is handled server-side via getServerSession in dashboard/page.tsx
// Edge proxy disabled — NextAuth cookie timing issues on Next.js 16 edge runtime
export async function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [], // match nothing — server-side auth handles protection
};
