"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      // Clear token from localStorage
      localStorage.removeItem("access_token")

      // Import and reset the token in auth.js
      const { setAccessToken } = await import("@/lib/auth")
      setAccessToken("")

      // Redirect to login page
      router.push("/login")
    }

    logout()
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        <h1 className="mt-4 text-xl font-semibold">Logging out...</h1>
      </div>
    </div>
  )
}

