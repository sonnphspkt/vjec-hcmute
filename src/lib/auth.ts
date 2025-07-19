import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

type Role = 'STUDENT' | 'EMPLOYER' | 'ADMIN'

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