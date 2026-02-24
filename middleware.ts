import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  const isProtectedPage =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/secrets");

  // Si no hay sesión y quiere entrar a página protegida → login
  if (!session && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay sesión y quiere entrar a login/register → dashboard
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/secrets/:path*", "/login", "/register"],
};