"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { User, AuthResponse, LoginRequest, SignupRequest, SignupData } from '../models/user.model'
import { setCookie, getCookie, deleteCookie, setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/format.util'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = getLocalStorage<User>('auth_user')
    
    if (storedUser) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setUser(data.user)
        setToken(data.token)
        setLocalStorage('auth_user', data.user)
        return { success: true, message: 'Login successful' }
      } else {
        return { success: false, message: data.message || 'Login failed' }
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const signupData: SignupData = {
          name,
          email,
          timestamp: new Date().toISOString(),
        }
        setLocalStorage('signupData', signupData)
        
        if (data.token) {
          setUser(data.user)
          setLocalStorage('auth_user', data.user)
        }
        
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message || 'Signup failed' }
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    removeLocalStorage('auth_user')
    removeLocalStorage('signupData')
    
    fetch('/api/logout', { method: 'POST' }).finally(() => {
      router.push('/login')
    })
  }

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useRequireAuth() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  return { user, isLoading }
}