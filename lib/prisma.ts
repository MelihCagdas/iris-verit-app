import { PrismaClient } from '../generated/prisma/client';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not defined. Please set it to a Postgres connection string in your environment or .env file.'
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

