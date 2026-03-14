"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  User, Building2, Bell, Shield, Palette, Globe, Save,
  Camera, Mail, Phone, MapPin, Key, Trash2, AlertTriangle,
  Lock, CheckCircle2, ChevronDown, Package
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/contexts/RoleContext"

export default function SettingsPage() {
  const { role, user, updateUser, branding, updateBranding } = useRole()
  const [activeTab, setActiveTab] = React.useState(role === "owner" ? "Profile" : "Account")
  const [saveSuccess, setSaveSuccess] = React.useState(false)
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)
  const [hasPendingChanges, setHasPendingChanges] = React.useState(false)
  const [isSubmittingApproval, setIsSubmittingApproval] = React.useState(false)
  const [selectedBank, setSelectedBank] = React.useState("BCA")
  const [isBankOpen, setIsBankOpen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const bankRef = React.useRef<HTMLDivElement>(null)

  const bankList = [
    "BCA", "BNI", "BRI", "Mandiri", "BSI", "CIMB Niaga",
    "Danamon", "Permata", "BTN", "OCBC NISP", "Panin",
    "Mega", "Bukopin", "Bank Jago", "Sea Bank", "Bank Lain"
  ]

  // Close bank dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bankRef.current && !bankRef.current.contains(event.target as Node)) {
        setIsBankOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleRemoveLogo = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (role === "owner") {
      updateBranding({ logo: undefined })
    } else {
      updateUser({ logo: undefined })
    }
    setSaveSuccess(true)
    setShowSuccessModal(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        if (role === "owner") {
           updateBranding({ logo: base64String })
        } else {
           updateUser({ logo: base64String })
        }
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    
    const updateData: any = {
      name: formData.get("full-name") as string,
      email: formData.get("email") as string,
    }

    if (role === "owner") {
      updateBranding({ 
        name: formData.get("business-name") as string,
        address: formData.get("address") as string,
      })
    }

    if (role === "mitra") {
      setIsSubmittingApproval(true)
      // Simulate API call to submit approval request
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmittingApproval(false)
      setHasPendingChanges(true)
      setSaveSuccess(true)
      setShowSuccessModal(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } else {
      updateUser(updateData)
      setSaveSuccess(true)
      setShowSuccessModal(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  const handleApprove = () => {
    setHasPendingChanges(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const ownerTabs = [
    { id: "Profile", name: "Profil & Bisnis", icon: User },
    { id: "Security", name: "Keamanan", icon: Lock },
  ]

  const mitraTabs = [
    { id: "Account", name: "Akun Saya", icon: User },
  ]

  const tabs = role === "owner" ? ownerTabs : mitraTabs

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {role === "owner" ? "Settings" : "Pengaturan"}
          </h1>
          <p className="text-muted-foreground">
            {role === "owner" 
              ? "Manage your account and organization preferences." 
              : "Kelola profil dan preferensi bisnis Anda."}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {hasPendingChanges && role === "mitra" && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-600 text-xs font-bold border border-amber-200 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              Menunggu Persetujuan Owner
            </div>
          )}
          {saveSuccess && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {role === "mitra" ? "Permintaan Terkirim" : "Tersimpan"}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 text-left",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-500/15 to-blue-500/10 text-violet-700 dark:text-violet-300 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.1)]"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-violet-600 dark:text-violet-400" : "")} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="lg:col-span-3 space-y-6">
          {/* PROFILE / ACCOUNT TAB */}
          {(activeTab === "Profile" || activeTab === "Account") && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border-border/50 shadow-sm relative">
                <CardHeader className="border-b border-border/50 bg-muted/20 flex flex-row items-center justify-between space-y-0 rounded-t-xl">
                  <div>
                    <CardTitle className="text-lg">
                      {role === "owner" ? "Profil & Logo Bisnis" : "Informasi Profil"}
                    </CardTitle>
                    <CardDescription>
                      {role === "owner" ? "Kelola informasi dasar dan identitas brand Anda." : "Perbarui detail pribadi dan foto profil Anda."}
                    </CardDescription>
                  </div>
                  {role === "owner" && hasPendingChanges && (
                    <Button 
                      size="sm" 
                      onClick={handleApprove}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-8 rounded-lg text-[10px] uppercase tracking-wider"
                    >
                      Approve Mitra Changes
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-5">
                    <div className="relative group">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 overflow-hidden cursor-pointer relative group/logo",
                          user?.logo ? "" : "bg-gradient-to-br from-violet-400 to-blue-500 shadow-lg"
                        )}
                      >
                        {role === "owner" ? (
                          branding.logo ? (
                            <img src={branding.logo} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-8 h-8 text-white" />
                          )
                        ) : (
                          user?.logo ? (
                            <img src={user.logo} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-8 h-8 text-white" />
                          )
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-card shadow-md border border-border flex items-center justify-center hover:bg-violet-50 hover:text-violet-600 transition-colors z-10"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{role === "owner" ? branding.name : (user?.name || "Mitra Ahmad")}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {role === "owner" ? "Administrator" : "Affiliate Sales"} · Bergabung Maret 2024
                      </p>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] text-violet-600 hover:text-violet-700 font-bold mt-1 uppercase tracking-wider flex items-center gap-2"
                      >
                        {role === "owner" ? "Ganti Logo" : "Ganti Foto"}
                      </button>
                      {(role === "owner" ? branding.logo : user?.logo) && (
                        <button 
                          type="button"
                          onClick={handleRemoveLogo}
                          className="text-[11px] text-rose-500 hover:text-rose-600 font-bold mt-1 uppercase tracking-wider flex items-center gap-1 transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-rose-300" />
                          Hapus Logo
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <User className="w-3 h-3" /> {role === "owner" ? "Nama Bisnis / Owner" : "Nama Lengkap"}
                      </Label>
                      <Input 
                        name="full-name"
                        defaultValue={role === "owner" ? (user?.name || "Owner Ambra") : (user?.name || "Mitra Ahmad")} 
                        disabled={hasPendingChanges && role === "mitra"}
                        className="h-11 rounded-xl bg-muted/30 focus:bg-white transition-all disabled:opacity-70" 
                      />
                    </div>
                    {role === "owner" && (
                      <div className="space-y-2">
                        <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Building2 className="w-3 h-3" /> Nama Bisnis
                        </Label>
                        <Input 
                          name="business-name"
                          defaultValue={branding.name} 
                          className="h-11 rounded-xl bg-muted/30 focus:bg-white transition-all" 
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Email
                      </Label>
                      <Input 
                        name="email"
                        defaultValue={user?.email || (role === "owner" ? "owner@ambra.id" : "ahmad@mitra.com")} 
                        type="email" 
                        disabled={hasPendingChanges && role === "mitra"}
                        className="h-11 rounded-xl bg-muted/30 focus:bg-white transition-all disabled:opacity-70" 
                      />
                    </div>
                    {role === "mitra" && (
                      <div className="space-y-2">
                        <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Phone className="w-3 h-3" /> No. WhatsApp
                        </Label>
                        <Input 
                          defaultValue="+62 812 3456 7890" 
                          disabled={hasPendingChanges && role === "mitra"}
                          className="h-11 rounded-xl bg-muted/30 focus:bg-white transition-all disabled:opacity-70" 
                        />
                      </div>
                    )}
                    <div className={cn("space-y-2", role === "owner" ? "md:col-span-2" : "")}>
                      <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Alamat Lengkap
                      </Label>
                      <Input 
                        name="address"
                        defaultValue={role === "owner" ? branding.address : (user?.address || "Jl. Raya Utama No. 123, Jakarta Selatan")} 
                        disabled={hasPendingChanges && role === "mitra"}
                        className="h-11 rounded-xl bg-muted/30 focus:bg-white transition-all disabled:opacity-70" 
                      />
                    </div>
                  </div>

                  {/* Informasi Rekening (Data Pendaftaran) */}
                  {/* Informasi Rekening (Hanya untuk Mitra) */}
                  {role === "mitra" && (
                    <div className="mt-8 pt-8 border-t border-border/50">
                      <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-violet-600" />
                        Informasi Rekening & Pencairan
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 relative" ref={bankRef}>
                          <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">Nama Bank</Label>
                          <button
                            type="button"
                            disabled={hasPendingChanges && role === "mitra"}
                            onClick={() => setIsBankOpen(!isBankOpen)}
                            className={cn(
                              "flex h-11 w-full items-center justify-between rounded-xl border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 transition-all text-left font-medium",
                              isBankOpen ? "border-violet-500 ring-2 ring-violet-500/20" : ""
                            )}
                          >
                            {selectedBank}
                            <ChevronDown className={cn("h-4 h-4 text-muted-foreground transition-transform", isBankOpen ? "rotate-180" : "")} />
                          </button>

                          {/* Custom Dropdown Dialog */}
                          {isBankOpen && (
                            <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 rounded-xl overflow-hidden shadow-2xl border border-border bg-white dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-200">
                              <div className="max-h-[220px] overflow-y-auto py-1 custom-scrollbar">
                                {bankList.map((bank) => (
                                  <button
                                    key={bank}
                                    type="button"
                                    onClick={() => {
                                      setSelectedBank(bank)
                                      setIsBankOpen(false)
                                    }}
                                    className={cn(
                                      "w-full text-left px-3 py-2.5 text-xs font-semibold transition-all hover:bg-muted",
                                      selectedBank === bank ? "bg-violet-500/10 text-violet-600" : "text-muted-foreground hover:text-foreground"
                                    )}
                                  >
                                    {bank}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Manual Bank Input (Shown when 'Bank Lain' is selected) */}
                        {selectedBank === "Bank Lain" && (
                          <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                            <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">Tulis Nama Bank</Label>
                            <Input 
                              placeholder="Contoh: Bank Sumut"
                              disabled={hasPendingChanges && role === "mitra"}
                              className="h-11 rounded-xl bg-muted/30 focus:border-violet-500 transition-all font-medium"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">Nomor Rekening</Label>
                          <Input 
                            defaultValue="1234567890" 
                            disabled={hasPendingChanges && role === "mitra"}
                            className="h-11 rounded-xl bg-muted/30 focus:bg-white transition-all disabled:opacity-70" 
                          />
                        </div>
                      </div>
                      {hasPendingChanges && role === "mitra" && (
                        <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-3">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                          <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                            Anda memiliki permintaan perubahan data yang sedang diproses. Input dinonaktifkan sementara hingga Owner menyetujui atau menolak perubahan Anda.
                          </p>
                        </div>
                      )}
                      <p className="text-[11px] text-muted-foreground mt-3 italic">
                        * Data ini sangat krusial. Setiap perubahan memerlukan persetujuan manual dari pihak Ambra (Owner) demi keamanan akun Anda.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Password Section for Mitra (Merged into Account) */}
              {role === "mitra" && (
                <Card className="border-border/50 shadow-sm relative">
                  <CardHeader className="border-b border-border/50 bg-muted/20 rounded-t-xl">
                    <CardTitle className="text-lg">Keamanan & Password</CardTitle>
                    <CardDescription>Mekanisme ganti password: Masukkan password baru Anda di bawah ini.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <Key className="w-3 h-3" /> Kata Sandi Saat Ini
                          </Label>
                          <Input type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">Kata Sandi Baru</Label>
                          <Input type="password" placeholder="Min. 8 karakter" className="h-11 rounded-xl" />
                        </div>
                      </div>
                      <div className="bg-violet-50 dark:bg-violet-500/5 p-4 rounded-xl border border-violet-100 dark:border-violet-500/20">
                        <p className="text-xs text-violet-700 dark:text-violet-300 font-medium leading-relaxed">
                          <strong>Tips Keamanan:</strong> Gunakan kombinasi huruf besar, kecil, angka, dan simbol untuk password yang lebih kuat. Password akan langsung diperbarui setelah Anda menekan tombol simpan.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={isSubmittingApproval || (hasPendingChanges && role === "mitra")}
                  className="h-12 px-8 gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-lg shadow-violet-500/20 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {isSubmittingApproval ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {role === "owner" ? "Save Changes" : hasPendingChanges ? "Menunggu Approval" : "Ajukan Perubahan"}
                </Button>
              </div>
            </div>
          )}

          {/* SECURITY TAB (OWNER & MITRA) */}
          {activeTab === "Security" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border-border/50 shadow-sm relative">
                <CardHeader className="border-b border-border/50 bg-muted/20 rounded-t-xl">
                  <CardTitle className="text-lg">Ganti Password</CardTitle>
                  <CardDescription>Perbarui kata sandi Anda untuk menjaga keamanan akun.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Key className="w-3 h-3" /> Password Saat Ini
                    </Label>
                    <Input type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">Password Baru</Label>
                    <Input type="password" placeholder="Min. 8 karakter" className="h-11 rounded-xl" />
                  </div>
                  <div className="pt-2">
                    <Button 
                      type="submit"
                      className="h-11 rounded-xl bg-violet-600 hover:bg-violet-700 font-bold px-8 shadow-lg shadow-violet-500/20"
                    >
                      Simpan Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {role === "owner" && (
                <div className="p-4 rounded-xl bg-violet-50 border border-violet-100 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-violet-600 mt-0.5" />
                  <p className="text-[11px] text-violet-800 leading-relaxed font-medium">
                    Sebagai Admin Owner, pastikan password Anda kuat dan diganti secara berkala untuk menjaga integritas sistem Ambra.
                  </p>
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Success Popup Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-[90%] max-w-[400px] rounded-[32px] shadow-2xl overflow-hidden border border-white/20 animate-scale-in">
            {/* Decorative Top Bar */}
            <div className="h-2 bg-gradient-to-r from-emerald-400 to-blue-500" />
            
            <div className="p-8 text-center flex flex-col items-center">
              {/* Animated Icon Container */}
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-75" />
                <CheckCircle2 className="w-10 h-10 text-emerald-600 relative z-10" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Perubahan Tersimpan!</h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed mb-8">
                {role === "owner" 
                  ? "Informasi profil dan identitas bisnis Anda telah berhasil diperbarui di seluruh sistem."
                  : "Permintaan pembaruan data Anda telah berhasil dikirim dan sedang menunggu persetujuan Admin."}
              </p>
              
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full h-12 rounded-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-500/20 transition-all border-0"
              >
                Mengerti
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
