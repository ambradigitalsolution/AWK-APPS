import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect to the app dashboard (sign-in will be handled later with Supabase)
  redirect("/sign-in")
}
