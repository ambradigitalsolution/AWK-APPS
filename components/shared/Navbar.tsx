"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, ShoppingCart, Package, Users, Settings, 
  LogOut, ChevronLeft, ChevronRight, Bell, 
  UserCircle, Wallet, History, Banknote,
  CheckCircle2, AlertCircle, Loader2, LogOut as LogOutIcon,
  ShieldCheck, BarChart3, Factory, Layers
} from "lucide-react"
import * as React from "react"
import { useRole } from "@/lib/contexts/RoleContext"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)
  const [showLogoutModal, setShowLogoutModal] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const [logoutSuccess, setLogoutSuccess] = React.useState(false)
  const { role, user } = useRole()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems = role === "owner" ? [
    { 
      section: "Management",
      items: [
        { name: "Owner Dashboard", href: "/", icon: ShieldCheck },
        { name: "Orders", href: "/orders", icon: ShoppingCart },
        { name: "Affiliate Management", href: "/affiliates", icon: Users },
      ]
    },
    {
      section: "Business Ops",
      items: [
        { name: "Katalog Produk", href: "/products", icon: Layers },
        { name: "History Order", href: "/history", icon: Factory },
      ]
    },
    {
      section: "System",
      items: [
        { name: "Settings", href: "/settings", icon: Settings },
      ]
    }
  ] : [
    { 
      section: "Main",
      items: [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Orders Saya", href: "/orders", icon: ShoppingCart },
        { name: "Katalog Produk", href: "/products", icon: Package },
      ]
    },
    {
      section: "Business",
      items: [
        { name: "Komisi Affiliate", href: "/withdrawals", icon: Wallet },
        { name: "History Order", href: "/history", icon: History },
      ]
    },
    {
      section: "System",
      items: [
        { name: "Settings", href: "/settings", icon: Settings },
      ]
    }
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoggingOut(false)
    setLogoutSuccess(true)
    // Wait for success animation then redirect
    setTimeout(() => {
      router.push("/sign-in")
    }, 1000)
  }

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-[400px] rounded-[28px] shadow-2xl overflow-hidden border border-white/20 animate-scale-in">
            {/* Modal Header/Decorative */}
            <div className="h-2 bg-gradient-to-r from-rose-500 to-violet-600" />
            
            <div className="p-8 text-center">
              {logoutSuccess ? (
                <div className="animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Logout Berhasil</h3>
                  <p className="text-muted-foreground">Sampai jumpa lagi!</p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-10 h-10 text-rose-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Yakin ingin keluar?</h3>
                  <p className="text-muted-foreground text-sm mb-8">
                    Pastikan semua pekerjaan Anda telah tersimpan sebelum keluar dari sistem.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-12 rounded-xl font-bold"
                      onClick={() => setShowLogoutModal(false)}
                      disabled={isLoggingOut}
                    >
                      Batal
                    </Button>
                    <Button 
                      className="h-12 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      {isLoggingOut ? "Proses..." : "Ya, Keluar"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border/50 z-[60] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center overflow-hidden">
            {user?.logo ? (
              <img src={user.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Package className="text-white w-4 h-4" />
            )}
          </div>
          <span className="font-bold text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
            {user?.businessName?.split(' ')[0] || "AMBRA"}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-xl bg-violet-500/10 text-violet-600"
        >
          {isMobileMenuOpen ? <ChevronLeft className="w-5 h-5 rotate-90" /> : <BarChart3 className="w-5 h-5 rotate-90" />}
        </Button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[65] animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className={cn(
        "fixed left-0 top-0 h-full border-r border-border/50 bg-card/95 md:bg-card/80 backdrop-blur-xl transition-all duration-300 z-[70] flex flex-col shadow-2xl md:shadow-none",
        collapsed ? "w-[72px]" : "w-64",
        "translate-x-0", // base
        !isMobileMenuOpen && " -translate-x-full md:translate-x-0" // mobile hidden
      )}>
      {/* Header */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-border/50",
        collapsed ? "justify-center" : ""
      )}>
        <div className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-300",
          user?.logo ? "" : "bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/20"
        )}>
          {user?.logo ? (
            <img src={user.logo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <Package className="text-white w-5 h-5" />
          )}
        </div>
        {!collapsed && (
          <div className="animate-fade-in pl-1">
            <span className="font-bold text-[13px] tracking-tight uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 block">
              {user?.businessName?.split(' ')[0] || "AMBRA"}
            </span>
            <span className="text-[9px] text-muted-foreground font-black block -mt-0.5 tracking-[0.05em] truncate max-w-[140px]">
              {user?.businessName?.split(' ').slice(1).join(' ') || "WARNA KEMASAN"}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navItems.map((group) => (
          <div key={group.section}>
            {!collapsed && (
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/40 px-3 mb-2">
                {group.section}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                      collapsed ? "justify-center" : "",
                      isActive
                        ? "bg-gradient-to-r from-violet-500/10 to-blue-500/5 text-violet-700 dark:text-violet-300 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.1)]"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    <item.icon className={cn(
                      "w-[18px] h-[18px] flex-shrink-0",
                      isActive ? "text-violet-600 dark:text-violet-400" : ""
                    )} />
                    {!collapsed && <span>{item.name}</span>}
                    {isActive && !collapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-600 shadow-lg shadow-violet-500/40" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User & Bottom */}
      <div className="border-t border-border/50 p-3 space-y-2">
        {/* User Info */}
        <div className={cn(
          "flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50",
          collapsed ? "justify-center" : ""
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
            <UserCircle className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-slate-900">{user?.name || (role === "owner" ? "Owner Ambra" : "Mitra Ahmad")}</p>
              <p className="text-[9px] text-muted-foreground truncate uppercase tracking-tighter font-semibold">{role === "owner" ? "Super Admin" : "Affiliate Sales"}</p>
            </div>
          )}
          {!collapsed && (
            <Bell className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex-shrink-0" />
          )}
        </div>

        {/* Sign Out & Collapse */}
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            className={cn(
              "flex-1 justify-start gap-3 text-muted-foreground h-9 text-xs font-bold hover:text-destructive hover:bg-destructive/5 rounded-lg",
              collapsed ? "justify-center px-2" : ""
            )}
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOutIcon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && "Sign Out"}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-9 w-9 text-muted-foreground flex-shrink-0 rounded-lg hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      </nav>
    </>
  )
}
