import connectToDatabase from '@/lib/db'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()
    
    if (!email || !otp) {
      return NextResponse.json({ message: 'email and otp is required' }, { status: 400 })
    }

    await connectToDatabase()
    
    const user = await User.findOne({ email })
    
    if (!user) {
      return NextResponse.json({ message: 'user not found' }, { status: 404 })
    }

    if (user.isEmailVerified) {
      return NextResponse.json({ message: 'email is already verified' }, { status: 400 })
    }

    if (user.otp !== otp) {
      return NextResponse.json({ message: 'invalid otp' }, { status: 400 })
    }

    if (user.otpExpiresAt && new Date() > new Date(user.otpExpiresAt)) {
      return NextResponse.json({ message: 'otp has been expired' }, { status: 400 })
    }

    // OTP is valid, verify user
    user.isEmailVerified = true
    user.otp = undefined
    user.otpExpiresAt = undefined
    await user.save()

    return NextResponse.json({ message: 'email verified successfully' }, { status: 200 })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ message: 'failed to verify otp' }, { status: 500 })
  }
}
