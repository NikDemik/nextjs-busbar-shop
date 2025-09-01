import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Page() {
    // Обращаемся к таблице/модели product
    const products = await prisma.product.findMany({
        // Указываем фильтрацию данных
        where: {
            OR: [
                // Первый вариант: продукт принадлежит категории, у которой slug начинается на "kit"
                { category: { slug: { startsWith: 'kit' } } },
                { category: { slug: 'kits' } },
            ],
        },
        // кроме данных о продукте, подтянуть и связанную категорию и серию
        include: { category: true, series: true },
    });

    return (
        <main className="p-8 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Шинопроводы</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        name={p.name}
                        description={p.description}
                        slug={p.slug}
                        imageUrl={p.imageUrl || ''}
                    />
                ))}
            </div>
        </main>
    );
}
