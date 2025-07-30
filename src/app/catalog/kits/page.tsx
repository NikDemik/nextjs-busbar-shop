import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { category: { slug: { startsWith: 'kit' } } },
                { category: { slug: 'mono-busbar' } },
            ],
        },
        include: { category: true },
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
