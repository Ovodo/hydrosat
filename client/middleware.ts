import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  if (!req.cookies.has("jwt")) {
    const url = new URL("/auth/signin", req.nextUrl.origin);
    console.log("url", url.toString());
    return NextResponse.redirect(
      new URL("/auth/signin", req.nextUrl.origin).toString()
    );
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api|auth|icons|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
