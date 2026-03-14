"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search, Banknote, ArrowUpRight, Clock, CheckCircle2,
  XCircle, DollarSign, Wallet, Plus, AlertCircle,
  ChevronLeft, ChevronRight, Building2, CreditCard
} from "lucide-react"
import { cn } from "@/lib/utils"

const withdrawalStats = [
  { name: "Saldo Tersedia", value: "Rp 1.920.000", icon: Wallet, change: "Available", color: "text-violet-600", bg: "from-violet-500/10 to-violet-500/5", changeColor: "text-violet-600" },
  { name: "Sedang Diproses", value: "Rp 500.000", icon: Clock, change: "1 pending", color: "text-amber-600", bg: "from-amber-500/10 to-amber-500/5", changeColor: "text-amber-600" },
  { name: "Total Ditarik", value: "Rp 6.500.000", icon: DollarSign, change: "+18%", color: "text-emerald-600", bg: "from-emerald-500/10 to-emerald-500/5", changeColor: "text-emerald-600" },
  { name: "Pengajuan Ditolak", value: "1", icon: XCircle, change: "Total", color: "text-rose-600", bg: "from-rose-500/10 to-rose-500/5", changeColor: "text-rose-600" },
]

const withdrawals = [
  { id: "WD-001", bank: "BCA", account: "****4521", holder: "Ahmad Fauzi", amount: "Rp 500.000", date: "12 Mar 2026, 10:00", status: "Pending", note: "Menunggu verifikasi admin" },
  { id: "WD-002", bank: "Mandiri", account: "****7890", holder: "Ahmad Fauzi", amount: "Rp 1.000.000", date: "9 Mar 2026, 09:00", status: "Completed", note: "Transfer berhasil" },
  { id: "WD-003", bank: "BCA", account: "****4521", holder: "Ahmad Fauzi", amount: "Rp 750.000", date: "7 Mar 2026, 11:00", status: "Completed", note: "Transfer berhasil" },
  { id: "WD-004", bank: "BNI", account: "****1234", holder: "Ahmad Fauzi", amount: "Rp 300.000", date: "3 Mar 2026, 14:30", status: "Rejected", note: "Nominal melebihi saldo" },
  { id: "WD-005", bank: "BCA", account: "****4521", holder: "Ahmad Fauzi", amount: "Rp 2.000.000", date: "28 Feb 2026, 08:15", status: "Completed", note: "Transfer berhasil" },
  { id: "WD-006", bank: "Mandiri", account: "****7890", holder: "Ahmad Fauzi", amount: "Rp 1.500.000", date: "20 Feb 2026, 10:45", status: "Completed", note: "Transfer berhasil" },
  { id: "WD-007", bank: "BCA", account: "****4521", holder: "Ahmad Fauzi", amount: "Rp 450.000", date: "15 Feb 2026, 16:00", status: "Completed", note: "Transfer berhasil" },
]

const filterTabs = ["Semua", "Pending", "Selesai", "Ditolak"]

const bankIcons: Record<string, string> = {
  "BCA": "🏦",
  "Mandiri": "🏦",
  "BNI": "🏦",
  "BRI": "🏦",
}

