import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("access_token")?.value ||
    req.headers.get("authorization") ||
    req.nextUrl.searchParams.get("access_token") ||
    null;

  const url = req.nextUrl.clone();

  if (url.pathname === "/") {
    if (token) {
      url.pathname = "/kassa";
    } else {
      url.pathname = "/login";
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};