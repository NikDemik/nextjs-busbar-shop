import { PrismaClient } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, 'seed-data.json');
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Очистка (только для разработки)
    await prisma.busbar.deleteMany();
    await prisma.component.deleteMany();
    await prisma.series.deleteMany();
    await prisma.busbarType.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.category.deleteMany();

    console.log('🌱 Start seeding...');

    // === 1. Categories ===
    const categoriesMap = new Map<string, number>();
    for (const c of data.categories) {
        const created = await prisma.category.create({
            data: {
                name: c.name,
                slug: c.slug,
                description: c.description,
            },
        });
        categoriesMap.set(c.slug, created.id);
    }
    console.log('✅ Categories done');

    // === 2. Brands ===
    const brandsMap = new Map<string, number>();
    for (const b of data.brands) {
        const created = await prisma.brand.create({
            data: {
                name: b.name,
                slug: b.slug,
            },
        });
        brandsMap.set(b.slug, created.id);
    }
    console.log('✅ Brands done');

    // === 3. BusbarTypes ===
    const typesMap = new Map<string, number>();
    for (const t of data.busbarTypes) {
        const created = await prisma.busbarType.create({
            data: {
                name: t.name,
                slug: t.slug,
            },
        });
        typesMap.set(t.slug, created.id);
    }
    console.log('✅ BusbarTypes done');

    // === 4. Series ===
    const seriesMap = new Map<string, number>();
    for (const s of data.series) {
        const created = await prisma.series.create({
            data: {
                name: s.name,
                slug: s.slug,
                description: s.description,
                brand: {
                    connect: { slug: s.brandSlug },
                },
            },
        });
        seriesMap.set(s.slug, created.id);
    }
    console.log('✅ Series done');

    // === 5. Busbars ===
    const busbarsMap = new Map<string, number>();
    for (const b of data.busbars) {
        const created = await prisma.busbar.create({
            data: {
                name: b.name,
                slug: b.slug,
                amperage: b.amperage,
                description: b.description,
                imageUrl: b.imageUrl,
                specs: b.specs,
                category: { connect: { slug: b.categorySlug } },
                brand: { connect: { slug: b.brandSlug } },
                type: { connect: { slug: b.typeSlug } },
                series: { connect: { slug: b.seriesSlug } },
            },
        });
        busbarsMap.set(b.slug, created.id);
    }
    console.log('✅ Busbars done');

    // === 6. Components ===
    for (const c of data.components) {
        await prisma.component.create({
            data: {
                name: c.name,
                slug: c.slug,
                type: c.type,
                description: c.description,
                isOptional: c.isOptional ?? false,
                imageUrl: c.imageUrl,
                specs: c.specs,
                price: c.price,
                category: { connect: { slug: c.categorySlug } },
                brand: { connect: { slug: c.brandSlug } },
                busbarType: { connect: { slug: c.typeSlug } },
                series: { connect: { slug: c.seriesSlug } },

                // связь с шинопроводами (BusbarComponents)
                busbars: {
                    connect: c.busbarSlugs?.map((slug: string) => ({ slug })) || [],
                },
            },
        });
    }
    console.log('✅ Components done');

    console.log('🌱 Seeding finished!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
