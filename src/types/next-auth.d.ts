import { Role } from '@prisma/client'
import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      fullName: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: Role
    fullName?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: Role
    id: string
    fullName: string
  }
} 