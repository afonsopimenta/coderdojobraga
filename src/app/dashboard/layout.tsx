import { type ReactNode } from "react";
import Link from "next/link";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <header className="container flex justify-center">
        <Link href="/" className="text-blue-500 underline">
          Voltar à página principal
        </Link>
      </header>
      {children}
    </>
  );
};

export default DashboardLayout;
