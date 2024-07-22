import { type ReactNode } from "react";
import Link from "next/link";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <header className="container flex justify-center gap-6">
        <Link href="/" className="text-blue-500 underline">
          Voltar à página principal
        </Link>
        <Link href="/dashboard" className="text-blue-500 underline">
          Dashboard
        </Link>
        <Link href="/dashboard/settings" className="text-blue-500 underline">
          Definições
        </Link>
      </header>
      {children}
    </>
  );
};

export default DashboardLayout;
