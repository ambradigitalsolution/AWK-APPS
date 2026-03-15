"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/shared/Navbar"
import { useRole } from "@/lib/contexts/RoleContext"
import { Loader2 } from "lucide-react"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoaded } = useRole()
  const router = useRouter()
  const [isChecking, setIsChecking] = React.useState(true)

  React.useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push("/sign-in")
      } else {
        setIsChecking(false)
      }
    }
  }, [user, isLoaded, router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-violet-600" />
      </div>
    )
  }

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
