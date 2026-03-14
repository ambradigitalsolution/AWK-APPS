"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Printer, Mail, Phone, MapPin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

// In a real app, you would fetch this based on params.orderId
const orderData = {
  id: "OR-1045",
  customer: "Mitra Ahmad",
  projectName: "Box Serum Glowing 20ml",
  whatsapp: "+62 812 3456 7890",
  dimensions: "40 x 40 x 120 mm",
  quantity: 2000,
  material: "Ivory 300gr",
  finishing: "Laminasi Glossy",
  totalAmount: 3705000, // Calculated from HPP + Margin in the other page
  invoiceDate: "March 14, 2026",
  dueDate: "March 21, 2026",
  status: "LUNAS",
}

export default function InvoicePage() {
  const params = useParams()
  const orderId = params.orderId as string

  React.useEffect(() => {
    // Auto trigger print after a short delay to ensure styles are loaded
    const timer = setTimeout(() => {
      window.print()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white p-0 sm:p-8 md:p-12 print:p-0">
      <div className="max-w-4xl mx-auto border sm:border-slate-200 shadow-none sm:shadow-2xl rounded-none sm:rounded-3xl overflow-hidden print:border-0 print:shadow-none">
        
        {/* Header - Gradient Top */}
        <div className="bg-gradient-to-r from-slate-900 via-violet-950 to-slate-900 text-white p-8 sm:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <div className="w-6 h-6 bg-gradient-to-br from-violet-400 to-blue-500 rounded-md" />
                </div>
                <h1 className="text-2xl font-black tracking-tight uppercase">AMBRA <span className="text-violet-400 font-light">DIGITAL</span></h1>
              </div>
              <p className="text-slate-400 text-xs font-semibold tracking-[0.2em] uppercase">Premium Packaging Solutions</p>
            </div>
            <div className="text-left md:text-right space-y-1">
              <h2 className="text-4xl font-extrabold tracking-tighter uppercase text-white/90">INVOICE</h2>
              <p className="text-violet-300 font-mono text-lg">{orderId || orderData.id}</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 space-y-12 bg-white">
          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Diberikan Kepada:</h3>
              <div className="space-y-1">
                <p className="text-xl font-bold text-slate-900">{orderData.customer}</p>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-violet-500" /> {orderData.whatsapp}
                </p>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-violet-500" /> Jl. Industri Utama No. 45, Jakarta
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Detail Transaksi:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Tanggal</p>
                  <p className="text-sm font-bold text-slate-700">{orderData.invoiceDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Jatuh Tempo</p>
                  <p className="text-sm font-bold text-slate-700">{orderData.dueDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Status</p>
                  <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-widest">
                    {orderData.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Metode</p>
                  <p className="text-sm font-bold text-slate-700">Bank Transfer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100">
                  <th className="px-6 py-4">Deskripsi Produk & Spesifikasi</th>
                  <th className="px-6 py-4 text-center">Qty</th>
                  <th className="px-6 py-4 text-right">Harga Unit</th>
                  <th className="px-6 py-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="px-6 py-8">
                    <p className="font-bold text-slate-900 mb-1">{orderData.projectName}</p>
                    <div className="space-y-1 text-xs text-slate-500 font-medium">
                      <p>• Bahan: {orderData.material}</p>
                      <p>• Dimensi: {orderData.dimensions}</p>
                      <p>• Finishing: {orderData.finishing}</p>
                    </div>
                  </td>
                  <td className="px-6 py-8 text-center align-top font-bold text-slate-700">
                    {orderData.quantity.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-8 text-right align-top font-bold text-slate-700">
                    Rp {(orderData.totalAmount / orderData.quantity).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-8 text-right align-top font-black text-slate-900">
                    Rp {orderData.totalAmount.toLocaleString("id-ID")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="flex-1 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Informasi Pembayaran</h4>
                <div className="space-y-1 text-sm font-medium text-slate-600">
                  <p className="text-slate-900 font-bold">Bank Central Asia (BCA)</p>
                  <p>No. Rekening: <span className="font-mono text-violet-600 font-bold tracking-wider">852-526-7788</span></p>
                  <p>Atas Nama: <span className="font-bold">PT AMBRA WARNA KEMASAN</span></p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                * Harap lampirkan bukti transfer via WhatsApp setelah melakukan pembayaran.
              </p>
            </div>
            <div className="w-full md:w-64 space-y-3">
              <div className="flex justify-between text-sm text-slate-500 font-medium">
                <span>Subtotal</span>
                <span>Rp {orderData.totalAmount.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 font-medium pb-3 border-b border-slate-100">
                <span>Pajak (PPN 0%)</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-black uppercase tracking-widest text-slate-900">Total Tagihan</span>
                <span className="text-2xl font-black text-violet-600 tracking-tighter">Rp {orderData.totalAmount.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Authorized Signature</p>
              <div className="h-16 w-32 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-[10px] font-bold uppercase tracking-tighter">
                E-STAMP AMBRA
              </div>
              <p className="text-xs font-bold text-slate-700">Finance Department</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-center">
                  <Globe className="w-4 h-4 text-slate-300 mx-auto mb-1" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">www.ambra.app</p>
               </div>
               <div className="text-center">
                  <Mail className="w-4 h-4 text-slate-300 mx-auto mb-1" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">hello@ambra.app</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Hint (Hidden on Print) */}
      <div className="fixed bottom-8 right-8 flex gap-3 print:hidden">
        <Button 
          onClick={() => window.print()}
          className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 font-bold gap-2"
        >
          <Printer className="w-4 h-4" />
          Print Invoice
        </Button>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 15mm;
            size: auto;
          }
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /* Prevent items from being split across pages */
          tr, td {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          /* Ensure table headers repeat correctly but rows don't break */
          thead {
            display: table-header-group;
          }
          /* Fix overflow issues that cause clipping */
          .overflow-hidden, 
          div[class*="rounded-"], 
          div[class*="border"] {
            overflow: visible !important;
            height: auto !important;
          }
          /* Keep the card-like structure but ensure it can flow */
          .max-w-4xl {
            max-width: 100% !important;
            width: 100% !important;
            border: none !important;
            box-shadow: none !important;
          }
          /* Hide the print button and other UI elements */
          .print-hidden {
            display: none !important;
          }
          /* Ensure text colors are preserved */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  )
}
