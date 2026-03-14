"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, MoreHorizontal, Eye, Trash2, Printer } from "lucide-react"
import Link from "next/link"
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

const orders = [
  { id: "OR-1021", customer: "John Doe", product: "Business Cards", quantity: 100, status: "Production", total: "Rp 150.000", date: "2024-03-12", affiliateCode: "AMBRA001" },
  { id: "OR-1022", customer: "Jane Smith", product: "A3 Flyer", quantity: 50, status: "Pending", total: "Rp 275.000", date: "2024-03-11", affiliateCode: "AMBRA001" },
  { id: "OR-1023", customer: "Acme Corp", product: "Vinyl Banner", quantity: 1, status: "Completed", total: "Rp 450.000", date: "2024-03-10", affiliateCode: "AMBRA002" },
  { id: "OR-1024", customer: "Mike Wilson", product: "Stickers", quantity: 500, status: "Shipped", total: "Rp 320.000", date: "2024-03-09", affiliateCode: "AMBRA003" },
  { id: "OR-1025", customer: "Sarah Brown", product: "Booklets", quantity: 20, status: "Design Review", total: "Rp 1.250.000", date: "2024-03-08", affiliateCode: "AMBRA001" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending": return "bg-yellow-100 text-yellow-800"
    case "Production": return "bg-blue-100 text-blue-800"
    case "Completed": return "bg-green-100 text-green-800"
    case "Shipped": return "bg-purple-100 text-purple-800"
    case "Design Review": return "bg-orange-100 text-orange-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export default function OrdersListPage() {
  const [orderList, setOrderList] = React.useState(orders)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [orderToDelete, setOrderToDelete] = React.useState<string | null>(null)

  const handlePrint = (orderId: string) => {
    window.open(`/invoice/${orderId}`, '_blank')
  }

  const handleDelete = () => {
    if (orderToDelete) {
      setOrderList(prev => prev.filter(order => order.id !== orderToDelete))
      setIsDeleteDialogOpen(false)
      setOrderToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track all customer print orders.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-xl shadow-lg shadow-blue-600/20">
          <Link href="/orders/new">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Link>
        </Button>
      </div>

      <Card className="border-0 shadow-sm border border-slate-100 bg-white rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 pb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input className="pl-10 h-11 border-slate-200 focus:ring-blue-500/20 rounded-xl" placeholder="Search orders, customers, affiliate code..." />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-11 rounded-xl px-4 font-bold border-slate-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="h-11 rounded-xl px-4 font-bold border-slate-200">
                Date Range
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 font-black">
                  <th className="px-6 py-5 font-bold">Order ID</th>
                  <th className="px-6 py-5 font-bold">Customer</th>
                  <th className="px-6 py-5 font-bold">Product</th>
                  <th className="px-6 py-5 font-bold">Status</th>
                  <th className="px-6 py-5 font-bold">Affiliate</th>
                  <th className="px-6 py-5 font-bold">Total</th>
                  <th className="px-6 py-5 font-bold">Date</th>
                  <th className="px-6 py-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orderList.map((order) => (
                  <tr key={order.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                    <td className="px-6 py-5 font-bold text-slate-900">{order.id}</td>
                    <td className="px-6 py-5 font-medium text-slate-700">{order.customer}</td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">{order.product}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-medium">{order.quantity} units</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[11px] font-black bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
                        {order.affiliateCode}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-900">{order.total}</td>
                    <td className="px-6 py-5 text-slate-500 font-medium">{order.date}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                          asChild
                        >
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="w-5 h-5" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                          onClick={() => handlePrint(order.id)}
                        >
                          <Printer className="w-5 h-5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                          onClick={() => {
                            setOrderToDelete(order.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-slate-900">Hapus Order?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium pt-2 text-base">
              Apakah Anda yakin ingin menghapus order <span className="text-slate-900 font-bold underline decoration-rose-500/30">{orderToDelete}</span>? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-6">
            <AlertDialogCancel className="rounded-xl border-slate-200 font-bold h-12">Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold h-12 rounded-xl px-8 shadow-lg shadow-rose-600/20"
            >
              Hapus Sekarang
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
