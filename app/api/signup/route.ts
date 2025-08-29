import { type NextRequest, NextResponse } from "next/server"
import { signupUser } from "@/core/services/auth.service"
import type { SignupRequest } from "@/core/models/user.model"

export async function POST(request: NextRequest) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const body: SignupRequest = await request.json()

        const result = await signupUser(body)

        if (!result.success) {
            return NextResponse.json(
                result,
                { status: 400 }
            )
        }

        const response = NextResponse.json(
            result,
            { status: 201 }
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
    return NextResponse.json({ message: "Method not allowed. Use POST to create an account." }, { status: 405 })
}