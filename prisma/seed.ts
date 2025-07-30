import { PrismaClient } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, 'seed-data.json');
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Очистка (только для разработки)
    await prisma.componentOnProduct.deleteMany();
    await prisma.product.deleteMany();
    await prisma.component.deleteMany();
    await prisma.series.deleteMany();
    await prisma.category.deleteMany();

    // === 1. Категории ===
    const categoryMap = new Map<string, number>();
    for (const c of data.categories) {
        const created = await prisma.category.create({ data: c });
        categoryMap.set(c.slug, created.id);
    }

    // === 2. Серии ===
    const seriesMap = new Map<string, number>();
    for (const s of data.series) {
        const created = await prisma.series.create({ data: s });
        seriesMap.set(s.slug, created.id);
    }

    // === 3. Компоненты ===
    const componentMap = new Map<string, number>();
    for (const comp of data.components) {
        const created = await prisma.component.create({ data: comp });
        componentMap.set(comp.slug, created.id);
    }

    // === 4. Продукты ===
    for (const p of data.products) {
        const createdProduct = await prisma.product.create({
            data: {
                name: p.name,
                slug: p.slug,
                description: p.description,
                imageUrl: p.imageUrl,
                drawingUrl: p.drawingUrl ?? null,
                specs: p.specs,
                categoryId: categoryMap.get(p.categorySlug)!,
                seriesId: p.seriesSlug ? seriesMap.get(p.seriesSlug) : undefined,
            },
        });

        // Привязка компонентов
        for (const comp of p.components) {
            await prisma.componentOnProduct.create({
                data: {
                    productId: createdProduct.id,
                    componentId: componentMap.get(comp.slug)!,
                    quantity: comp.quantity,
                },
            });
        }
    }

    console.log('✅ Seed завершён успешно.');
}

main()
    .catch((e) => {
        console.error('❌ Ошибка при сидировании:', e);
    })
    .finally(() => prisma.$disconnect());
