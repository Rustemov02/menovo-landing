import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
