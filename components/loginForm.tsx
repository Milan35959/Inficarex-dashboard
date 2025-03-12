"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Eye, EyeOff } from "lucide-react"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // Check if user is already logged in (has a token)
    const checkExistingToken = async () => {
      const storedToken = localStorage.getItem("access_token")

      if (storedToken) {
        // Import the setAccessToken function
        const { setAccessToken } = await import("@/lib/auth")

        // Set the token in auth.js
        setAccessToken(storedToken)

        // Redirect to dashboard if token exists
        router.push("/login")
      }
    }

    checkExistingToken()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate form
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("https://api.inficurex.com/api/v1/system-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Import the setAccessToken function from your auth.js
        const { setAccessToken } = await import("@/lib/auth")

        // Store the token for future API requests
        setAccessToken(data.data.access_token)

        // Save token to localStorage for persistence across page refreshes
        localStorage.setItem("access_token", data.data.access_token)

        // Redirect to dashboard on successful login
        router.push("/dashboard")
      } else {
        setError(data.message || "Invalid email or password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   {error && <div className="error">{error}</div>}
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       id="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>
    //   <button type="submit" disabled={isLoading}>
    //     {isLoading ? "Loading..." : "Login"}
    //   </button>
    // </form>
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <CardContent className="space-y-4 pt-2 mb-4">
        <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />

        </div>
        <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="flex items-center justify-between">
            <Button variant="link" className="h-auto p-0 text-xs" type="button">
                    Forgot password?
            </Button>
        </div>
        <div className="relative">
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          />
          <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </Button>

        </div>
        </div>
        {error && <div className="text-sm font-medium text-destructive">{error}</div>}

      </CardContent>
      <CardFooter className="flex flex-col">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Loading..." : "Login"}
        </Button>
        <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button variant="link" className="h-auto p-0">
              Sign up
            </Button>
          </div>

        </CardFooter>

      </form>

    </Card>
  )
}

export default LoginForm

