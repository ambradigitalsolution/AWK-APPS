"use client"

import { Navbar } from "@/components/shared/Navbar"
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Navbar />
      <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto pt-16 md:pt-0">
          {children}
        </div>
      </main>
    </div>
  )
}
