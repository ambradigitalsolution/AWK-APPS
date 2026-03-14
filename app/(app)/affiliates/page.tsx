"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Search, Plus, Users, TrendingUp, DollarSign, Copy, 
  MoreHorizontal, ArrowUpRight, Check,
  UserPlus, Award, BarChart3, Mail, Hash, Percent, ShoppingBag,
  ShieldCheck, ShieldAlert, Info, Settings2
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const affiliateStats = [
  { name: "Total Affiliates", value: "24", icon: Users, change: "+3", color: "text-violet-600", bg: "from-violet-500/10 to-violet-500/5" },
  { name: "Total Commissions", value: "Rp 4.2M", icon: DollarSign, change: "+12%", color: "text-emerald-600", bg: "from-emerald-500/10 to-emerald-500/5" },
  { name: "Orders via Affiliates", value: "67", icon: TrendingUp, change: "+8", color: "text-blue-600", bg: "from-blue-500/10 to-blue-500/5" },
  { name: "Avg. Commission Rate", value: "10%", icon: Award, change: "0%", color: "text-amber-600", bg: "from-amber-500/10 to-amber-500/5" },
]

const initialAffiliates = [
  { id: "1", name: "Ahmad Fauzi", code: "AHMAD10", email: "ahmad@email.com", rate: 10, orders: 15, earnings: "Rp 1.250.000", status: "Active", avatar: "AF" },
  { id: "2", name: "Budi Santoso", code: "BUDI15", email: "budi@email.com", rate: 15, orders: 12, earnings: "Rp 980.000", status: "Active", avatar: "BS" },
  { id: "3", name: "Citra Dewi", code: "CITRA10", email: "citra@email.com", rate: 10, orders: 8, earnings: "Rp 650.000", status: "Active", avatar: "CD" },
  { id: "4", name: "Dimas Prayoga", code: "DIMAS12", email: "dimas@email.com", rate: 12, orders: 18, earnings: "Rp 1.540.000", status: "Active", avatar: "DP" },
  { id: "5", name: "Eka Putri", code: "EKA08", email: "eka@email.com", rate: 8, orders: 5, earnings: "Rp 320.000", status: "Inactive", avatar: "EP" },
  { id: "6", name: "Farhan Ali", code: "FARHAN10", email: "farhan@email.com", rate: 10, orders: 9, earnings: "Rp 780.000", status: "Active", avatar: "FA" },
]

const recentCommissions = [
  { affiliate: "Ahmad Fauzi", order: "OR-1021", amount: "Rp 15.000", date: "2 hours ago", status: "Pending" },
  { affiliate: "Dimas Prayoga", order: "OR-1019", amount: "Rp 32.000", date: "5 hours ago", status: "Paid" },
  { affiliate: "Budi Santoso", order: "OR-1017", amount: "Rp 18.500", date: "1 day ago", status: "Paid" },
  { affiliate: "Citra Dewi", order: "OR-1015", amount: "Rp 22.000", date: "2 days ago", status: "Pending" },
]

const avatarColors = [
  "from-violet-400 to-violet-600",
  "from-blue-400 to-blue-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-rose-400 to-rose-600",
  "from-cyan-400 to-cyan-600",
]

