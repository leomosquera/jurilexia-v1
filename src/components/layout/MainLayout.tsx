"use client";

import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/layout/sidebar-context";
import Header from "@/components/layout/MainHeader";
import Sidebar from "@/components/layout/MainSidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="min-h-[calc(100vh-3.75rem)] px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}