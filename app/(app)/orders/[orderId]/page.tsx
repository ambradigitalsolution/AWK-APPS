"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft, Package, CheckCircle2,
  MapPin, FileText, Download, MessageCircle, Edit,
  Calendar, CreditCard, Calculator, Box, TrendingUp, AlertCircle, Info, Printer
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Dummy data submitted by Mitra
const orderData = {
  id: "OR-1045",
  customer: "Bapak Ahmad Santoso",
  projectName: "Box Serum Glowing 20ml",
  whatsapp: "+62 812 3456 7890",
  dimensions: "40 x 40 x 120 mm",
  quantity: 2000,
  material: "Ivory 300gr",
  finishing: "Laminasi Glossy",
  mounting: "Tanpa Mounting",
  estimatedPrice: 2850000, // Mitra's view
  shippingAddress: "Jl. Industri Raya Blok C2, Cikarang",
  deadline: "March 20, 2026",
  orderStatus: "waiting_approval",
  createdAt: "March 13, 2026",
  designUrl: "design-serum-v2.pdf",
  affiliateCode: "AMBRA001",
}

import { useRole } from "@/lib/contexts/RoleContext"

export default function OrderApprovalPage() {
  const { role } = useRole()
  const adminMode = role === "owner"
  // ... (calc states)
  const [adminCalc, setAdminCalc] = React.useState({
     jumlahUp: 10,
     waste: 50,
     hargaPlano: 5500,
     biayaPlat: 300000,
     ongkosDruk: 400000,
     biayaPisau: 150000,
     ongkosFinishing: 400000, // Pond, Lipat, Lem
     margin: 30, // Percentage
  })

  // Simulated Payment History
  const [payments, setPayments] = React.useState([
    { id: 1, amount: 1500000, date: "March 14, 2026", method: "Transfer BCA", note: "DP 50%" },
  ])

  const [newPayment, setNewPayment] = React.useState({ amount: 0, method: "Transfer", note: "" })

  const addPayment = () => {
    if (newPayment.amount <= 0) return
    setPayments([...payments, { 
      id: Date.now(), 
      amount: newPayment.amount, 
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      method: newPayment.method,
      note: newPayment.note
    }])
    setNewPayment({ amount: 0, method: "Transfer", note: "" })
  }

  const updateCalc = (field: string, value: number) => {
    setAdminCalc(prev => ({ ...prev, [field]: value }))
  }

  // --- INDUSTRIAL OFFSET CALCULATION ALGORITHM ---
  // 1. Kertas
  const lembarNeto = Math.ceil(orderData.quantity / adminCalc.jumlahUp)
  const lembarBruto = lembarNeto + adminCalc.waste
  const totalKertas = lembarBruto * adminCalc.hargaPlano
  
  // 2. Harga Modal (HPP)
  const hpp = totalKertas + adminCalc.biayaPlat + adminCalc.biayaPisau + adminCalc.ongkosDruk + adminCalc.ongkosFinishing
  
  // 3. Harga Jual & Profit
  const profitNominal = Math.round(hpp * (adminCalc.margin / 100))
  const hargaJualTotal = hpp + profitNominal
  const hargaPerPcs = Math.round(hargaJualTotal / orderData.quantity)

  // Payment Calculation
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
  const remainingBalance = hargaJualTotal - totalPaid

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-slate-200 shadow-sm" asChild>
            <Link href="/orders"><ArrowLeft className="w-5 h-5 text-slate-600" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{orderData.id}</h1>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase tracking-widest flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Waiting Admin Approval
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mt-1">
              Order by <strong className="text-slate-700">{orderData.customer}</strong>
              <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-black border border-blue-100">{orderData.affiliateCode}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
              {orderData.createdAt}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 border-slate-200 gap-2 text-slate-700 font-bold hover:bg-slate-50">
            <Download className="w-4 h-4" /> File Desain
          </Button>
          <Button className="h-12 gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 shadow-lg shadow-emerald-500/20 font-bold">
            <MessageCircle className="w-4 h-4" /> Hubungi Mitra
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Data & Admin Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Info Mitra Card */}
          <Card className="border-0 shadow-sm border border-slate-100 bg-white">
            <div className="h-1.5 w-full bg-slate-200" />
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Box className="w-5 h-5 text-slate-400" /> Spesifikasi Mitra
                </CardTitle>
                <CardDescription>Data mentah yang diinput oleh Mitra/Sales lapangan</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Estimasi Mitra</p>
                <p className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">Rp {orderData.estimatedPrice.toLocaleString("id-ID")}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100/50">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Project</p>
                  <p className="text-sm font-bold text-slate-900">{orderData.projectName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Dimensi (mm)</p>
                  <p className="text-sm font-bold text-slate-900">{orderData.dimensions}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Kuantitas</p>
                  <p className="text-sm font-bold text-violet-700">{orderData.quantity.toLocaleString("id-ID")} Pcs</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Deadline</p>
                  <p className="text-sm font-bold text-rose-600">{orderData.deadline}</p>
                </div>
                <div className="space-y-1 pt-2">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Bahan Kertas</p>
                  <p className="text-sm font-bold text-slate-900">{orderData.material}</p>
                </div>
                <div className="space-y-1 pt-2">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Laminasi</p>
                  <p className="text-sm font-bold text-slate-900">{orderData.finishing}</p>
                </div>
                <div className="space-y-1 pt-2 col-span-2">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Catatan Produksi Khusus</p>
                  <p className="text-sm font-medium text-slate-700">{orderData.mounting}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kalkulator Admin Card */}
          <Card className="border-0 shadow-lg shadow-violet-500/10 border border-violet-100 bg-white overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
            <CardHeader className="bg-violet-50/50 pb-6 border-b border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2 text-violet-900 font-extrabold">
                    <Calculator className="w-5 h-5 text-violet-600" /> Kalkulasi Harga Admin (HPP)
                  </CardTitle>
                  <CardDescription className="text-violet-700/70 font-medium">
                    Sesuaikan tata letak cetak (Imposisi) dan variabel biaya lainnya
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              {/* Group 1: Material & Layout */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4" /> 1. Imposisi & Bahan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 relative">
                    <Label className="font-semibold text-slate-700">Jumlah Kemasan / Muka (Up)</Label>
                    <Input 
                      type="number" 
                      className="h-12 text-lg font-bold border-slate-300 focus:border-violet-500"
                      value={adminCalc.jumlahUp}
                      onChange={(e) => updateCalc("jumlahUp", parseInt(e.target.value) || 0)}
                    />
                    <p className="text-[10px] text-slate-500">Box muat dalam 1 plano</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700">Waste Inschiet</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        className="h-12 border-slate-300 pr-16"
                        value={adminCalc.waste}
                        onChange={(e) => updateCalc("waste", parseInt(e.target.value) || 0)}
                      />
                      <span className="absolute right-4 top-3.5 text-slate-400 font-medium text-sm">Lembar</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700">Estimasi Kertas Dibutuhkan</Label>
                    <div className="h-12 bg-slate-100 border border-slate-200 rounded-md flex items-center px-4 font-bold text-slate-800">
                      {lembarBruto} Lembar
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label className="font-semibold text-slate-700">Harga Per Lembar Plano (Rp)</Label>
                    <Input 
                      type="number" 
                      step="100"
                      className="h-12 border-slate-300 text-lg"
                      value={adminCalc.hargaPlano}
                      onChange={(e) => updateCalc("hargaPlano", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Biaya Cetak Tetap */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Printer className="w-4 h-4" /> 2. Biaya Produksi (Fixed & Variable)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700">Biaya Plat CTP (CMYK)</Label>
                    <Input 
                      type="number" 
                      className="h-12 border-slate-300"
                      value={adminCalc.biayaPlat}
                      onChange={(e) => updateCalc("biayaPlat", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700">Ongkos Cetak Dasar (Min. Druk)</Label>
                    <Input 
                      type="number" 
                      className="h-12 border-slate-300"
                      value={adminCalc.ongkosDruk}
                      onChange={(e) => updateCalc("ongkosDruk", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700 flex justify-between">
                      Biaya Pisau Pond Baru <span className="text-xs text-emerald-600 bg-emerald-50 px-2 rounded">Isi 0 jika pakai pisau stok</span>
                    </Label>
                    <Input 
                      type="number" 
                      className="h-12 border-slate-300"
                      value={adminCalc.biayaPisau}
                      onChange={(e) => updateCalc("biayaPisau", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-slate-700">Jasa Finishing Total (Laminasi, Lem)</Label>
                    <Input 
                      type="number" 
                      className="h-12 border-slate-300"
                      value={adminCalc.ongkosFinishing}
                      onChange={(e) => updateCalc("ongkosFinishing", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Payment Tracking Card */}
          <Card className="border-0 shadow-sm border border-slate-100 bg-white">
            <div className="h-1.5 w-full bg-emerald-500" />
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2 text-emerald-900 font-bold">
                  <CreditCard className="w-5 h-5 text-emerald-500" /> Riwayat Pembayaran (DP & Cicilan)
                </CardTitle>
                <CardDescription>Catat setiap pembayaran yang masuk dari customer</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment History List */}
              <div className="space-y-3">
                {payments.map((p) => (
                  <div key={p.id} className="flex justify-between items-center p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-50">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Rp {p.amount.toLocaleString("id-ID")}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-medium tracking-wider">{p.date} • {p.method}</p>
                      </div>
                    </div>
                    {p.note && <span className="text-xs text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-100 font-medium">{p.note}</span>}
                  </div>
                ))}
              </div>

              {/* Add Payment Form */}
              <div className="p-6 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30 space-y-4">
                <h4 className="text-sm font-bold text-slate-700">Input Pembayaran Baru</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah (Rp)</Label>
                    <Input 
                      type="number" 
                      className="bg-white h-10" 
                      placeholder="Contoh: 500000"
                      value={newPayment.amount || ""}
                      onChange={(e) => setNewPayment({...newPayment, amount: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metode</Label>
                    <select 
                      className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      value={newPayment.method}
                      onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                    >
                      <option>Transfer BCA</option>
                      <option>Transfer Mandiri</option>
                      <option>Cash / Tunai</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keterangan</Label>
                    <Input 
                      className="bg-white h-10" 
                      placeholder="Misal: Cicilan 2"
                      value={newPayment.note}
                      onChange={(e) => setNewPayment({...newPayment, note: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  onClick={addPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-600/20"
                >
                  Simpan Pembayaran
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Pricing Engine & Action sticky */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-0 shadow-2xl bg-slate-900 border border-slate-800 text-white overflow-hidden sticky top-6 rounded-3xl">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <TrendingUp className="w-40 h-40 -mt-10 -mr-10" />
            </div>
            
            <CardHeader className="pb-4 border-b border-slate-800 relative">
              <CardTitle className="text-lg font-bold text-slate-300 flex items-center justify-between">
                Pricing Engine
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-full border border-slate-700 uppercase tracking-widest">
                  Live Sync
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 relative space-y-6">
              {/* HPP Breakdown */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Breakdown Modal (HPP)</p>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span>Kertas ({lembarBruto} lbr)</span>
                    <span className="text-slate-300 font-medium">Rp {totalKertas.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span>Cetak & Plat</span>
                    <span className="text-slate-300 font-medium">Rp {(adminCalc.biayaPlat + adminCalc.ongkosDruk).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span>Pisau & Finishing</span>
                    <span className="text-slate-300 font-medium">Rp {(adminCalc.biayaPisau + adminCalc.ongkosFinishing).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="font-bold text-white">Subtotal Modal</span>
                    <span className="font-bold text-white">Rp {hpp.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

              {/* Profit Margin Setting */}
              <div className="bg-violet-950/30 border border-violet-900/50 rounded-xl p-4">
                <Label className="text-xs font-bold text-violet-300 uppercase tracking-widest block mb-2">Mark-up / Margin Profit</Label>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" 
                    className="h-10 bg-slate-900 border-violet-800 text-white font-bold text-right"
                    value={adminCalc.margin}
                    onChange={(e) => updateCalc("margin", parseInt(e.target.value) || 0)}
                  />
                  <span className="text-xl text-violet-400 font-bold">%</span>
                </div>
                <p className="text-xs text-violet-400 mt-2 text-right">Profit: Rp {profitNominal.toLocaleString("id-ID")}</p>
              </div>

              {/* Final Price Block */}
              <div className="pt-4">
                <p className="text-sm font-medium text-slate-400 mb-1">Final Price untuk Mitra</p>
                <p className="text-5xl font-extrabold text-white tracking-tighter">
                  <span className="text-2xl mr-1 text-slate-500 font-medium">Rp</span>
                  {hargaPerPcs.toLocaleString("id-ID")}
                </p>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-xs text-slate-500">Harga Per Kotak</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Total Invoice</p>
                    <p className="text-lg font-bold text-emerald-400">Rp {hargaJualTotal.toLocaleString("id-ID")}</p>
                  </div>
                </div>
              </div>

              {/* Payment Status Summary */}
              <div className="pt-6 border-t border-slate-800 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Dibayar</span>
                  <span className="text-emerald-400 font-bold">Rp {totalPaid.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none mb-1">Sisa Tagihan</p>
                    <p className={cn(
                      "text-xl font-black tracking-tight",
                      remainingBalance <= 0 ? "text-emerald-400" : "text-amber-400"
                    )}>
                      Rp {remainingBalance.toLocaleString("id-ID")}
                    </p>
                  </div>
                  {remainingBalance <= 0 && (
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded uppercase border border-emerald-500/20">Lunas</span>
                  )}
                </div>
              </div>

              {hargaJualTotal > orderData.estimatedPrice && (
                <div className="flex items-start gap-2 bg-rose-950/30 text-rose-400 p-3 rounded-lg border border-rose-900/50 mt-4 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>Harga final lebih TINGGI dari estimasi awal Mitra. Tambahkan catatan jika diperlukan.</p>
                </div>
              )}

              {hargaJualTotal <= orderData.estimatedPrice && (
                <div className="flex items-start gap-2 bg-emerald-950/30 text-emerald-400 p-3 rounded-lg border border-emerald-900/50 mt-4 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>Harga aman. Nilai di bawah atau sama dengan estimasi sistem Mitra.</p>
                </div>
              )}

              <Button 
                onClick={() => window.open(`/invoice/${orderData.id}`, '_blank')}
                className="w-full h-14 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-violet-600/25 transition-all mt-6 border-0"
              >
                Terbitkan Invoice & Approve
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

