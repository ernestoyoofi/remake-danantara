import { NextResponse } from "next/server"

// Only For Secret
export function GET(req) {
  return NextResponse.json({
    message: "Hi user!"
  })
}