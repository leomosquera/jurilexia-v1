import { requireAuth } from "@/lib/auth/require-auth";

export function isSuperadmin(session: any): boolean {
  return session.appUser?.username === "superadmin";
}