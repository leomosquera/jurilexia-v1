"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconBell, IconMenu, IconMessage } from "@/components/ui/icons";
import { IconButton } from "@/components/ui/icon-button";
import { SearchInput } from "@/components/ui/search-input";
import { useSidebar } from "@/components/layout/sidebar-context";

export default function Header() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <header className="sticky top-0 z-40 flex h-[3.25rem] items-center gap-4 border-b border-zinc-200/70 bg-white/75 px-5 backdrop-blur-xl supports-[backdrop-filter]:bg-white/65 sm:px-6">
      <IconButton
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-pressed={!collapsed}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <IconMenu className="size-[1.125rem]" />
      </IconButton>

      <SearchInput placeholder="Search workspace…" aria-label="Search" />

      <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
        <IconButton aria-label="Notifications" title="Notifications">
          <IconBell className="size-[1.125rem]" />
        </IconButton>
        <IconButton aria-label="Messages" title="Messages">
          <IconMessage className="size-[1.125rem]" />
        </IconButton>

        <div className="ml-1 pl-1 sm:ml-2 sm:pl-2 sm:border-l sm:border-zinc-200/80">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

function UserMenu() {
  return (
    <DropdownMenu align="end">
      <DropdownMenuTrigger className="p-0.5">
        <Avatar name="Alex Morgan" size="md" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className="px-4 py-3">
          <div className="text-sm font-medium text-zinc-900">Alex Morgan</div>
          <div className="mt-0.5 truncate text-sm text-zinc-500">
            alex.morgan@example.com
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Preferences</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 focus:bg-rose-50">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