export default function WithdrawalsPage() {
  const [activeFilter, setActiveFilter] = React.useState("Semua")
  const [showForm, setShowForm] = React.useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = React.useState("")
  const availableBalance = 1920000 // In reality, this would come from a data source

  const filteredWithdrawals = withdrawals.filter((wd) => {
    if (activeFilter === "Semua") return true
    if (activeFilter === "Pending") return wd.status === "Pending"
    if (activeFilter === "Selesai") return wd.status === "Completed"
    if (activeFilter === "Ditolak") return wd.status === "Rejected"
    return true
  })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
      case "Completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
      case "Rejected":
        return "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-3.5 h-3.5" />
      case "Completed":
        return <CheckCircle2 className="w-3.5 h-3.5" />
      case "Rejected":
        return <XCircle className="w-3.5 h-3.5" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Komisi Affiliate</h1>
          <p className="text-muted-foreground">Pantau saldo komisi Anda dan ajukan penarikan di sini.</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="h-10 gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-md shadow-violet-500/20"
        >
          <Plus className="w-4 h-4" />
          Ajukan Penarikan
        </Button>
      </div>

      {/* Withdrawal Form Modal */}
      {showForm && (
        <Card className="border-0 shadow-lg animate-fade-in overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-violet-500 to-blue-500" />
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Banknote className="w-5 h-5 text-violet-600" />
              Form Pengajuan Penarikan
            </CardTitle>
            <p className="text-xs text-muted-foreground">Isi data di bawah untuk mengajukan penarikan komisi.</p>
          </CardHeader>
          <CardContent>
            {/* Registered Account Info (Read-only) */}
            <div className="mb-6 p-4 rounded-2xl bg-muted/30 border border-muted/50">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-muted-foreground uppercase opacity-70 tracking-wider">
                <CreditCard className="w-3.5 h-3.5" />
                Rekening Tujuan Terdaftar
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-lg shadow-sm">
                    🏦
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Nama Bank</p>
                    <p className="text-sm font-bold">BCA</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nomor Rekening</p>
                  <p className="text-sm font-mono font-bold tracking-wider">852-526-XXXX</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Atas Nama</p>
                  <p className="text-sm font-bold">Ahmad Fauzi</p>
                </div>
                <div className="flex items-center gap-2">
                   <Button variant="link" className="h-auto p-0 text-xs text-violet-600 font-semibold" onClick={() => {}}>
                      Ubah Rekening di Pengaturan →
                   </Button>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-3 max-w-sm">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-violet-600" />
                  Jumlah Penarikan
                </label>
                <button 
                  type="button"
                  onClick={() => setWithdrawalAmount(availableBalance.toString())}
                  className="text-[11px] font-bold text-violet-600 hover:text-violet-700 bg-violet-50 px-2 py-1 rounded-md transition-colors"
                >
                  Tarik Semua
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">Rp</span>
                <Input 
                  className="h-12 pl-12 text-lg font-bold rounded-xl border-2 focus:border-violet-500/50" 
                  placeholder="0" 
                  type="text" 
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
              </div>
              <p className="text-[10px] text-muted-foreground pl-1">
                Saldo tersedia: <span className="font-bold">Rp {availableBalance.toLocaleString('id-ID')}</span>
              </p>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 mt-5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                Minimum penarikan Rp 50.000. Penarikan akan diproses dalam 1-3 hari kerja. 
                Pastikan data rekening sudah benar sebelum mengajukan.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <Button className="h-10 px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-sm">
                Kirim Pengajuan
              </Button>
              <Button variant="outline" className="h-10 px-6" onClick={() => setShowForm(false)}>
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {withdrawalStats.map((stat, i) => (
          <Card key={stat.name} className={`border-0 shadow-sm animate-fade-in stagger-${i + 1}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-semibold ${stat.changeColor}`}>
                  {stat.change !== "Available" && stat.change !== "1 pending" && stat.change !== "Total" && <ArrowUpRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
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
      </div>

      {/* Withdrawal List */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b bg-muted/30 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Bank</div>
            <div className="col-span-2">Rekening</div>
            <div className="col-span-2 text-right">Jumlah</div>
            <div className="col-span-2">Tanggal</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2">Keterangan</div>
          </div>

          {/* Rows */}
          <div className="divide-y">
            {filteredWithdrawals.map((wd) => (
              <div key={wd.id} className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-muted/20 transition-colors items-center">
                {/* ID */}
                <div className="col-span-1">
                  <code className="text-xs font-mono font-semibold">{wd.id}</code>
                </div>

                {/* Bank */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center text-sm">
                      {bankIcons[wd.bank] || "🏦"}
                    </div>
                    <span className="text-sm font-medium">{wd.bank}</span>
                  </div>
                </div>

                {/* Account */}
                <div className="col-span-2">
                  <p className="text-sm font-mono">{wd.account}</p>
                  <p className="text-[10px] text-muted-foreground">{wd.holder}</p>
                </div>

                {/* Amount */}
                <div className="col-span-2 text-right">
                  <span className="text-sm font-bold">{wd.amount}</span>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">{wd.date}</p>
                </div>

                {/* Status */}
                <div className="col-span-1 text-center">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold",
                    getStatusStyle(wd.status)
                  )}>
                    {getStatusIcon(wd.status)}
                    {wd.status === "Completed" ? "Selesai" : wd.status === "Pending" ? "Proses" : "Ditolak"}
                  </span>
                </div>

                {/* Note */}
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">{wd.note}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredWithdrawals.length === 0 && (
            <div className="py-16 text-center">
              <Banknote className="w-10 h-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">Tidak ada pengajuan penarikan ditemukan.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Menampilkan {filteredWithdrawals.length} dari {withdrawals.length} pengajuan
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
