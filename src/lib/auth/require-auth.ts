import { redirect } from "next/navigation";
import { getSessionContext, type SessionContext } from "@/lib/auth/get-session-context";

export async function requireAuth(): Promise<SessionContext> {
  const session = await getSessionContext();

  if (!session) {
    redirect("/login");
  }

  return session;
}
