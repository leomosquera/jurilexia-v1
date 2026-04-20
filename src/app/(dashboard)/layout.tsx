import { redirect } from "next/navigation"
import { getSessionContext } from "@/lib/auth/get-session-context"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSessionContext()

  if (!session) {
    redirect("/login")
  }

  return <>{children}</>
}
