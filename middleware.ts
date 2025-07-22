import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/"];
const protectedRoutes = ["/dashboard", "/library", "/settings"];

export default function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublicRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
