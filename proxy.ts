// proxy.ts  ← ফাইলের নাম এটাই হবে
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodedToken } from "./src/utils/jwt_decode";
import { IToken } from "./src/interface/token";
import { AUTH_KEY } from "./src/constant";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_KEY)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = decodedToken(token) as IToken;
  const pathname = request.nextUrl.pathname;

  if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
    if (!pathname.startsWith("/dashboard/admin")) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  if (user?.role === "STAFF") {
    if (!pathname.startsWith("/dashboard/staff")) {
      return NextResponse.redirect(new URL("/dashboard/staff", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
