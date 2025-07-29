import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const products = await prisma.product.findMany({
    where: {
        OR: [{ category: { slug: { startsWith: 'kit' } } }, { category: { slug: 'mono-busbar' } }],
    },
    include: { category: true },
});
