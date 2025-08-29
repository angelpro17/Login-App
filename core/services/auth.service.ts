import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import type { User, LoginRequest, SignupRequest, AuthResponse } from '../models/user.model'

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production-12345"
const JSON_SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-lyze.onrender.com/api"

interface UserWithPassword extends User {
  password: string
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return Boolean(password && password.length >= 1)
}

export const getUsers = async (): Promise<UserWithPassword[]> => {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/users`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
  }
  
  return [
    {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
      password: "$2b$10$M6W3J1WYhs1NlGWOr2NztuustJk2ISDmkSE5EYY93mYe/dd3zpFce", // password: demo123
      createdAt: "2024-01-15T10:30:00.000Z",
      plan: "premium",
      status: "active"
    }
  ]
}

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  )
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export const loginUser = async (loginData: LoginRequest): Promise<AuthResponse> => {
  const { email, password } = loginData
  
  const errors: string[] = []
  
  if (!email || !validateEmail(email)) {
    errors.push("Please provide a valid email address")
  }
  
  if (!password || !validatePassword(password)) {
    errors.push("Password is required")
  }
  
  if (errors.length > 0) {
    return {
      success: false,
      message: errors.join(", ")
    }
  }
  
  const users = await getUsers()
  
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  
  if (!user) {
    return {
      success: false,
      message: "Invalid email or password"
    }
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password)
  
  if (!isValidPassword) {
    return {
      success: false,
      message: "Invalid email or password"
    }
  }
  
  const token = generateToken(user)
  
  const userData: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    status: user.status,
    createdAt: user.createdAt,
  }
  
  return {
    success: true,
    message: "Login successful!",
    token,
    user: userData
  }
}

export const signupUser = async (signupData: SignupRequest): Promise<AuthResponse> => {
  const { name, email, password } = signupData
  
  const errors: string[] = []
  
  if (!name || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long")
  }
  
  if (!email || !validateEmail(email)) {
    errors.push("Please provide a valid email address")
  }
  
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long")
  }
  
  if (errors.length > 0) {
    return {
      success: false,
      message: errors.join(", ")
    }
  }
  
  const users = await getUsers()
  
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  
  if (existingUser) {
    return {
      success: false,
      message: "User with this email already exists"
    }
  }
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const newUser: UserWithPassword = {
    id: (users.length + 1).toString(),
    name: name.trim(),
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    plan: "starter",
    status: "active"
  }
  
  try {
    const response = await fetch(`${JSON_SERVER_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    
    if (!response.ok) {
    }
  } catch (error) {
  }
  
  const token = generateToken(newUser)
  
  const userData: User = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    plan: newUser.plan,
    status: newUser.status,
    createdAt: newUser.createdAt,
  }
  
  return {
    success: true,
    message: "Account created successfully!",
    token,
    user: userData
  }
}