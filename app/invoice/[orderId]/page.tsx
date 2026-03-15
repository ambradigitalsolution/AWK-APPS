"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/contexts/RoleContext"
import { Package } from "lucide-react"

// Dummy data
const orderData = {
  id: "INV/00104",
  customer: "Bapak Ahmad Santoso",
  projectName: "Box Serum Glowing 20ml",
  whatsapp: "+62 812 3456 7890",
  address: "Jl. Industri Utama No. 45, Jakarta",
  dimensions: "40 x 40 x 120 mm",
  quantity: 2000,
  material: "Ivory 300gr",
  finishing: "Laminasi Glossy",
  totalAmount: 3705000,
  totalPaid: 1500000, // Linking partial payment
  invoiceDate: "14/08/2020",
  dueDate: "21/08/2020",
  status: "LUNAS",
  affiliateCode: "AMBRA001",
  companyName: "PT Ambra Warna Kemasan",
  companyAddress: "Jl. Raya Industri No. 12, Bekasi, Jawa Barat",
}

export default function InvoicePage() {
  const { branding, isLoaded } = useRole()
  const params = useParams()
  const orderId = params.orderId as string
  const [data, setData] = React.useState<typeof orderData | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulating data sync from Mitra's input
    // In production: const { data } = await supabase.from('orders').select('*').eq('id', orderId).single()
    const timer = setTimeout(() => {
      setData({
        ...orderData,
        id: orderId || "INV/00104",
      })
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [orderId])

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">Menghubungkan Data Branding...</p>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 print:py-0 print:bg-white font-sans text-slate-800">
      
      {/* Invoice Container */}
      <div className="relative w-full max-w-[850px] bg-white shadow-2xl overflow-hidden print:shadow-none print:max-w-full p-4 sm:p-8 md:p-16 min-h-[1100px] flex flex-col mx-auto transition-all duration-300">
        
        {/* LUNAS Watermark */}
        {(data.totalAmount - data.totalPaid) <= 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[35deg] border-8 border-emerald-500/20 px-12 py-4 rounded-2xl pointer-events-none z-0">
            <span className="text-8xl font-black text-emerald-500/20 tracking-widest uppercase">LUNAS</span>
          </div>
        )}
        
        {/* Decorative Top-Left Pattern */}
        <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-20 print:opacity-100">
           <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500 fill-current">
              <rect x="0" y="0" width="30" height="30" />
              <rect x="40" y="0" width="20" height="20" />
              <rect x="70" y="10" width="15" height="15" />
              <rect x="10" y="40" width="25" height="25" />
              <rect x="45" y="35" width="40" height="40" />
              <rect x="0" y="80" width="15" height="15" />
              <rect x="95" y="0" width="10" height="10" />
              <rect x="30" y="90" width="10" height="10" />
           </svg>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start pt-8 pb-10 sm:pb-16 gap-8">
          <div className="space-y-4 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              {branding.logo ? (
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-md border border-slate-100 flex-shrink-0">
                  <img src={branding.logo} alt="Logo" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg border border-blue-400/20 flex-shrink-0">
                  <Package className="w-7 h-7" />
                </div>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 leading-none uppercase">
                  {branding.name}
                </h1>
                <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  {branding.name.startsWith("PT") ? branding.name : `PT ${branding.name.toUpperCase()}`}
                </p>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto relative z-10">
             <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 tracking-tight mb-4">INVOICE</h2>
             <table className="sm:ml-auto text-sm">
               <tbody>
                 <tr>
                   <td className="pr-4 sm:pr-6 py-0.5 text-slate-400 font-medium">Invoice</td>
                   <td className="py-0.5 font-bold text-slate-900">{data.id}</td>
                 </tr>
                 <tr>
                   <td className="pr-4 sm:pr-6 py-0.5 text-slate-400 font-medium">Tanggal</td>
                   <td className="py-0.5 font-bold text-slate-900">{data.invoiceDate}</td>
                 </tr>
                 <tr>
                   <td className="pr-4 sm:pr-6 py-0.5 text-slate-400 font-medium">Mitra ID</td>
                   <td className="py-0.5 font-bold text-slate-800">{data.affiliateCode}</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-grow overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[650px] sm:min-w-0">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 font-bold w-12">No.</th>
                <th className="py-4 font-bold">Produk</th>
                <th className="py-4 font-bold text-right">Kuantitas</th>
                <th className="py-4 font-bold text-right">Harga</th>
                <th className="py-4 font-bold text-right hidden sm:table-cell">Pajak</th>
                <th className="py-4 font-bold text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-100">
                <td className="py-6 align-top">1</td>
                <td className="py-6 align-top">
                  <p className="font-bold text-slate-900 mb-1">{data.projectName}</p>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
                    {data.material} • {data.dimensions} • {data.finishing}
                  </p>
                </td>
                <td className="py-6 align-top text-right font-medium whitespace-nowrap">{data.quantity.toLocaleString("id-ID")}</td>
                <td className="py-6 align-top text-right font-medium whitespace-nowrap">{(data.totalAmount / data.quantity).toLocaleString("id-ID")}</td>
                <td className="py-6 align-top text-right text-slate-400 hidden sm:table-cell">0%</td>
                <td className="py-6 align-top text-right font-bold text-slate-900 whitespace-nowrap">Rp {data.totalAmount.toLocaleString("id-ID")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Info & Summary */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-20 pt-16 mt-auto relative z-10">
          {/* Left Column */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Tagihan Kepada</h3>
              <div className="text-xs space-y-1.5 text-slate-600 font-medium">
                <p className="text-sm font-bold text-slate-900 mb-1">{data.customer}</p>
                <p>{data.address}</p>
                <p>Telp: {data.whatsapp}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Metode Pembayaran</h3>
              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Silahkan transfer ke rekening:<br/>
                  <strong className="text-slate-900">{branding.bankAccount}</strong><br/>
                  {branding.bankName} a/n {branding.bankOwner}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-3 bg-slate-50/30 p-4 sm:p-6 rounded-2xl border border-slate-100">
               <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Subtotal</span>
                  <span>Rp {data.totalAmount.toLocaleString("id-ID")}</span>
               </div>
               <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Pajak (0%)</span>
                  <span>Rp 0</span>
               </div>
               <div className="flex justify-between text-sm font-bold text-slate-900 pt-4 border-t border-slate-200 mt-2">
                  <span>Total Tagihan</span>
                  <span className="text-lg">Rp {data.totalAmount.toLocaleString("id-ID")}</span>
               </div>
               <div className="flex justify-between text-xs font-medium text-slate-600 pt-2 italic">
                  <span>Total Dibayar</span>
                  <span>Rp {data.totalPaid.toLocaleString("id-ID")}</span>
               </div>
               <div className={cn(
                 "flex justify-between text-base font-black pt-3 mt-2 border-t border-slate-200 w-full",
                 (data.totalAmount - data.totalPaid) <= 0 ? "text-emerald-600" : "text-blue-600"
               )}>
                  <span>Sisa Tagihan</span>
                  <span className="text-xl">Rp {(data.totalAmount - data.totalPaid).toLocaleString("id-ID")}</span>
               </div>
            </div>

            <div className="text-left md:text-right pt-4 relative">
              <p className="text-xs font-medium text-slate-600 mb-16 md:mb-20">Dengan Hormat,</p>
              <div className="absolute right-0 bottom-12 opacity-50 pointer-events-none">
                {/* Space left for signature */}
              </div>
              <p className="text-xs font-bold text-slate-900 border-t border-slate-200 inline-block pt-1 min-w-[160px]">
                {branding.bankOwner || "Finance Dept"}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Bottom-Right Pattern */}
        <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none rotate-180 opacity-20 print:opacity-100">
           <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500 fill-current">
              <rect x="0" y="0" width="30" height="30" />
              <rect x="40" y="0" width="20" height="20" />
              <rect x="70" y="10" width="15" height="15" />
              <rect x="10" y="40" width="25" height="25" />
           </svg>
        </div>

      </div>

      {/* Control Buttons (Hidden on Print) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 print:hidden z-50">
        <button 
          onClick={() => window.close()}
          className="h-12 px-8 bg-rose-50 text-rose-600 font-bold rounded-xl border border-rose-200 shadow-xl hover:bg-rose-100 transition-all active:scale-95"
        >
          Close
        </button>
        <button 
          onClick={() => window.print()}
          className="h-12 px-10 bg-blue-600 text-white font-bold rounded-xl shadow-xl hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          Print Invoice
        </button>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: A4 portrait;
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
           * {
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  )
}
