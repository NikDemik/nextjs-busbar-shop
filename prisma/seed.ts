import { PrismaClient } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, 'seed-data.json');
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Создаем компоненты
    const componentMap = new Map<string, number>();
    for (const component of data.components) {
        const created = await prisma.component.create({ data: component });
        componentMap.set(component.slug, created.id);
    }

    // Создаем категории
    const categoryMap = new Map<string, number>();
    for (const category of data.categories) {
        const created = await prisma.category.create({ data: category });
        categoryMap.set(category.slug, created.id);
    }

    // Создаем продукты и связи с компонентами
    for (const product of data.products) {
        const createdProduct = await prisma.product.create({
            data: {
                name: product.name,
                slug: product.slug,
                description: product.description,
                imageUrl: product.imageUrl,
                drawingUrl: product.drawingUrl,
                specs: product.specs,
                categoryId: categoryMap.get(product.categorySlug)!,
            },
        });

        for (const comp of product.components) {
            await prisma.componentOnProduct.create({
                data: {
                    productId: createdProduct.id,
                    componentId: componentMap.get(comp.slug)!,
                    quantity: comp.quantity,
                },
            });
        }
    }

    console.log('✅ Сидинг завершён.');
}

main()
    .catch((e) => {
        console.error('❌ Ошибка при сидинге:', e);
    })
    .finally(() => prisma.$disconnect());
