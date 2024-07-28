"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { CalendarDays, Home, Settings } from "lucide-react";

import { SheetClose } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export const DashboardNavMobile = () => {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <nav className="grid py-8 text-zinc-500">
      <SheetClose asChild>
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
            selectedSegment === null && "bg-zinc-100 text-black",
          )}
        >
          <Home className="size-4" />
          Dashboard
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href="/dashboard/sessions"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
            selectedSegment === "sessions" && "bg-zinc-100 text-black",
          )}
        >
          <CalendarDays className="size-4" />
          Sessões
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
            selectedSegment === "settings" && "bg-zinc-100 text-black",
          )}
        >
          <Settings className="size-4" />
          Definições
        </Link>
      </SheetClose>
    </nav>
  );
};
