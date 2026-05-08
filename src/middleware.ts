import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─────────────────────────────
  // PUBLIC / INTERNAL ROUTES
  // ─────────────────────────────

  const isPublicRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/ui-kit") ||
    pathname.startsWith("/demo") ||
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api");

  // Public routes bypass auth
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ─────────────────────────────
  // PROTECTED WORKSPACE ROUTES
  // ─────────────────────────────

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No authenticated user → redirect to login
  if (!user) {
    const loginUrl = new URL("/login", request.url);

    // optional redirect back
    loginUrl.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - static files
     * - images
     * - assets
     */
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};