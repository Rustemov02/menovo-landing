import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Redirect www to non-www
  if (host === "www.menovo.rest") {
    const url = request.nextUrl.clone();
    url.host = "menovo.rest";
    return NextResponse.redirect(url, 301);
  }

  const isPublicSlug =
    pathname.length > 1 &&
    !pathname.match(
      /^\/(admin|login|_next|api|favicon\.ico|register|kitchen|superadmin|orders|order-status|menu)(\/|$)/,
    );

  if (isPublicSlug) {
    const target = `https://admin.menovo.rest${pathname}${request.nextUrl.search}`;
    console.log("[proxy] proxying to:", target);
    return NextResponse.rewrite(target, {
      headers: {
        "X-Forwarded-Host": "menovo.rest",
        "X-Forwarded-Proto": "https",
      },
    });
  }

  return NextResponse.next();
}
