"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Wallet, TrendingUp, Users, Clock, ArrowUpRight, DollarSign, History, MousePointerClick, CheckCircle2,
  ExternalLink, Info, Banknote
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const stats = [
  {
    name: "Saldo Aktif",
    value: "Rp 1.920.000",
    icon: Wallet,
    change: "Bisa ditarik",
    trend: "none",
    color: "from-violet-500 to-violet-600",
    bgColor: "from-violet-500/10 to-violet-500/5",
    iconColor: "text-violet-600"
  },
  {
    name: "Saldo Pending",
    value: "Rp 500.000",
    icon: Clock,
    change: "Dalam proses",
    trend: "none",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-500/10 to-amber-500/5",
    iconColor: "text-amber-600"
  },
  {
    name: "Total Penghasilan",
    value: "Rp 8.420.000",
    icon: DollarSign,
    change: "+12.5%",
    trend: "up",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-500/10 to-emerald-500/5",
    iconColor: "text-emerald-600"
  },
  {
    name: "Total Klik Link",
    value: "1,284",
    icon: MousePointerClick,
    change: "+150 klik",
    trend: "up",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-500/10 to-blue-500/5",
    iconColor: "text-blue-600"
  }
]

const recentActivity = [
  { id: "OR-1045", affiliate: "Ahmad Fauzi", desc: "Komisi Penjualan", amount: "+ Rp 150.000", status: "Selesai", date: "2 jam yang lalu" },
  { id: "OR-1044", affiliate: "Budi Santoso", desc: "Komisi Penjualan", amount: "+ Rp 85.000", status: "Pending", date: "5 jam yang lalu" },
  { id: "OR-1042", affiliate: "Citra Dewi", desc: "Komisi Penjualan", amount: "+ Rp 220.000", status: "Selesai", date: "1 hari yang lalu" },
  { id: "TRX-WD12", affiliate: "-", desc: "Penarikan Dana", amount: "- Rp 1.000.000", status: "Selesai", date: "2 hari yang lalu" },
]

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Pending": return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
    case "Selesai": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
    case "Batal": return "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
    default: return "bg-gray-100 text-gray-700"
  }
}

import { useRole } from "@/lib/contexts/RoleContext"

export function DashboardOverview() {
  const { user } = useRole()
  const affiliateCode = "AWK-FA1234"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Halo, {user?.name?.split(' ')[0] || "Mitra"}! 👋</h1>
          <p className="text-muted-foreground mt-1">Siap untuk menambah komisi hari ini? Pantau performa affiliate Anda di sini.</p>
        </div>
        <div className="flex gap-3 animate-fade-in">
          <Button className="h-10 gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-md shadow-violet-500/20" asChild>
            <Link href="/withdrawals">
              <Banknote className="w-4 h-4" />
              Tarik Saldo
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-lg overflow-hidden relative bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl group-hover:bg-violet-500/30 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700" />
        <CardContent className="p-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-violet-300" />
                </div>
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Status Kemitraan Internal</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">Selamat bekerja, berikan yang terbaik!</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
               <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center backdrop-blur-sm min-w-[140px]">
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Kode Affiliate</p>
                  <p className="text-xl font-bold text-white tracking-widest">{affiliateCode}</p>
               </div>
               <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center backdrop-blur-sm min-w-[140px]">
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Komisi Anda</p>
                  <p className="text-xl font-bold text-white">10% <span className="text-[10px] text-emerald-400">/ Order</span></p>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <Card key={stat.name} className={`border-0 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in stagger-${i + 1} overflow-hidden group`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                {stat.trend !== "none" && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold ${
                    stat.trend === "up" 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" 
                      : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                  }`}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                    {stat.change}
                  </div>
                )}
                {stat.trend === "none" && (
                   <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider font-mono">{stat.change}</span>
                )}
              </div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Commissions */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <div>
              <CardTitle className="text-lg">Riwayat Transaksi</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Status komisi dan penarikan terbaru</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link href="/history">Lihat Semua →</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all group border border-transparent hover:border-violet-500/10">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      activity.amount.startsWith("+") ? "bg-emerald-500/10" : "bg-violet-500/10"
                    )}>
                      {activity.amount.startsWith("+") ? 
                        <ArrowUpRight className="w-5 h-5 text-emerald-600" /> : 
                        <Wallet className="w-5 h-5 text-violet-600" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-bold">{activity.desc}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.id} · {activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-sm font-bold",
                      activity.amount.startsWith("+") ? "text-emerald-600" : "text-violet-700"
                    )}>{activity.amount}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${getStatusStyle(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info / Notice Column */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-600 to-violet-800 text-white overflow-hidden relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <CardContent className="p-6 relative space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-white/80" />
                <span className="text-xs font-bold text-white/90 uppercase tracking-widest">Informasi Penting</span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5 font-medium">
                  <p className="text-sm font-bold text-white">Kapan komisi cair?</p>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    Komisi masuk ke saldo aktif 3 hari setelah status &quot;Diterima&quot;.
                  </p>
                </div>
                
                <div className="space-y-1.5 font-medium">
                  <p className="text-sm font-bold text-white">Minimum Penarikan</p>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    Minimal saldo aktif Rp 50.000 untuk pengajuan penarikan.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="secondary" className="w-full text-xs font-bold h-10 rounded-xl shadow-lg shadow-black/10">
                    Kontak CS Pendaftaran
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
