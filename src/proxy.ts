import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

// Only protect /dashboard routes (landing page stays public)
export const config = {
  matcher: ["/dashboard/:path*"],
};
