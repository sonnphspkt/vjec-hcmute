import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { Role } from '@prisma/client'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: Role
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'ADMIN'
}

export function isEmployer(user: AuthUser | null): boolean {
  return user?.role === 'EMPLOYER'
}

export function isStudent(user: AuthUser | null): boolean {
  return user?.role === 'STUDENT'
}

// Session management functions (using localStorage for simplicity)
export function setSession(user: AuthUser): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_session', JSON.stringify(user))
  }
}

export function getSession(): AuthUser | null {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('user_session')
    return session ? JSON.parse(session) : null
  }
  return null
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_session')
  }
}

export async function authenticateAndSetSession(email: string, password: string): Promise<AuthUser | null> {
  const user = await validateUser(email, password)
  
  if (user) {
    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }
    setSession(authUser)
    return authUser
  }
  
  return null
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createUser(data: {
  email: string
  password: string
  fullName: string
  role: Role
}) {
  const hashedPassword = await hashPassword(data.password)
  
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword
    }
  })
}

export async function validateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      studentProfile: true,
      employerProfile: true
    }
  })

  if (!user) {
    return null
  }

  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) {
    return null
  }

  // Loại bỏ password khỏi response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      studentProfile: true,
      employerProfile: true
    },
    omit: {
      password: true
    }
  })
} 