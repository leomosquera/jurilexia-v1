import type { ReactNode } from "react";

import { requireAuth } from "@/lib/auth/require-auth";
import MainLayout from "@/components/layout/MainLayout";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return <MainLayout>{children}</MainLayout>;
}