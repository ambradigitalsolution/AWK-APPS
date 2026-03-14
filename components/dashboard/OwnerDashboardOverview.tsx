"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  BarChart3, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, 
  DollarSign, Package, AlertCircle, CheckCircle2, Factory, PieChart,
  Calendar, Layers, Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const ownerStats = [
  {
    name: "Total Omzet (Bulan Ini)",
    value: "Rp 142.850.000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-blue-600 to-indigo-600",
    shadow: "shadow-blue-500/20"
  },
  {
    name: "Estimasi Profit Bersih",
    value: "Rp 34.200.000",
    change: "+8.2%",
    trend: "up",
    icon: TrendingUp,
    color: "from-emerald-600 to-teal-600",
    shadow: "shadow-emerald-500/20"
  },
  {
    name: "Antrean Produksi",
    value: "18 Project",
    change: "5 Urgent",
    trend: "neutral",
    icon: Factory,
    color: "from-amber-600 to-orange-600",
    shadow: "shadow-amber-500/20"
  },
  {
    name: "Mitra Aktif",
    value: "24 Sales",
    change: "+2 Baru",
    trend: "up",
    icon: Users,
    color: "from-violet-600 to-purple-600",
    shadow: "shadow-violet-500/20"
  }
]

const recentOrders = [
  { id: "OR-1045", mitra: "Ahmad Fauzi", project: "Box Serum 20ml", total: "Rp 2.850.000", status: "Waiting Approval", date: "Baru saja" },
  { id: "OR-1042", mitra: "Citra Dewi", project: "Kemasan Masker", total: "Rp 8.420.000", status: "Production", date: "2 jam lalu" },
  { id: "OR-1040", mitra: "Budi Santoso", project: "Box Hampers", total: "Rp 12.150.000", status: "Production", date: "5 jam lalu" },
  { id: "OR-1038", mitra: "Rina Maria", project: "Label Sticker", total: "Rp 450.000", status: "Completed", date: "1 hari lalu" },
]

const topAffiliates = [
  { name: "Ahmad Fauzi", deals: 12, revenue: "Rp 45.2M", growth: "+15%" },
  { name: "Budi Santoso", deals: 8, revenue: "Rp 32.8M", growth: "+5%" },
  { name: "Citra Dewi", deals: 7, revenue: "Rp 28.5M", growth: "+22%" },
]

import { useRole } from "@/lib/contexts/RoleContext"

export function OwnerDashboardOverview() {
  const { user } = useRole()
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Bisnis Kontrol: {user?.name?.split(' ')[0] || "Owner"} 🚀</h1>
          <p className="text-muted-foreground mt-1 text-lg">Ringkasan performa percetakan dan antrean order hari ini.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-11 rounded-xl border-slate-200">
            <Calendar className="w-4 h-4 mr-2" />
            Laporan Bulanan
          </Button>
          <Button className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg border-0 px-6">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analisis Dalem
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ownerStats.map((stat, i) => (
          <Card key={i} className="border-0 shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white transition-transform group-hover:scale-110 duration-300",
                  stat.color,
                  stat.shadow
                )}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
                  stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                )}>
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : null}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.name}</p>
                <p className="text-xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Antrean Order Table */}
        <Card className="lg:col-span-2 border-0 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
          <CardHeader className="border-b border-slate-50 bg-slate-50/30 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-indigo-600" /> Antrean Order Masuk
                </CardTitle>
                <CardDescription>Segera kalkulasi HPP untuk order Waiting Approval</CardDescription>
              </div>
              <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50" asChild>
                <Link href="/orders">Semua Order →</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-50">
                  <tr>
                    <th className="px-6 py-4 font-bold">Project & ID</th>
                    <th className="px-6 py-4 font-bold">Mitra / Sales</th>
                    <th className="px-6 py-4 font-bold">Total Est.</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <p className="font-bold text-slate-900">{order.project}</p>
                        <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">{order.id} • {order.date}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200 uppercase">
                            {order.mitra.substring(0, 2)}
                          </div>
                          <p className="text-sm font-semibold text-slate-700">{order.mitra}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-slate-900">{order.total}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1 border",
                          order.status === "Waiting Approval" 
                            ? "bg-amber-100 text-amber-700 border-amber-200" 
                            : order.status === "Production"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        )}>
                          {order.status === "Waiting Approval" && <AlertCircle className="w-3 h-3" />}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Button 
                          variant={order.status === "Waiting Approval" ? "default" : "outline"} 
                          size="sm"
                          className={cn(
                            "rounded-lg font-bold text-xs h-9",
                            order.status === "Waiting Approval" ? "bg-indigo-600 hover:bg-indigo-700" : ""
                          )}
                          asChild
                        >
                          <Link href={`/orders/${order.id}`}>
                            {order.status === "Waiting Approval" ? "Kalkulasi" : "Detail"}
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Top Affiliates */}
          <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-slate-900 text-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Top Mitra Utama
              </CardTitle>
              <CardDescription className="text-slate-400">Penyumbang omzet tertinggi bulan ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topAffiliates.map((aff, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                      #{i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{aff.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{aff.deals} Order Selesai</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-emerald-400">{aff.revenue}</p>
                    <p className="text-[10px] text-emerald-500/80 font-bold uppercase">{aff.growth} ↑</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-white/60 hover:text-white hover:bg-white/5 text-[11px] font-black uppercase tracking-widest mt-2">
                Kelola Semua Mitra
              </Button>
            </CardContent>
          </Card>

          {/* Business Insights */}
          <Card className="border-0 shadow-lg border-l-4 border-l-indigo-600 rounded-2xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <PieChart className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-800">Insight Produksi</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Beban Mesin</span>
                  <span className="font-bold text-slate-900">72%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full w-[72%]" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                  Kapasitas produksi aman. <b>5 order urgent</b> butuh penyelesaian sebelum Jumat.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
