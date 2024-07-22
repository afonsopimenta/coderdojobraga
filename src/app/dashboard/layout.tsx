import { type ReactNode } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { LogoLetteringDark } from "~/assets/svgs/logo-lettering-dark";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { DashboardNavDesktop } from "./_components/dashboard-nav-desktop";
import { DashboardNavMobile } from "./_components/dashboard-nav-mobile";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="grid min-h-dvh w-full grid-rows-[auto_1fr] md:grid-cols-[13.75rem_1fr] md:grid-rows-none lg:grid-cols-[17.5rem_1fr]">
      <div className="hidden max-h-dvh border-r border-zinc-300 bg-zinc-50 md:block">
        <div className="flex h-24 items-center border-b border-zinc-300 p-4">
          <Link href="/">
            <LogoLetteringDark className="w-5/6" />
          </Link>
        </div>
        <DashboardNavDesktop />
      </div>
      <header className="h-fit border-b border-zinc-300 bg-zinc-50 p-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
              <span className="sr-only">Abrir menu de navegação</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/">
              <LogoLetteringDark className="w-3/4" />
            </Link>
            <DashboardNavMobile />
          </SheetContent>
        </Sheet>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;
