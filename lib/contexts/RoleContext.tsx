"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export type Role = "mitra" | "owner"

export interface BusinessBranding {
  name: string
  logo?: string
  address: string
  phone: string
  bankName: string
  bankAccount: string
  bankOwner: string
}

interface UserInfo {
  name: string
  email: string
  businessName?: string
  address?: string
  logo?: string
}

interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
  user: UserInfo | null
  login: (role: Role, user: UserInfo) => void
  updateUser: (userInfo: Partial<UserInfo>) => void
  branding: BusinessBranding
  updateBranding: (brandingInfo: Partial<BusinessBranding>) => void
  logout: () => void
  isLoaded: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("mitra")
  const [user, setUser] = useState<UserInfo | null>(null)
  const [branding, setBranding] = useState<BusinessBranding>({
    name: "AMBRA",
    address: "Jl. Raya Industri No. 12, Bekasi, Jawa Barat",
    phone: "+62 812-3456-7890",
    bankName: "BCA",
    bankAccount: "852-526-7788",
    bankOwner: "PT AMBRA WARNA KEMASAN"
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Sync with Supabase session
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*, organizations(*)')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setRoleState(profile.role as Role)
          setUser({
            name: profile.full_name || session.user.email?.split('@')[0] || "User",
            email: session.user.email || "",
            businessName: profile.organizations?.name,
            address: profile.address,
            logo: profile.avatar_url
          })
        }
      }
      
      const savedBranding = localStorage.getItem("ambra_business_branding")
      if (savedBranding) setBranding(JSON.parse(savedBranding))
      
      setIsLoaded(true)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*, organizations(*)')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setRoleState(profile.role as Role)
          setUser({
            name: profile.full_name || session.user.email?.split('@')[0] || "User",
            email: session.user.email || "",
            businessName: profile.organizations?.name,
            address: profile.address,
            logo: profile.avatar_url
          })
        }
      } else if (event === 'SIGNED_OUT') {
        setRoleState("mitra")
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const setRole = (newRole: Role) => {
    setRoleState(newRole)
    localStorage.setItem("ambra_sim_role", newRole)
  }

  const login = (newRole: Role, userInfo: UserInfo) => {
    setRoleState(newRole)
    setUser(userInfo)
    localStorage.setItem("ambra_sim_role", newRole)
    localStorage.setItem("ambra_sim_user", JSON.stringify(userInfo))
  }

  const updateUser = (newUserInfo: Partial<UserInfo>) => {
    setUser(prev => {
      const current = prev || { name: "", email: "" }
      const updated = { ...current, ...newUserInfo }
      localStorage.setItem("ambra_sim_user", JSON.stringify(updated))
      return updated
    })
  }

  const updateBranding = (newBrandingInfo: Partial<BusinessBranding>) => {
    setBranding(prev => {
      const updated = { ...prev, ...newBrandingInfo }
      localStorage.setItem("ambra_business_branding", JSON.stringify(updated))
      return updated
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setRoleState("mitra")
  }

  return (
    <RoleContext.Provider value={{ 
      role, setRole, user, login, updateUser, 
      branding, updateBranding,
      logout, isLoaded 
    }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
