"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Upload, Truck, Calendar, CreditCard, CheckCircle2, Ruler, Box, Sparkles, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function SmartOrderForm() {
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    projectName: "",
    whatsapp: "",
    length: 0,
    width: 0,
    height: 0,
    quantity: 1000,
    material: "ivory-250",
    finishing: "laminasi-glossy",
    mounting: "none",
    address: "",
    deadline: ""
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Pre-calculated logic for Offset (Mockup for Mitra)
  const calculateEstimate = () => {
    if (formData.quantity < 1000) return 0
    // Very simplified formula for UI feedback
    const basePrice = 1250 // Base for standard size
    const sizeFactor = (formData.length * formData.width * formData.height) / 100000
    const matFactor = formData.material === "ivory-300" ? 1.2 : 1.0
    
    // Mounting Cost Logic
    let mountingCost = 0
    if (formData.mounting === "e-flute") mountingCost = 1500
    if (formData.mounting === "yellow-board") mountingCost = 5000

    // Scale price down as quantity increases
    const scale = formData.quantity >= 5000 ? 0.7 : formData.quantity >= 2000 ? 0.85 : 1.0
    
    return Math.round((basePrice + (sizeFactor * 50) + mountingCost) * matFactor * scale)
  }

  const unitPrice = calculateEstimate()
  const totalPrice = unitPrice * formData.quantity

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Order Kemasan Kosmetik
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Platform khusus cetak box offset standard industri.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div 
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-sm",
                  step === s ? "border-violet-600 bg-violet-600 text-white font-bold scale-110 shadow-violet-200" : 
                  step > s ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-slate-200 text-slate-400 bg-white"
                )}
              >
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : <span className="text-lg">{s}</span>}
              </div>
              {s < 3 && <div className={cn("w-8 h-0.5 mx-1", step > s ? "bg-emerald-500" : "bg-slate-200")} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-violet-500 to-blue-500" />
              <CardHeader className="pt-8">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-violet-100 rounded-lg">
                    <Box className="w-6 h-6 text-violet-600" />
                  </div>
                  Spesifikasi Produk
                </CardTitle>
                <CardDescription className="text-base italic px-2 border-l-4 border-violet-200">
                  Pastikan ukuran dalam milimeter (mm) untuk akurasi pisau pond.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-sm font-semibold uppercase tracking-wider text-slate-500">Nama Project / Merk</Label>
                  <Input 
                    id="projectName" 
                    placeholder="Contoh: Box Serum Glowing 20ml" 
                    className="h-12 text-lg border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                    value={formData.projectName}
                    onChange={(e) => updateFormData("projectName", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-500">P (Panjang) mm</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        placeholder="0"
                        className="h-12 pl-10 border-slate-200"
                        value={formData.length || ""}
                        onChange={(e) => updateFormData("length", parseInt(e.target.value) || 0)}
                      />
                      <Ruler className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-500">L (Lebar) mm</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        placeholder="0"
                        className="h-12 pl-10 border-slate-200"
                        value={formData.width || ""}
                        onChange={(e) => updateFormData("width", parseInt(e.target.value) || 0)}
                      />
                      <Ruler className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-500">T (Tinggi) mm</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        placeholder="0"
                        className="h-12 pl-10 border-slate-200"
                        value={formData.height || ""}
                        onChange={(e) => updateFormData("height", parseInt(e.target.value) || 0)}
                      />
                      <Ruler className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-sm font-semibold text-slate-500">Kuantitas Pesanan (Min. 1.000)</Label>
                  <Input 
                    type="number" 
                    min="1000" 
                    step="500"
                    className="h-12 text-lg border-slate-200 font-bold text-violet-700"
                    value={formData.quantity}
                    onChange={(e) => updateFormData("quantity", Math.max(0, parseInt(e.target.value) || 0))}
                  />
                  {formData.quantity > 0 && formData.quantity < 1000 && (
                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                      <Info className="w-3 h-3" /> Minimum order offset adalah 1.000 pcs
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-0 shadow-xl shadow-slate-200/50 animate-in slide-in-from-right-8 duration-500 overflow-hidden">
               <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <CardHeader className="pt-8">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  Material & Finishing
                </CardTitle>
                <CardDescription>Pilih jenis kertas dan lapisan pelindung.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-500 uppercase">Jenis Bahan</Label>
                    <Select value={formData.material} onValueChange={(v) => updateFormData("material", v)}>
                      <SelectTrigger className="h-12 border-slate-200 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ivory-250">Ivory 250gr (Standard Putih)</SelectItem>
                        <SelectItem value="ivory-300">Ivory 300gr (Tebal Putih)</SelectItem>
                        <SelectItem value="duplex-310">Duplex 310gr (Ekonomis - Abu Belakang)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-500 uppercase">Finishing (Laminasi)</Label>
                    <Select value={formData.finishing} onValueChange={(v) => updateFormData("finishing", v)}>
                      <SelectTrigger className="h-12 border-slate-200 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laminasi-glossy">Laminasi Glossy (Mengkilap)</SelectItem>
                        <SelectItem value="laminasi-doff">Laminasi Doff (Matte/Eksklusif)</SelectItem>
                        <SelectItem value="tanpa-laminasi">Tanpa Laminasi (Raw)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 pt-2 pb-2">
                  <Label className="text-sm font-semibold text-slate-500 uppercase flex items-center gap-2">
                    Mounting (Tempel Bahan Tebal) <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-400 font-normal">Opsional</span>
                  </Label>
                  <Select value={formData.mounting} onValueChange={(v) => updateFormData("mounting", v)}>
                    <SelectTrigger className="h-12 border-slate-200 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tanpa Mounting (Langsung Kertas)</SelectItem>
                      <SelectItem value="e-flute">Mounting ke E-Flute (Kardus Box)</SelectItem>
                      <SelectItem value="yellow-board">Mounting ke Yellow Board (Hardbox Rigid)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[11px] text-muted-foreground">
                    Gunakan **E-Flute** untuk box yang butuh kekuatan (kardus), atau **Yellow Board** untuk kotak mewah yang keras.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-500 uppercase">Upload Desain (Opsional untuk Estimasi)</Label>
                  <label className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-violet-50 hover:border-violet-300 transition-all border-slate-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-violet-600" />
                      </div>
                      <p className="mb-2 text-sm text-slate-600"><span className="font-semibold">Klik untuk upload</span> atau seret file</p>
                      <p className="text-xs text-slate-400">PDF, AI, PSD (Maks. 50MB)</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-0 shadow-xl shadow-slate-200/50 animate-in slide-in-from-right-8 duration-500 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500" />
              <CardHeader className="pt-8 text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <CardTitle className="text-3xl font-bold">Review Pesanan</CardTitle>
                <CardDescription className="text-lg">Silakan periksa kembali detail pesanan Anda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Bahan & Ukuran</span>
                    <span className="text-slate-900 font-bold uppercase">{formData.material} | {formData.length}x{formData.width}x{formData.height}mm</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Kuantitas</span>
                    <span className="text-slate-900 font-bold">{formData.quantity.toLocaleString("id-ID")} Pcs</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Finishing</span>
                    <span className="text-slate-900 font-bold capitalize">{formData.finishing.replace("-", " ")}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Mounting</span>
                    <span className="text-slate-900 font-bold capitalize">{formData.mounting.replace("-", " ")}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-500 uppercase">Alamat Pengiriman</Label>
                  <Input 
                    placeholder="Masukkan alamat lengkap pengiriman" 
                    className="h-12 border-slate-200"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between mt-10">
            <Button 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="h-12 px-8 bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold border-0 shadow-sm transition-all disabled:opacity-50 disabled:grayscale"
            >
              Kembali
            </Button>
            {step < 3 ? (
              <Button 
                onClick={() => setStep(s => s + 1)}
                disabled={step === 1 && (!formData.projectName || formData.quantity < 1000)}
                className="h-12 px-10 bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-200 transition-all active:scale-95"
              >
                Lanjut ke {step === 1 ? 'Material' : 'Finalisasi'}
              </Button>
            ) : (
              <Button className="h-12 px-10 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-violet-200 transition-all active:scale-95">
                Kirim untuk Approval Admin
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-0 shadow-2xl rounded-3xl overflow-hidden sticky top-6">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CreditCard className="w-24 h-24 rotate-12" />
            </div>
            <CardHeader className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 border border-violet-500/30">
                <Box className="w-3 h-3" /> Preliminary Estimate
              </div>
              <CardTitle className="text-xl font-medium opacity-80">Estimasi Awal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              <div className="space-y-1">
                <p className="text-5xl font-extrabold tracking-tighter">
                  <span className="text-2xl font-medium opacity-60 mr-1">Rp</span>
                  {calculateEstimate() === 0 ? "0" : calculateEstimate().toLocaleString("id-ID")}
                </p>
                <p className="text-white/40 text-sm italic">per pcs (Estimasi Mitra)</p>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Total Estimasi</span>
                  <span className="text-lg font-bold">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl space-y-2">
                  <div className="flex items-start gap-3">
                    <Info className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-amber-200 text-xs font-bold uppercase">Menunggu Approval</p>
                      <p className="text-white/70 text-[11px] leading-relaxed mt-1">
                        Harga final akan ditentukan Admin Ambra setelah hitungan <b>Jumlah Up</b> & <b>Waste</b> dikoreksi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-[10px] text-white/50 font-medium uppercase tracking-widest">Pricing logic: Industrial Offset</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Truck className="w-4 h-4 text-violet-500" /> Pengiriman & Waktu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Produksi (Est)</span>
                  <span className="font-bold text-slate-900">7-14 Hari Kerja</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Status Awal</span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px] font-bold">WAITING APPROVAL</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
