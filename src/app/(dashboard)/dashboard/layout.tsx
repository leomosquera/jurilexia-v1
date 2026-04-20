import { redirect } from "next/navigation"
import { getSessionContext } from "@/lib/auth/get-session-context"
import MainLayout from "@/components/layout/MainLayout"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSessionContext()

  if (!session) {
    redirect("/login")
  }

  return <MainLayout>{children}</MainLayout>
}
