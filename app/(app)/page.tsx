"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardOverview } from "@/components/dashboard/DashboardOverview"
import { OwnerDashboardOverview } from "@/components/dashboard/OwnerDashboardOverview"
import { useRole } from "@/lib/contexts/RoleContext"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { role } = useRole()

  return (
    <div className="space-y-6">
      {role === "owner" ? <OwnerDashboardOverview /> : <DashboardOverview />}
    </div>
  )
}
