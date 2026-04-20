import { requireAuth } from "@/lib/auth/require-auth";

export async function isSuperadmin(): Promise<boolean> {
  const session = await requireAuth();

  return session.membership?.rol?.codigo === "superadmin";
}
