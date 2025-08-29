"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "../../core/services/auth.context"

interface FormData {
  name: string
  email: string
  password: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  submit?: string
}

interface PasswordValidation {
  length: boolean
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
}

export default function SignUpPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  const validatePassword = (password: string): PasswordValidation => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    const validation = validatePassword(formData.password)
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!Object.values(validation).every(Boolean)) {
      newErrors.password = "Password does not meet all requirements"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    if (field === "password") {
      setPasswordValidation(validatePassword(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      const result = await signup(formData.name, formData.email, formData.password)
      
      if (result.success) {
        router.push("/thank-you")
      } else {
        setErrors({ submit: result.message })
      }
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const ValidationIndicator = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className={`flex items-center space-x-2 text-sm ${isValid ? "text-green-600" : "text-gray-400"}`}>
      {isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/10 to-yellow-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <Link href="/public" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
            <Image src="/logo.webp" alt="Opiron Logo" width={40} height={40} className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-bold text-black">Opiron</span>
        </Link>
        
      </header>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] p-4">

        <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-gray-200/50 animate-slide-up">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="space-y-4">
              <CardTitle className="text-3xl font-bold text-gray-900 animate-fade-in">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 animate-fade-in delay-200">
                Join thousands of businesses using Opiron AI
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2 animate-fade-in-up delay-300">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300 hover:border-gray-300 ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center space-x-1 bg-red-50 p-2 rounded-lg border border-red-200">
                    <XCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2 animate-fade-in-up delay-400">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300 hover:border-gray-300 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center space-x-1 bg-red-50 p-2 rounded-lg border border-red-200">
                    <XCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-fade-in-up delay-500">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`h-12 pr-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300 hover:border-gray-300 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                    <div className="grid grid-cols-1 gap-1">
                      <ValidationIndicator isValid={passwordValidation.length} text="At least 8 characters" />
                      <ValidationIndicator isValid={passwordValidation.uppercase} text="One uppercase letter" />
                      <ValidationIndicator isValid={passwordValidation.lowercase} text="One lowercase letter" />
                      <ValidationIndicator isValid={passwordValidation.number} text="One number" />
                      <ValidationIndicator isValid={passwordValidation.special} text="One special character" />
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center space-x-1 bg-red-50 p-2 rounded-lg border border-red-200">
                    <XCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <Alert className="border-red-200 bg-red-50 animate-shake">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{errors.submit}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-orange-200 animate-fade-in-up delay-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center animate-fade-in-up delay-700">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300">
                  Sign in
                </Link>
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-8 pt-4 animate-fade-in-up delay-800">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                <span>Free Trial</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-400"></div>
                <span>No Credit Card</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      

    </div>
  )
}