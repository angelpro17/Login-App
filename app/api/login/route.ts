import { type NextRequest, NextResponse } from "next/server"
import { loginUser } from "../../../core/services/auth.service"
import type { LoginRequest } from "../../../core/models/user.model"

export async function POST(request: NextRequest) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const body: LoginRequest = await request.json()
    
    const result = await loginUser(body)
    
    if (!result.success) {
      return NextResponse.json(
        result,
        { status: 401 }
      )
    }
    
    const response = NextResponse.json(
      result,
      { status: 200 }
    )
    
    if (result.token) {
      response.cookies.set({
        name: "auth-token",
        value: result.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      })
    }
    
    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed. Use POST to login." }, { status: 405 })
}