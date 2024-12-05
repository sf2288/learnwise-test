import { NextRequest, NextResponse } from 'next/server';
import { getServerCookie } from './utils/server-cookie';
import { CONSTANTS, PAGES } from './utils/constants';

const protectedRoutes = PAGES.DASHBOARD.MAIN.url;

const publicRoutes = [
  PAGES.FOUR_ZERO_FOUR.url,
  PAGES.FIVE_HUNDERED.url,
  PAGES.LOGIN.url
];

/**
 * This middleware redirects users to the login page if they attempt to access a
 * protected route and are not authenticated. It also redirects users to the
 * dashboard if they are authenticated and try to access a public route.
 *
 * @param {NextRequest} request
 * @returns {Promise<NextResponse>}
 */
export async function middleware(request: NextRequest) {
  const isAuthenticated = await getServerCookie(CONSTANTS.TOKEN_KEY_NAME);
  const path = request.nextUrl.pathname;

  const isProtectedRoute = path.startsWith(protectedRoutes);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(PAGES.LOGIN.url, request.nextUrl));
    }

    if (path === PAGES.HOME.url && isAuthenticated) {
      return NextResponse.redirect(new URL(PAGES.LOGIN.url, request.nextUrl));
    }
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL(PAGES.DASHBOARD.POSTS.url, request.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
};
