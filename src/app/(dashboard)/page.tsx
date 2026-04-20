import { getSessionContext } from "@/lib/auth/get-session-context"

export default async function DashboardPage() {
  const session = await getSessionContext()

  if (!session) return null

  const { authUser, appUser, tenant } = session

  return (
    <div className="p-6 space-y-1">
      <p className="text-sm text-zinc-500">
        <span className="font-medium text-zinc-700">Email:</span> {authUser.email ?? "—"}
      </p>
      <p className="text-sm text-zinc-500">
        <span className="font-medium text-zinc-700">Name:</span> {appUser.nombre ?? "—"}
      </p>
      <p className="text-sm text-zinc-500">
        <span className="font-medium text-zinc-700">Tenant:</span> {tenant?.nombre ?? "—"}
      </p>
    </div>
  )
}
