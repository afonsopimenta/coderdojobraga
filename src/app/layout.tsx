import "~/styles/globals.css";

import { type ReactNode } from "react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoderDojo Braga",
  description: "",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pt" className={inter.className}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
