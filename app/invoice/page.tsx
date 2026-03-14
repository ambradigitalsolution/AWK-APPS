"use client"

import * as React from "react"
import { useParams } from "next/navigation"

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
  invoiceDate: "14/08/2020",
  dueDate: "21/08/2020",
  status: "LUNAS",
  companyName: "PT Ambra Warna Kemasan",
  companyAddress: "Jl. Raya Industri No. 12, Bekasi, Jawa Barat",
}

export default function InvoicePage() {
  const params = useParams()
  const orderId = params.orderId as string

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 print:py-0 print:bg-white font-sans text-slate-800">
      
      {/* Invoice Container */}
      <div className="relative w-full max-w-[850px] bg-white shadow-2xl overflow-hidden print:shadow-none print:max-w-full p-12 md:p-16 min-h-[1100px] flex flex-col">
        
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
        <div className="flex justify-between items-start pt-8 pb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                AM
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">AMBRA</h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{orderData.companyName}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
             <h2 className="text-5xl font-bold text-slate-800 tracking-tight mb-4">INVOICE</h2>
             <table className="ml-auto text-sm">
               <tbody>
                 <tr>
                   <td className="pr-6 py-0.5 text-slate-500 font-medium">Invoice</td>
                   <td className="py-0.5 font-bold text-slate-800">{orderId || orderData.id}</td>
                 </tr>
                 <tr>
                   <td className="pr-6 py-0.5 text-slate-500 font-medium">Tanggal</td>
                   <td className="py-0.5 font-bold text-slate-800">{orderData.invoiceDate}</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 font-bold w-12 text-center text-slate-400">No.</th>
                <th className="py-4 font-bold">Produk</th>
                <th className="py-4 font-bold text-right">Kuantitas</th>
                <th className="py-4 font-bold text-right">Harga</th>
                <th className="py-4 font-bold text-right">Pajak</th>
                <th className="py-4 font-bold text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-100">
                <td className="py-6 align-top text-center text-slate-400">1</td>
                <td className="py-6 align-top">
                  <p className="font-bold text-slate-900 mb-1">{orderData.projectName}</p>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
                    {orderData.material} • {orderData.dimensions} • {orderData.finishing}
                  </p>
                </td>
                <td className="py-6 align-top text-right font-medium">{orderData.quantity.toLocaleString("id-ID")}</td>
                <td className="py-6 align-top text-right font-medium">{(orderData.totalAmount / orderData.quantity).toLocaleString("id-ID")}</td>
                <td className="py-6 align-top text-right text-slate-300">PPN 0%</td>
                <td className="py-6 align-top text-right font-bold text-slate-900">Rp {orderData.totalAmount.toLocaleString("id-ID")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Info & Summary */}
        <div className="grid grid-cols-2 gap-20 pt-16 mt-auto">
          {/* Left Column */}
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4">Tagihan Kepada</h3>
              <div className="text-xs space-y-1.5 text-slate-600 font-medium pb-4">
                <p className="text-sm font-bold text-slate-900 mb-1">{orderData.customer}</p>
                <p>{orderData.address}</p>
                <p>Telp: {orderData.whatsapp}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Pesan</h3>
              <p className="text-xs text-slate-500 leading-relaxed border-b-2 border-slate-900/80 pb-2 inline-block">
                Silahkan transfer ke rekening:<br/>
                852-526-7788 BCA a/n PT AMBRA
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-700">Rp {orderData.totalAmount.toLocaleString("id-ID")}</span>
               </div>
               <div className="flex justify-between text-xs font-medium text-slate-500 pt-1">
                  <span>Pajak (0%)</span>
                  <span className="font-bold text-slate-700">Rp 0</span>
               </div>
               <div className="flex justify-between text-sm font-bold text-slate-900 pt-4 border-t border-slate-200 mt-2">
                  <span>Total</span>
                  <span className="text-lg">Rp {orderData.totalAmount.toLocaleString("id-ID")}</span>
               </div>
               <div className="flex justify-between text-xs font-medium text-slate-600 pt-1 italic">
                  <span>Pembayaran Diterima</span>
                  <span>Rp {orderData.totalAmount.toLocaleString("id-ID")}</span>
               </div>
               <div className="flex justify-between text-xs font-bold text-blue-600 pt-2 border-t border-slate-100">
                  <span>Sisa Tagihan</span>
                  <span>Rp 0</span>
               </div>
            </div>

            <div className="text-right pt-4 relative">
              <p className="text-xs font-medium text-slate-600 mb-20">Dengan Hormat,</p>
              <div className="absolute right-8 bottom-12 opacity-80 pointer-events-none">
                {/* Space left for wet signature */}
              </div>
              <p className="text-xs font-bold text-slate-900 border-t border-slate-100 inline-block pt-1 min-w-[120px]">Finance Dept</p>
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
