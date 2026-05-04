import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("─────────────────────────────");
  console.log("MIDDLEWARE");
  console.log("PATH:", request.nextUrl.pathname);

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = request.cookies.getAll();

          console.log(
            "REQUEST COOKIES:",
            cookies.map((c) => c.name)
          );

          return cookies;
        },

        setAll(cookiesToSet) {
          console.log(
            "SETTING COOKIES:",
            cookiesToSet.map((c) => c.name)
          );

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("MIDDLEWARE USER:", user?.id);
  console.log("MIDDLEWARE EMAIL:", user?.email);
  console.log("MIDDLEWARE ERROR:", error);

  console.log("─────────────────────────────");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};