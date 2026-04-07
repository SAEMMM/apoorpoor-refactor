import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWT_COOKIE_NAME } from "@repo/shared";

const PUBLIC_PATHS = ["/", "/sign-in", "/sign-up"];

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return new TextEncoder().encode(secret);
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(JWT_COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.includes(pathname);
  const authed = await isAuthenticated(request);

  if (isPublic && authed) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  if (!isPublic && !authed) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
