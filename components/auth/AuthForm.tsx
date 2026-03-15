"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Loader2, Eye, EyeOff, User, Lock, Package, MapPin, Phone, Building2, CreditCard, CheckCircle2, Copy, Check, ChevronDown, AlertCircle as AlertCircleIcon } from "lucide-react"
import { useRole } from "@/lib/contexts/RoleContext"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

interface AuthFormProps {
  type: "sign-in" | "sign-up"
}

export function AuthForm({ type }: AuthFormProps) {
  const isSignIn = type === "sign-in"
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [affiliateCode, setAffiliateCode] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const [selectedBank, setSelectedBank] = React.useState("")
  const [bankOpen, setBankOpen] = React.useState(false)
  const bankRef = React.useRef<HTMLDivElement>(null)

  const bankList = [
    "BCA", "BNI", "BRI", "Mandiri", "BSI", "CIMB Niaga",
    "Danamon", "Permata", "BTN", "OCBC NISP", "Panin",
    "Mega", "Bukopin", "Bank Jago", "Sea Bank", "Bank Lain"
  ]

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bankRef.current && !bankRef.current.contains(event.target as Node)) {
        setBankOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function generateAffiliateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = "AWK-"
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  const { login, user, isLoaded } = useRole()
  const [errorStatus, setErrorStatus] = React.useState("")

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoaded && user) {
      router.push("/")
    }
  }, [user, isLoaded, router])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrorStatus("")
    
    const formData = new FormData(event.currentTarget)
    const email = (formData.get("email") as string || "").trim()
    const password = (formData.get("password") as string || "").trim()

    if (isSignIn) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorStatus(error.message === "Invalid login credentials" ? "Email atau Password salah!" : error.message)
        setIsLoading(false)
        return
      }

      if (data.user) {
        // Fetch profile to get role and details
        const { data: profile } = await supabase
          .from('profiles')
          .select('*, organizations(*)')
          .eq('id', data.user.id)
          .single()

        if (profile) {
          login(profile.role as "mitra" | "owner", { 
            name: profile.full_name || data.user.email?.split('@')[0] || "User", 
            email: data.user.email || "",
            businessName: profile.organizations?.name || "AWK Apps",
            address: profile.address || "",
            logo: profile.avatar_url
          })
          setShowSuccess(true)
          setTimeout(() => router.push("/"), 1500)
        } else {
          // Fallback if profile doesn't exist yet
          login("mitra", { name: email.split('@')[0], email })
          setShowSuccess(true)
          setTimeout(() => router.push("/"), 1500)
        }
      }
    } else {
      // Sign Up Logic
      const fullName = (formData.get("full-name") as string || "").trim()
      const whatsapp = (formData.get("whatsapp") as string || "").trim()
      const bankName = selectedBank === "Bank Lain" ? (formData.get("bank-name-other") as string || "").trim() : selectedBank
      const accountNumber = (formData.get("account-number") as string || "").trim()
      const address = (formData.get("alamat") as string || "").trim()

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            whatsapp,
          }
        }
      })

      if (error) {
        setErrorStatus(error.message)
        setIsLoading(false)
        return
      }

      if (data.user) {
        // Generate affiliate code
        const code = generateAffiliateCode()
        setAffiliateCode(code)
        
        // 1. Create Organization for this Mitra (or join a default one)
        // For now, let's treat every new Mitra as their own "Mitra Org"
        const { data: org, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: fullName + " Shop",
            slug: email.split('@')[0] + "-" + Math.floor(Math.random() * 1000)
          })
          .select()
          .single()

        if (orgError) {
          setErrorStatus("Gagal membuat organisasi: " + orgError.message)
          setIsLoading(false)
          return
        }

        // 2. Create Profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            organization_id: org.id,
            full_name: fullName,
            role: 'mitra'
          })

        if (profileError) {
          setErrorStatus("Gagal membuat profil: " + profileError.message)
          setIsLoading(false)
          return
        }

        // 3. Create Affiliate record
        await supabase
          .from('affiliates')
          .insert({
            organization_id: org.id,
            user_id: data.user.id,
            name: fullName,
            code: code,
            commission_rate: 10 // Default 10%
          })

        setShowSuccess(true)
      }
    }
    setIsLoading(false)
  }

  function copyAffiliateCode() {
    navigator.clipboard.writeText(affiliateCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Input field style classes
  const inputClass = "w-full h-[54px] rounded-[30px] border-[1.5px] border-white/90 bg-transparent text-white text-[15.5px] pl-[54px] pr-4 placeholder:text-white/80 focus:outline-none focus:ring-0 focus:border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] font-medium autofill:shadow-[inset_0_0_0_1000px_transparent] [-webkit-text-fill-color:white]"

  // Icon blob shapes for variety
  const blobShapes = [
    '40% 60% 70% 30% / 50% 50% 60% 40%',
    '45% 55% 60% 40% / 50% 45% 55% 50%',
    '50% 50% 40% 60% / 60% 40% 60% 40%',
    '38% 62% 65% 35% / 45% 55% 55% 45%',
    '42% 58% 55% 45% / 48% 52% 58% 42%',
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans bg-gradient-to-tr from-[#6911c4] via-[#ac2ad3] to-[#257deb]">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#c832ff] to-[#209cff] blur-[150px] opacity-30"></div>
        <div className="absolute bottom-[0%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-[#c832ff] to-[#209cff] blur-[150px] opacity-20"></div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-[420px] p-8 text-center relative overflow-hidden">
            {/* Decorative gradient top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#31bbf5] to-[#c22cee]" />
            
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {isSignIn ? "Login Berhasil! 👋" : "Pendaftaran Berhasil! 🎉"}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {isSignIn 
                ? `Selamat datang kembali di ${user?.businessName || "Ambra Warna Kemasan"}.` 
                : `Selamat! Anda telah terdaftar sebagai mitra ${user?.businessName || "Ambra Warna Kemasan"}.`}
            </p>

            {/* Affiliate Code Section (Only for Sign Up) */}
            {!isSignIn && (
              <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-5 mb-6 border border-violet-100">
                <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Nomor Affiliate Anda</p>
                <div className="flex items-center justify-center gap-3">
                  <code className="text-3xl font-bold text-violet-700 tracking-widest font-mono">{affiliateCode}</code>
                  <button
                    onClick={copyAffiliateCode}
                    className="w-10 h-10 rounded-xl bg-violet-100 hover:bg-violet-200 flex items-center justify-center transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-violet-600" />}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">Simpan kode ini untuk referensi Anda.</p>
              </div>
            )}

            {/* Action Buttons - Only show for Sign Up since Login has auto-redirect */}
            {!isSignIn && (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push("/")}
                  className="w-full h-12 rounded-[30px] bg-gradient-to-r from-[#31bbf5] to-[#c22cee] text-white font-semibold text-[15px] tracking-wide shadow-lg shadow-violet-500/20 hover:shadow-xl hover:-translate-y-[1px] transition-all"
                >
                  Masuk ke Akun
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full h-10 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Tutup
                </button>
              </div>
            )}
            
            {/* Loading Progress Bar for Auto-redirect in Login */}
            {isSignIn && (
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#31bbf5] to-[#c22cee] animate-progress-fast" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Form Blob Content */}
      <div 
        className={`relative z-20 w-[92%] mt-12 pt-20 pb-12 px-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col items-center bg-gradient-to-br from-[#95d7f7] via-[#e5aef6] to-[#f47bef] ${isSignIn ? 'sm:w-[500px] sm:px-12' : 'sm:w-[540px] sm:px-10'}`}
        style={{ borderRadius: '38% 62% 55% 45% / 45% 40% 60% 55%' }}
      >
        
        {/* Top Avatar SVG */}
        <div className={cn(
          "absolute -top-14 left-1/2 -translate-x-1/2 w-[116px] h-[116px] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-[3px] border-white overflow-hidden transition-all duration-300",
          user?.logo ? "bg-white" : "bg-gradient-to-br from-violet-500 to-blue-600"
        )}>
          {user?.logo ? (
            <img src={user.logo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <Package className="w-14 h-14 text-white" strokeWidth={1.5} />
          )}
        </div>

        {/* Title */}
        <h2 className="text-[32px] sm:text-[36px] font-bold text-white tracking-wide mb-4 drop-shadow-md text-center mt-2 z-10 relative">
          {isSignIn ? "Sign In" : "Gabung Mitra"}
        </h2>

        {errorStatus && (
          <div className="w-full max-w-[340px] mb-6 animate-in fade-in slide-in-from-top-2 duration-300 z-10">
            <div className="bg-rose-500/20 backdrop-blur-md border border-rose-500/50 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-500/30">
                <AlertCircleIcon className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-bold text-white tracking-wide">{errorStatus}</p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="w-full relative z-10 flex flex-col">
          
          {/* ===== SIGN UP FIELDS ===== */}
          {!isSignIn && (
            <>
              {/* Nama */}
              <div className="relative mb-[18px] w-full max-w-[380px] mx-auto">
                <div 
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[0] }}
                >
                  <User className="text-white w-[22px] h-[22px]" />
                </div>
                <input 
                  id="full-name" 
                  name="full-name" 
                  type="text"
                  placeholder="Nama Lengkap" 
                  required 
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              {/* Alamat */}
              <div className="relative mb-[18px] w-full max-w-[380px] mx-auto">
                <div 
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[1] }}
                >
                  <MapPin className="text-white w-[22px] h-[22px]" />
                </div>
                <input 
                  id="alamat" 
                  name="alamat" 
                  type="text"
                  placeholder="Alamat" 
                  required 
                  className={inputClass}
                />
              </div>

              {/* No WA */}
              <div className="relative mb-[18px] w-full max-w-[380px] mx-auto">
                <div 
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[2] }}
                >
                  <Phone className="text-white w-[22px] h-[22px]" />
                </div>
                <input 
                  id="whatsapp" 
                  name="whatsapp" 
                  type="tel"
                  placeholder="No. WhatsApp" 
                  required 
                  className={inputClass}
                />
              </div>

              {/* Nama Bank - Custom Dropdown */}
              <div className="relative mb-[18px] w-full max-w-[380px] mx-auto" ref={bankRef}>
                <div 
                  className="absolute -left-6 top-[27px] -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[3] }}
                >
                  <Building2 className="text-white w-[22px] h-[22px]" />
                </div>
                
                {/* Hidden input for form validation */}
                <input type="hidden" name="bank-name" value={selectedBank} required />
                
                {/* Custom select trigger */}
                <button
                  type="button"
                  onClick={() => setBankOpen(!bankOpen)}
                  className={`w-full h-[54px] rounded-[30px] border-[1.5px] border-white/90 bg-transparent text-left pl-[65px] pr-12 focus:outline-none focus:border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] transition-all font-medium text-[15.5px] ${selectedBank && selectedBank !== 'Bank Lain' ? 'text-white' : 'text-white/90'}`}
                >
                  {selectedBank && selectedBank !== '' ? selectedBank : 'Pilih Bank'}
                </button>
                <ChevronDown className={`absolute right-5 top-[27px] -translate-y-1/2 w-5 h-5 text-white/80 transition-transform duration-200 pointer-events-none ${bankOpen ? 'rotate-180' : ''}`} />

                {/* Dropdown list */}
                {bankOpen && (
                  <div className="absolute top-[60px] left-0 right-0 z-50 rounded-2xl overflow-hidden shadow-[0_16px_40px_-10px_rgba(0,0,0,0.4)] border border-white/20 backdrop-blur-xl bg-white/95">
                    <div className="max-h-[220px] overflow-y-auto py-2 custom-scrollbar">
                      {bankList.map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => {
                            setSelectedBank(bank)
                            setBankOpen(false)
                          }}
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-blue-500/10 ${
                            selectedBank === bank
                              ? 'bg-gradient-to-r from-violet-500/15 to-blue-500/10 text-violet-700 font-semibold'
                              : bank === 'Bank Lain' 
                                ? 'text-violet-600 border-t border-gray-100 mt-1 pt-3 italic'
                                : 'text-gray-700'
                          }`}
                        >
                          {bank === 'Bank Lain' ? '✏️  Bank Lain...' : bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Manual Bank Input - shown when "Bank Lain" is selected */}
              {selectedBank === "Bank Lain" && (
                <div className="relative mb-[18px] w-full max-w-[380px] mx-auto">
                  <div 
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                    style={{ borderRadius: blobShapes[3] }}
                  >
                    <Building2 className="text-white w-[22px] h-[22px]" />
                  </div>
                  <input 
                    id="bank-name-other" 
                    name="bank-name-other" 
                    type="text"
                    placeholder="Tulis nama bank..." 
                    required 
                    className={inputClass}
                  />
                </div>
              )}

              {/* No Rekening */}
              <div className="relative mb-[18px] w-full max-w-[380px] mx-auto">
                <div 
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[4] }}
                >
                  <CreditCard className="text-white w-[22px] h-[22px]" />
                </div>
                <input 
                  id="account-number" 
                  name="account-number" 
                  type="text"
                  placeholder="No. Rekening" 
                  required 
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="relative mb-[18px] w-full max-w-[380px] mx-auto">
                <div 
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[0] }}
                >
                  <User className="text-white w-[22px] h-[22px]" />
                </div>
                <input 
                  id="email" 
                  name="email" 
                  type="email"
                  placeholder="Email" 
                  required 
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div className="relative mb-[18px] w-full max-w-[380px] mx-auto">
                <div 
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[1] }}
                >
                  <Lock className="text-white w-[22px] h-[22px]" />
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type="password"
                  placeholder="Password" 
                  required 
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>
            </>
          )}

          {/* ===== SIGN IN FIELDS ===== */}
          {isSignIn && (
            <>
              {/* Email */}
              <div className="relative mb-[22px] w-full max-w-[340px] mx-auto">
                <div 
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-bl from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[0] }}
                >
                  <User className="text-white w-[24px] h-[24px]" />
                </div>
                <input 
                  id="login-email" 
                  name="email" 
                  type="text" 
                  placeholder="Email" 
                  required 
                  autoComplete="off"
                  className="w-full h-[54px] rounded-[30px] border-[1.5px] border-white/90 bg-transparent text-white text-[16px] pl-[54px] pr-4 placeholder:text-white/90 focus:outline-none focus:ring-0 focus:border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] font-medium autofill:shadow-[inset_0_0_0_1000px_transparent] [-webkit-text-fill-color:white]"
                />
              </div>

              {/* Password */}
              <div className="relative mb-[16px] w-full max-w-[340px] mx-auto">
                <div 
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-tl from-[#bb2eed] to-[#34bdf4] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(0,0,0,0.2)] z-10"
                  style={{ borderRadius: blobShapes[1] }}
                >
                  <Lock className="text-white w-[22px] h-[22px]" />
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder={showPassword ? "password" : "••••••••••••"}
                  required 
                  autoComplete="off"
                  className={`w-full h-[54px] rounded-[30px] border-[1.5px] border-white/90 bg-transparent text-white pl-[54px] pr-[50px] placeholder:text-white/90 focus:outline-none focus:ring-0 focus:border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] font-medium autofill:shadow-[inset_0_0_0_1000px_transparent] [-webkit-text-fill-color:white] ${showPassword ? 'text-[16px] tracking-normal' : 'text-[24px] tracking-[0.2em] font-mono leading-none pt-2'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition-colors z-20"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5 stroke-[2.5px]" />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end w-full max-w-[340px] mx-auto px-4 mb-8 mt-1">
                <Link href="#" className="text-[13px] text-white/90 font-medium hover:text-white hover:underline transition-all tracking-wide">
                  Forgot password?
                </Link>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`
              w-[220px] h-[52px] mx-auto rounded-[30px] bg-gradient-to-r from-[#31bbf5] to-[#c22cee] 
              text-white font-semibold text-[17px] tracking-wider uppercase
              shadow-[0_8px_20px_-6px_rgba(189,46,241,0.6)]
              hover:shadow-[0_12px_24px_-6px_rgba(189,46,241,0.8)]
              hover:-translate-y-[1px] active:translate-y-[1px]
              transition-all flex items-center justify-center border-0 mb-6 mt-4
            `}
          >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {isSignIn ? "LOGIN" : "DAFTAR"}
          </button>

          {/* Switch link */}
          {isSignIn && (
            <div className="text-center">
              <span className="text-[13px] text-white/90 font-medium tracking-wide">
                <Link href="/sign-up" className="text-white hover:underline drop-shadow-sm font-semibold ml-0.5 underline-offset-2 opacity-90 hover:opacity-100">
                  gabung menjadi mitra?
                </Link>
              </span>
            </div>
          )}
        </form>
      </div>

    </div>
  )
}
