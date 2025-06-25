import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //const sessionToken = req.cookies.get('auth_token')?.value;
  const sessionToken = true

  if (pathname === "/login" && sessionToken) {
    return NextResponse.redirect(new URL("/data-domain", req.url));
  }

  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL("/data-domain", req.url));
  }

  const protectedRoutes = ["/admin"];

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/admin/:path*", "/login"],
};