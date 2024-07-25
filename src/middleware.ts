import { NextRequest, NextResponse } from "next/server";

const baseDomain = process.env.NODE_ENV === "development" ? "localhost:3000" : "bnmwag.dev";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get("host");

  const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // Extract the subdomain from the hostname
  let customSubDomain = hostname?.split(`.${baseDomain}`)[0];

  // Check if the extracted subdomain is not the base domain itself
  if (customSubDomain && customSubDomain !== baseDomain) {
    return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url));
  }

  // Default rewrites
  if (url.pathname === "/" || (url.pathname === "/site" && hostname === baseDomain)) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
