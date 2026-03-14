"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search, History, ArrowUpRight, ArrowDownLeft,
  DollarSign, TrendingUp, CalendarDays, Filter,
  ChevronLeft, ChevronRight, Wallet, CheckCircle2,
  Package, Truck, CreditCard, ChevronRight as ChevronRightIcon,
  MousePointer2
} from "lucide-react"
import { cn } from "@/lib/utils"

const historyStats = [
  { name: "Total Transaksi", value: "156", icon: History, change: "+12", color: "text-violet-600", bg: "from-violet-500/10 to-violet-500/5" },
  { name: "Total Komisi Diterima", value: "Rp 8.4M", icon: DollarSign, change: "+18%", color: "text-emerald-600", bg: "from-emerald-500/10 to-emerald-500/5" },
  { name: "Komisi Bulan Ini", value: "Rp 1.2M", icon: TrendingUp, change: "+24%", color: "text-blue-600", bg: "from-blue-500/10 to-blue-500/5" },
  { name: "Penarikan Selesai", value: "Rp 6.5M", icon: Wallet, change: "+8%", color: "text-amber-600", bg: "from-amber-500/10 to-amber-500/5" },
]

const transactions = [
  { id: "TRX-001", type: "commission", description: "Komisi dari Order #OR-1045", affiliate: "Ahmad Fauzi", amount: "+ Rp 150.000", date: "12 Mar 2026, 14:30", status: "Completed" },
  { id: "TRX-002", type: "withdrawal", description: "Penarikan ke BCA ****4521", affiliate: "-", amount: "- Rp 500.000", date: "11 Mar 2026, 10:15", status: "Completed" },
  { id: "TRX-003", type: "commission", description: "Komisi dari Order #OR-1042", affiliate: "Budi Santoso", amount: "+ Rp 85.000", date: "11 Mar 2026, 08:20", status: "Production" },
  { id: "TRX-004", type: "commission", description: "Komisi dari Order #OR-1038", affiliate: "Dimas Prayoga", amount: "+ Rp 220.000", date: "10 Mar 2026, 16:45", status: "Booking" },
  { id: "TRX-005", type: "withdrawal", description: "Penarikan ke Mandiri ****7890", affiliate: "-", amount: "- Rp 1.000.000", date: "9 Mar 2026, 09:00", status: "Completed" },
  { id: "TRX-006", type: "commission", description: "Komisi dari Order #OR-1035", affiliate: "Citra Dewi", amount: "+ Rp 65.000", date: "9 Mar 2026, 07:30", status: "Shipped" },
  { id: "TRX-007", type: "commission", description: "Komisi dari Order #OR-1031", affiliate: "Farhan Ali", amount: "+ Rp 95.000", date: "8 Mar 2026, 19:10", status: "Completed" },
  { id: "TRX-008", type: "withdrawal", description: "Penarikan ke BCA ****4521", affiliate: "-", amount: "- Rp 750.000", date: "7 Mar 2026, 11:00", status: "Completed" },
]

