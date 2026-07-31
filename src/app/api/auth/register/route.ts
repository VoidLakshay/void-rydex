import connectToDatabase from '@/lib/db'
import User from '@/models/user.model'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    await connectToDatabase()
    let user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
     if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
     user = await User.create({ name, email, password: hashedPassword })
    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 })
  }
}