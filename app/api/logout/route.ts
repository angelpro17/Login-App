import { NextResponse } from "next/server"

export async function POST() {
    try {
        const response = NextResponse.json(
            {
                success: true,
                message: "Logged out successfully",
            },
            { status: 200 }
        )

        response.cookies.set({
            name: "auth-token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
        })

        return response
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error. Please try again later.",
            },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({ message: "Method not allowed. Use POST to logout." }, { status: 405 })
}