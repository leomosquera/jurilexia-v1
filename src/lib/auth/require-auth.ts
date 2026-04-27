import { redirect } from "next/navigation";
import { getServerContext } from "@/lib/server/context/getServerContext";

export async function requireAuth() {
  try {
    const ctx = await getServerContext();

    console.log("AUTH CTX:", {
      userId: ctx.user?.id,
      email: ctx.user?.email,
      usuario: ctx.usuario,
      tenant_id: ctx.tenant_id,
      roles: ctx.roles,
    });

    return ctx;
  } catch (error) {
    console.log("REQUIRE AUTH ERROR:", error);
    redirect("/login");
  }
} 