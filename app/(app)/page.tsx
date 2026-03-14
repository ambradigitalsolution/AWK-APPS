"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardOverview } from "@/components/dashboard/DashboardOverview"
import { OwnerDashboardOverview } from "@/components/dashboard/OwnerDashboardOverview"
import { useRole } from "@/lib/contexts/RoleContext"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { role, user } = useRole()
  const router = useRouter()
  const [isChecking, setIsChecking] = React.useState(true)

  React.useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("ambra_sim_user")
    if (!savedUser && !user) {
      router.push("/sign-in")
    } else {
      setIsChecking(false)
    }
  }, [user, router])

  if (isChecking) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {role === "owner" ? <OwnerDashboardOverview /> : <DashboardOverview />}
    </div>
  )
}