export default function AffiliatesPage() {
  const [affiliates, setAffiliates] = React.useState(initialAffiliates)
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)
  const [selectedAffiliate, setSelectedAffiliate] = React.useState<any>(null)
  const [isInfoOpen, setIsInfoOpen] = React.useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)
  const [pendingStatusChange, setPendingStatusChange] = React.useState<{id: string, name: string, status: string} | null>(null)
  
  // Commission states
  const [isBulkOpen, setIsBulkOpen] = React.useState(false)
  const [isEditCommOpen, setIsEditCommOpen] = React.useState(false)
  const [newCommission, setNewCommission] = React.useState<number>(10)
  const [pendingBulkChange, setPendingBulkChange] = React.useState(false)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleInfo = (affiliate: any) => {
    setSelectedAffiliate(affiliate)
    setIsInfoOpen(true)
  }

  const handleStatusToggle = (affiliate: any) => {
    const newStatus = affiliate.status === "Active" ? "Inactive" : "Active"
    setPendingStatusChange({ id: affiliate.id, name: affiliate.name, status: newStatus })
    setIsConfirmOpen(true)
  }

  const confirmStatusChange = () => {
    if (pendingStatusChange) {
      setAffiliates(prev => prev.map(aff => 
        aff.id === pendingStatusChange.id 
          ? { ...aff, status: pendingStatusChange.status } 
          : aff
      ))
      setIsConfirmOpen(false)
      setPendingStatusChange(null)
    }
  }

  const handleEditCommission = (affiliate: any) => {
    setSelectedAffiliate(affiliate)
    setNewCommission(affiliate.rate)
    setIsEditCommOpen(true)
  }

  const confirmEditCommission = () => {
    if (selectedAffiliate) {
      setAffiliates(prev => prev.map(aff => 
        aff.id === selectedAffiliate.id 
          ? { ...aff, rate: newCommission } 
          : aff
      ))
      setIsEditCommOpen(false)
    }
  }

  const handleBulkUpdate = () => {
    setIsBulkOpen(true)
  }

  const confirmBulkUpdate = () => {
    setAffiliates(prev => prev.map(aff => ({ ...aff, rate: newCommission })))
    setIsBulkOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Affiliates</h1>
          <p className="text-muted-foreground">Manage your affiliate network and track commissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleBulkUpdate}
            className="h-10 gap-2 bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-md shadow-indigo-500/20"
          >
            <Settings2 className="w-4 h-4" />
            Set All Commission
          </Button>
          <Button className="h-10 gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-md shadow-violet-500/20">
            <UserPlus className="w-4 h-4" />
            Add Affiliate
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {affiliateStats.map((stat, i) => (
          <Card key={stat.name} className={`border-0 shadow-sm animate-fade-in stagger-${i + 1}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Affiliates List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9 h-10" placeholder="Search affiliates..." />
            </div>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y">
                {affiliates.map((affiliate, i) => (
                  <div key={affiliate.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                        {affiliate.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{affiliate.name}</p>
                          <span className={cn(
                            "px-1.5 py-0.5 rounded-full text-[9px] font-semibold transition-colors duration-300",
                            affiliate.status === "Active" 
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                          )}>
                            {affiliate.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{affiliate.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      {/* Affiliate Code */}
                      <div className="hidden md:flex items-center gap-1.5">
                        <code className="px-2 py-1 rounded-md bg-muted text-[11px] font-mono font-semibold">{affiliate.code}</code>
                        <button 
                          onClick={() => copyCode(affiliate.code)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          {copiedCode === affiliate.code 
                            ? <Check className="w-3 h-3 text-emerald-500" /> 
                            : <Copy className="w-3 h-3 text-muted-foreground" />
                          }
                        </button>
                      </div>
                      {/* Stats */}
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold">{affiliate.earnings}</p>
                        <p className="text-[10px] text-muted-foreground">{affiliate.orders} orders · {affiliate.rate}%</p>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Affiliate Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleInfo(affiliate)} className="gap-2">
                            <Info className="w-4 h-4" /> Informasi Affiliate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCommission(affiliate)} className="gap-2">
                            <Percent className="w-4 h-4" /> Atur Komisi Khusus
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleStatusToggle(affiliate)}
                            className={cn("gap-2", affiliate.status === "Active" ? "text-rose-600 focus:text-rose-600" : "text-emerald-600 focus:text-emerald-600")}
                          >
                            {affiliate.status === "Active" ? (
                              <><ShieldAlert className="w-4 h-4" /> Nonaktifkan Akun</>
                            ) : (
                              <><ShieldCheck className="w-4 h-4" /> Aktifkan Akun</>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Commissions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Commissions</CardTitle>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Latest commission payouts</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCommissions.map((commission, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-xs font-semibold">{commission.affiliate}</p>
                      <p className="text-[10px] text-muted-foreground">{commission.order} · {commission.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold">{commission.amount}</p>
                      <span className={cn(
                        "text-[9px] font-semibold",
                        commission.status === "Paid" ? "text-emerald-600" : "text-amber-600"
                      )}>
                        {commission.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


        </div>
      </div>

      {/* Information Dialog */}
      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold bg-gradient-to-br",
                selectedAffiliate && avatarColors[affiliates.findIndex(a => a.id === selectedAffiliate.id) % avatarColors.length]
              )}>
                {selectedAffiliate?.avatar}
              </div>
              Informasi Mitra Affiliate
            </DialogTitle>
            <DialogDescription>
              Detail informasi mitra yang telah terdaftar dalam sistem.
            </DialogDescription>
          </DialogHeader>
          {selectedAffiliate && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Nama Lengkap</p>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-violet-500" />
                    {selectedAffiliate.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Status Akun</p>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold",
                    selectedAffiliate.status === "Active" 
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  )}>
                    {selectedAffiliate.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  {selectedAffiliate.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Referral Code</p>
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 text-amber-500" />
                    <code className="text-xs font-mono font-bold bg-muted px-1.5 py-0.5 rounded">{selectedAffiliate.code}</code>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Commission Rate</p>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Percent className="w-3.5 h-3.5 text-emerald-500" />
                    {selectedAffiliate.rate}%
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-2 gap-4 text-center">
                <div className="p-2 rounded-xl bg-violet-500/5">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Total Orders</p>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <ShoppingBag className="w-4 h-4 text-violet-600" />
                    <span className="text-lg font-bold">{selectedAffiliate.orders}</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/5">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Earnings</p>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-lg font-bold">{selectedAffiliate.earnings.replace("Rp ", "")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setIsInfoOpen(false)}>
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Individual Commission Edit Dialog */}
      <AlertDialog open={isEditCommOpen} onOpenChange={setIsEditCommOpen}>
        <AlertDialogContent className="sm:max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Atur Komisi Khusus</AlertDialogTitle>
            <AlertDialogDescription>
              Ubah persentase komisi untuk mitra <strong>{selectedAffiliate?.name}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-6">
            <Label htmlFor="comm-rate" className="text-xs text-muted-foreground uppercase mb-2 block">Persentase Komisi (%)</Label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="comm-rate"
                type="number" 
                value={newCommission} 
                onChange={(e) => setNewCommission(Number(e.target.value))}
                className="pl-9 h-12 text-lg font-bold"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmEditCommission} 
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-lg shadow-violet-500/20"
            >
              Simpan Perubahan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Commission Update Dialog */}
      <AlertDialog open={isBulkOpen} onOpenChange={setIsBulkOpen}>
        <AlertDialogContent className="sm:max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Atur Komisi Semua Mitra</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan memperbarui komisi untuk <strong>seluruh mitra</strong> yang terdaftar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-6">
            <Label htmlFor="bulk-comm-rate" className="text-xs text-muted-foreground uppercase mb-2 block">Persentase Komisi Baru (%)</Label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="bulk-comm-rate"
                type="number" 
                value={newCommission} 
                onChange={(e) => setNewCommission(Number(e.target.value))}
                className="pl-9 h-12 text-lg font-bold"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmBulkUpdate} 
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-lg shadow-violet-500/20"
            >
              Update Semua Mitra
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmation Status Alert Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin mau rubah?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan mengubah status akun mitra <strong>{pendingStatusChange?.name}</strong> menjadi 
              <span className={cn(
                "mx-1 font-bold",
                pendingStatusChange?.status === "Active" ? "text-emerald-600" : "text-rose-600"
              )}>
                {pendingStatusChange?.status}
              </span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmStatusChange}
              className={cn(
                pendingStatusChange?.status === "Active" 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : "bg-rose-600 hover:bg-rose-700"
              )}
            >
              Ya, Rubah Status
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