const filterTabs = ["Semua", "Komisi", "Penarikan"]

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = React.useState("Semua")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedTrx, setSelectedTrx] = React.useState<any>(null)

  const filteredTransactions = transactions.filter((trx) => {
    const matchesFilter =
      activeFilter === "Semua" ||
      (activeFilter === "Komisi" && trx.type === "commission") ||
      (activeFilter === "Penarikan" && trx.type === "withdrawal")

    const matchesSearch =
      !searchQuery ||
      trx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.id.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Logic to determine which steps are active based on status
  const getStepStatus = (status: string) => {
    if (!selectedTrx || selectedTrx.type === 'withdrawal') return { s1: true, s2: true, s3: true, s4: true, active: false };
    
    switch (status) {
      case "Booking": return { s1: true, s2: false, s3: false, s4: false, active: true };
      case "Production": return { s1: true, s2: true, s3: false, s4: false, active: true };
      case "Shipped": return { s1: true, s2: true, s3: true, s4: false, active: true };
      case "Completed": return { s1: true, s2: true, s3: true, s4: true, active: true };
      default: return { s1: false, s2: false, s3: false, s4: false, active: false };
    }
  }

  const steps = getStepStatus(selectedTrx?.status);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">History</h1>
          <p className="text-muted-foreground">Riwayat semua transaksi komisi dan penarikan.</p>
        </div>
        <Button variant="outline" className="h-10 gap-2 font-medium">
          <CalendarDays className="w-4 h-4" />
          Pilih Periode
        </Button>
      </div>

      {/* Alur Status Section - NOW ACTIVE */}
      <Card className={cn(
        "border-0 shadow-sm transition-all duration-500 relative overflow-hidden",
        steps.active ? "bg-white ring-2 ring-violet-500/20" : "bg-muted/20 border-dashed border-2 border-muted"
      )}>
        {steps.active && (
          <div className="absolute top-0 left-0 w-1 h-full bg-violet-500 animate-pulse" />
        )}
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className={cn("w-4 h-4", steps.active ? "text-violet-600" : "text-muted-foreground")} />
              {steps.active ? (
                <span>Pelacakan Status: <span className="text-violet-600 uppercase font-mono">{selectedTrx.id}</span></span>
              ) : (
                "Alur Status Booking → Komisi"
              )}
            </h3>
            {steps.active && (
              <button 
                onClick={() => setSelectedTrx(null)}
                className="text-[10px] font-bold text-muted-foreground hover:text-rose-500 transition-colors uppercase tracking-widest"
              >
                Reset Tampilan [x]
              </button>
            )}
          </div>
          
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 px-2">
            
            {/* Step 1: Booking */}
            <div className={cn(
              "flex-1 flex flex-col items-center text-center group z-10 w-full md:w-auto transition-all duration-500",
              !steps.s1 && "opacity-30 grayscale"
            )}>
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm border transition-all duration-500",
                steps.s1 ? "bg-blue-50 border-blue-100 ring-4 ring-blue-500/5 scale-110" : "bg-white"
              )}>
                <CreditCard className={cn("w-5 h-5", steps.s1 ? "text-blue-600" : "text-muted-foreground")} />
              </div>
              <p className={cn("text-[11px] font-bold uppercase tracking-tight", steps.s1 ? "text-blue-600" : "text-muted-foreground")}>Booking</p>
              <p className="text-[10px] text-muted-foreground mt-1 px-4 leading-tight">Order dibuat & DP diterima</p>
            </div>

            <ChevronRightIcon className={cn("hidden md:block w-5 h-5 -mt-8 transition-colors duration-500", steps.s2 ? "text-blue-500" : "text-muted-foreground/20")} />

            {/* Step 2: Produksi */}
            <div className={cn(
              "flex-1 flex flex-col items-center text-center group z-10 w-full md:w-auto transition-all duration-500",
              !steps.s2 && "opacity-30 grayscale"
            )}>
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm border transition-all duration-500",
                steps.s2 ? "bg-amber-50 border-amber-100 ring-4 ring-amber-500/5 scale-110" : "bg-white"
              )}>
                <Package className={cn("w-5 h-5", steps.s2 ? "text-amber-600" : "text-muted-foreground")} />
              </div>
              <p className={cn("text-[11px] font-bold uppercase tracking-tight", steps.s2 ? "text-amber-600" : "text-muted-foreground")}>Produksi</p>
              <p className="text-[10px] text-muted-foreground mt-1 px-4 leading-tight">Proses desain & cetak</p>
            </div>

            <ChevronRightIcon className={cn("hidden md:block w-5 h-5 -mt-8 transition-colors duration-500", steps.s3 ? "text-amber-500" : "text-muted-foreground/20")} />

            {/* Step 3: Diterima */}
            <div className={cn(
              "flex-1 flex flex-col items-center text-center group z-10 w-full md:w-auto transition-all duration-500",
              !steps.s3 && "opacity-30 grayscale"
            )}>
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm border transition-all duration-500",
                steps.s3 ? "bg-indigo-50 border-indigo-100 ring-4 ring-indigo-500/5 scale-110" : "bg-white"
              )}>
                <Truck className={cn("w-5 h-5", steps.s3 ? "text-indigo-600" : "text-muted-foreground")} />
              </div>
              <p className={cn("text-[11px] font-bold uppercase tracking-tight", steps.s3 ? "text-indigo-600" : "text-muted-foreground")}>Diterima</p>
              <p className="text-[10px] text-muted-foreground mt-1 px-4 leading-tight">Barang sudah sampai</p>
            </div>

            <ChevronRightIcon className={cn("hidden md:block w-5 h-5 -mt-8 transition-colors duration-500", steps.s4 ? "text-indigo-500" : "text-muted-foreground/20")} />

            {/* Step 4: Komisi Aktif */}
            <div className={cn(
              "flex-1 flex flex-col items-center text-center group z-10 w-full md:w-auto transition-all duration-500",
              !steps.s4 && "opacity-30 grayscale"
            )}>
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-all duration-700 -mt-1",
                steps.s4 ? "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/20 scale-125 ring-4 ring-emerald-500/10" : "bg-white border"
              )}>
                <DollarSign className={cn("w-6 h-6", steps.s4 ? "text-white" : "text-muted-foreground")} />
              </div>
              <p className={cn("text-[11px] font-bold uppercase tracking-tight", steps.s4 ? "text-emerald-600" : "text-muted-foreground")}>Komisi Aktif</p>
              <p className="text-[10px] text-muted-foreground mt-1 px-4 leading-tight">Siap ditarik (H+3)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {historyStats.map((stat, i) => (
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

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeFilter === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9 h-10"
            placeholder="Cari transaksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Transaction List */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-violet-950/5 px-5 py-2 border-b flex items-center gap-2">
            <MousePointer2 className="w-3 h-3 text-violet-600" />
            <span className="text-[10px] font-bold text-violet-900 uppercase tracking-widest">Klik transaksi untuk melacak status komisi</span>
          </div>
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b bg-muted/30 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-1">Type</div>
            <div className="col-span-2">ID</div>
            <div className="col-span-4">Deskripsi</div>
            <div className="col-span-2 text-right">Jumlah</div>
            <div className="col-span-2 text-right">Tanggal</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          <div className="divide-y">
            {filteredTransactions.map((trx) => (
              <div 
                key={trx.id} 
                onClick={() => setSelectedTrx(trx)}
                className={cn(
                  "grid grid-cols-12 gap-4 px-5 py-4 hover:bg-violet-500/[0.03] transition-all items-center cursor-pointer group",
                  selectedTrx?.id === trx.id ? "bg-violet-500/[0.05] border-l-4 border-l-violet-500" : "border-l-4 border-l-transparent"
                )}
              >
                {/* Type Icon */}
                <div className="col-span-1">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                    trx.type === "commission" ? "bg-emerald-500/10" : "bg-rose-500/10"
                  )}>
                    {trx.type === "commission" ? (
                      <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-rose-600" />
                    )}
                  </div>
                </div>

                {/* ID */}
                <div className="col-span-2">
                  <code className="text-xs font-mono font-semibold text-foreground">{trx.id}</code>
                </div>

                {/* Description */}
                <div className="col-span-4">
                  <p className="text-sm font-medium group-hover:text-violet-700 transition-colors">{trx.description}</p>
                  {trx.affiliate !== "-" && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">Mitra: {trx.affiliate}</p>
                  )}
                </div>

                {/* Amount */}
                <div className="col-span-2 text-right">
                  <span className={cn(
                    "text-sm font-bold",
                    trx.type === "commission" ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {trx.amount}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2 text-right">
                  <p className="text-xs text-muted-foreground">{trx.date}</p>
                </div>

                {/* Status */}
                <div className="col-span-1 text-right">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[9px] font-bold uppercase",
                    trx.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                    trx.status === "Booking" ? "bg-blue-100 text-blue-700" :
                    trx.status === "Production" ? "bg-amber-100 text-amber-700" :
                    "bg-indigo-100 text-indigo-700"
                  )}>
                    {trx.status === "Completed" ? "Lunas" : trx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="py-16 text-center">
              <History className="w-10 h-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">Tidak ada transaksi ditemukan.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Klik pada baris transaksi untuk melihat detail pelacakan di atas
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs font-medium px-2">1 / 1</span>
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
