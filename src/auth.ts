import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import connectToDatabase from "./lib/db"
import User from "./models/user.model"
import Google from "next-auth/providers/google"
/**
 * NextAuth configuration and providers setup
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials, request) {
        if (!credentials) {
          throw new Error("No credentials provided")
        }
        const email = credentials.email as string
        const password = credentials.password as string
        await connectToDatabase()
        const user = await User.findOne({ email })
        if (!user) {
          throw new Error("Invalid email")
        }
        const isMatch = await bcrypt.compare(password, user.password ?? "")
        if (!isMatch) {
          throw new Error("Invalid password")
        }
        if (!user.isEmailVerified) {
          throw new Error("Please verify your email first")
        }
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role, emailVerified: user.isEmailVerified }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        await connectToDatabase()
        let dbUser = await User.findOne({
          email: user.email,
        })
        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
          })
        }
        user.id = dbUser._id.toString()
        user.role = dbUser.role
      }
      return true
    },
   async jwt ({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },
    async session ({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as string,
          emailVerified: token.emailVerified as Date | null,
        }
      }
      return session
    }
  },
  pages:{
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, 
  },
  secret: process.env.BETTER_AUTH_SECRET,

})