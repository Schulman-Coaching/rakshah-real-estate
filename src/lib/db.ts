import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // During build time, return a mock client if no database URL
  if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
    console.warn('No database URL found, using mock Prisma client')
    return new PrismaClient()
  }
  return new PrismaClient()
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
