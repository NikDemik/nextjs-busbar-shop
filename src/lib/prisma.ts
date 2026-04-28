// lib/prisma.ts
<<<<<<< HEAD
=======
// import { PrismaClient } from '@prisma/client';
>>>>>>> 7cd5da2b453241c97422acec356564ce059371a5
import { PrismaClient } from '@/generated/prisma';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: ['query'],
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
