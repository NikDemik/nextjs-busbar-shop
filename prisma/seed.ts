import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const category = await prisma.product.create({
        data: {
            name: 'Шинопровод 60А, 4 полюса',
            slug: 'busbar-60a-4p',
            description: 'Базовый комплект троллейного шинопровода для промышленных нужд.',
            imageUrl: '/images/busbar-60a.jpg',
            categoryId: 1,
            specs: {
                poles: 4,
                amperage: 60,
                length: '10 м',
            },
        },
    });

    console.log('Seed complete:', category);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
