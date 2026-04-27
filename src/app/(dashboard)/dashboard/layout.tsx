import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";
import MainLayout from "@/components/layout/MainLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await requireAuth();

  // opcional: validar algo
  if (!ctx) {
    redirect("/login");
  }

  return <MainLayout>{children}</MainLayout>;
}