import { PrismaClient } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, 'seed-data.json');
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Очистка (только для разработки)
    await prisma.busbarComponent.deleteMany();
    await prisma.component.deleteMany();
    await prisma.busbar.deleteMany();
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

    // === 5. Components ===
    const componentMap = new Map<string, number>();
    for (const c of data.components) {
        const created = await prisma.component.create({
            data: {
                name: c.name,
                slug: c.slug,
                description: c.description,
                isOptional: c.isOptional ?? false,
                imageUrl: c.imageUrl,
                drawingUrl: c.drawingUrl,
                specs: c.specs ?? {},
                price: c.price ?? 0,
                category: { connect: { slug: c.categorySlug } },
                brand: { connect: { slug: c.brandSlug } },
                busbarType: { connect: { slug: c.typeSlug } },
                series: { connect: { slug: c.seriesSlug } },
            },
        });
        componentMap.set(c.slug, created.id);
    }
    console.log('✅ Components done');

    // === 6. Busbars ===
    for (const b of data.busbars) {
        const createdBusbar = await prisma.busbar.create({
            data: {
                name: b.name,
                slug: b.slug,
                amperage: b.amperage,
                description: b.description,
                imageUrl: b.imageUrl,
                drawingUrl: b.drawingUrl,
                specs: b.specs,
                category: { connect: { slug: b.categorySlug } },
                brand: { connect: { slug: b.brandSlug } },
                type: { connect: { slug: b.typeSlug } },
                series: { connect: { slug: b.seriesSlug } },
            },
        });

        // Привязка компонентов
        if (b.components && b.components.length > 0) {
            for (const comp of b.components) {
                const compId = componentMap.get(comp.slug);
                if (!compId) continue;

                await prisma.busbarComponent.create({
                    data: {
                        busbarId: createdBusbar.id,
                        componentId: compId,
                        quantity: comp.quantity ?? 1,
                        isDefault: comp.isDefault ?? true,
                    },
                });
            }
        }
    }
    console.log('✅ Busbars done');

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
