import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { RoleProvider } from "@/lib/contexts/RoleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMBRA APPS | Print Business Solution",
  description: "Comprehensive management system for print businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-primary selection:text-primary-foreground`}>
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
