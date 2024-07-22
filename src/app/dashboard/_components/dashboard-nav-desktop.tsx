"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Home, Settings } from "lucide-react";

import { cn } from "~/lib/utils";

export const DashboardNavDesktop = () => {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <nav className="grid px-4 py-8 text-zinc-500">
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:text-black",
          selectedSegment === null && "bg-zinc-100 text-black",
        )}
      >
        <Home className="size-4" />
        Dashboard
      </Link>
      <Link
        href="/dashboard/settings"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:text-black",
          selectedSegment === "settings" && "bg-zinc-100 text-black",
        )}
      >
        <Settings className="size-4" />
        Definições
      </Link>
    </nav>
  );
};
