import { NextResponse } from "next/server";
import { EXEMPTED_ROUTES, LOGIN, PUBLIC_ROUTES, ROOT } from "./routes";
import { auth } from "./auth";
import { doUserLogout } from "./utils/auth";

// This function can be marked `async` if using `await` inside

export async function middleware(request) {
  const { nextUrl } = request;

  //setting information into headers
  const headers = new Headers(request.headers);
  headers.set("origin", nextUrl.origin);

  //Chek if user is autheticated
  const session = await auth();

  const isAuthenticated = !!session?.user;

  const isPublicRoute = PUBLIC_ROUTES.find(
    (route) => nextUrl.pathname.startsWith(route) || nextUrl.pathname === ROOT
  );

  if (!isAuthenticated && !isPublicRoute) {
    // await doUserLogout();
    return NextResponse.redirect(new URL("/our-fellows/login", request.url));
  }

  if (isAuthenticated && nextUrl.pathname === LOGIN) {
    return NextResponse.redirect(
      new URL("/our-fellows/dashboard/manage-fellows", request.url)
    );
  }

  if (
    nextUrl.pathname === "/directory" ||
    nextUrl.pathname === "/dashboard" ||
    nextUrl.pathname === ROOT
  ) {
    return NextResponse.redirect(
      new URL("/our-fellows/directory/fellows", request.url)
    );
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
