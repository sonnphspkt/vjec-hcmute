import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { validateUser } from '@/lib/auth'
import { Role } from '@prisma/client'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
          // Restrict to @vjec.edu.vn domain
          hd: 'vjec.edu.vn'
        }
      }
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await validateUser(credentials.email, credentials.password)
        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role
          }
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // For Google OAuth, check if email is from @vjec.edu.vn
      if (account?.provider === 'google') {
        const email = user.email || profile?.email
        
        if (!email?.endsWith('@vjec.edu.vn')) {
          return false // Block non-vjec.edu.vn emails
        }

        // Auto-assign role based on email
        let role: Role = 'STUDENT'
        if (email.startsWith('admin@') || email.includes('admin')) {
          role = 'ADMIN'
        } else if (email.includes('hr@') || email.includes('tuyendung@')) {
          role = 'EMPLOYER'
        }

        // Update user role in database
        try {
          await prisma.user.upsert({
            where: { email },
            update: {
              role: role,
              fullName: user.name || email.split('@')[0]
            },
            create: {
              email: email,
              role: role,
              fullName: user.name || email.split('@')[0],
              password: ""
            }
          })
        } catch (error) {
          console.error('Error updating user:', error)
          return false
        }
      }
      
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        // Get user with role from database
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! }
        })
        
        if (dbUser) {
          token.role = dbUser.role
          token.id = dbUser.id
          token.fullName = dbUser.fullName || dbUser.email.split('@')[0]
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && token.id && token.role && token.fullName) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.fullName = token.fullName as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 