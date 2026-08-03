import connectToDatabase from '@/lib/db'
import User from '@/models/user.model'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/SendMail'
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    await connectToDatabase()
    let user = await User.findOne({ email })

    if (user && user.isEmailVerified) {
      return NextResponse.json(
        { message: "email already exist!" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "password must be at least 6 characters" },
        { status: 400 }
      )
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)
    const hashedPassword = await bcrypt.hash(password, 10)

    if (user && !user.isEmailVerified) {
      user.name = name
      user.password = hashedPassword
      user.otp = otp
      user.otpExpiresAt = otpExpiresAt
      await user.save()
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiresAt
      })
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to RydeX, ${name}!</h2>
        <p>Thank you for registering. Please verify your email address to continue.</p>
        <p>Your OTP for verification is: <strong><span style="font-size: 24px;">${otp}</span></strong></p>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `
    
    await sendMail({
      to: email,
      name,
      subject: "RydeX - Verify Your Email",
      body: htmlBody
    })
    
    return NextResponse.json(
      { message: "OTP sent successfully", user },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 })
  }
}