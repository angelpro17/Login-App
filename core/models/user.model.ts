export interface User {
  id: string
  name: string
  email: string
  plan: string
  status: string
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  timestamp: string
}