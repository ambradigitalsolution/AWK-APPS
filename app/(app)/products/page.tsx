"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, Plus, MoreHorizontal, Package, Edit, Trash2, 
  Grid3X3, List, Filter, ArrowUpDown, Eye
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/contexts/RoleContext"

const products = [
  { id: "1", name: "Business Cards", description: "Premium quality business cards", basePrice: 50000, category: "Cards", status: "Active", orders: 45, image: "📇" },
  { id: "2", name: "Flyers A4", description: "Full color A4 flyers on art paper", basePrice: 15000, category: "Flyers", status: "Active", orders: 32, image: "📄" },
  { id: "3", name: "Vinyl Banner", description: "Outdoor vinyl banner with eyelets", basePrice: 125000, category: "Banners", status: "Active", orders: 18, image: "🎌" },
  { id: "4", name: "Stickers", description: "Custom die-cut stickers", basePrice: 8000, category: "Stickers", status: "Active", orders: 67, image: "🏷️" },
  { id: "5", name: "Booklets A5", description: "Saddle-stitched A5 booklets", basePrice: 75000, category: "Booklets", status: "Draft", orders: 5, image: "📖" },
  { id: "6", name: "Poster A2", description: "Large format poster printing", basePrice: 45000, category: "Posters", status: "Active", orders: 22, image: "🖼️" },
  { id: "7", name: "Invitation Cards", description: "Elegant invitation card printing", basePrice: 35000, category: "Cards", status: "Active", orders: 15, image: "💌" },
  { id: "8", name: "Canvas Print", description: "Gallery-quality canvas prints", basePrice: 250000, category: "Canvas", status: "Draft", orders: 3, image: "🎨" },
]

const materials = [
  { name: "Art Paper 260gsm", modifier: "+Rp 5.000/pcs" },
  { name: "Ivory 310gsm", modifier: "+Rp 8.000/pcs" },
  { name: "Vinyl Sticker", modifier: "+Rp 3.000/pcs" },
  { name: "Canvas 380gsm", modifier: "+Rp 25.000/pcs" },
]

const finishings = [
  { name: "Matte Lamination", modifier: "+Rp 2.000/pcs" },
  { name: "Glossy Lamination", modifier: "+Rp 2.500/pcs" },
  { name: "Spot UV", modifier: "+Rp 5.000/pcs" },
  { name: "Die-cut", modifier: "+Rp 3.000/pcs" },
]

export default function ProductsPage() {
  const { role } = useRole()
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your print products, materials, and finishing options.</p>
        </div>
        {role === "owner" && (
          <Button className="h-10 gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-md shadow-violet-500/20">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        )}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 animate-fade-in stagger-1">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            className="pl-9 h-10" 
            placeholder="Search products by name or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-10 gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </Button>
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-muted ml-1">
            <button 
              className={cn("p-2 rounded-md transition-colors", viewMode === "grid" ? "bg-white dark:bg-card shadow-sm" : "text-muted-foreground")}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button 
              className={cn("p-2 rounded-md transition-colors", viewMode === "list" ? "bg-white dark:bg-card shadow-sm" : "text-muted-foreground")}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product, i) => (
            <Card key={product.id} className={`border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer animate-fade-in stagger-${Math.min(i + 1, 5)} overflow-hidden`}>
              <div className="aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center text-5xl relative">
                {product.image}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button size="icon" variant="secondary" className="h-7 w-7 rounded-full shadow-md">
                    <Eye className="w-3 h-3" />
                  </Button>
                  {role === "owner" && (
                    <Button size="icon" variant="secondary" className="h-7 w-7 rounded-full shadow-md">
                      <Edit className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <div className="absolute top-3 left-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                    product.status === "Active" 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" 
                      : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                  )}>
                    {product.status}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Rp {product.basePrice.toLocaleString("id-ID")}</span>
                  <span className="text-[10px] text-muted-foreground">{product.orders} orders</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add new product card (Owner Only) */}
          {role === "owner" && (
            <Card className="border-dashed border-2 border-muted-foreground/20 shadow-none hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 cursor-pointer group min-h-[280px] flex items-center justify-center">
              <CardContent className="flex flex-col items-center gap-3 p-6">
                <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6 text-muted-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Add New Product</span>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-muted-foreground">Product</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Base Price</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Orders</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-right p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{product.image}</span>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium">{product.category}</span></td>
                    <td className="p-4 font-semibold">Rp {product.basePrice.toLocaleString("id-ID")}</td>
                    <td className="p-4 text-muted-foreground">{product.orders}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                        product.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                        {role === "owner" && (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Materials & Finishings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Materials</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Available printing materials</p>
            </div>
            {role === "owner" && (
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <Plus className="w-3 h-3" />
                Add
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {materials.map((mat) => (
                <div key={mat.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
                  <span className="text-sm font-medium">{mat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{mat.modifier}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Finishings</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Available finishing options</p>
            </div>
            {role === "owner" && (
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <Plus className="w-3 h-3" />
                Add
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {finishings.map((fin) => (
                <div key={fin.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
                  <span className="text-sm font-medium">{fin.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{fin.modifier}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
