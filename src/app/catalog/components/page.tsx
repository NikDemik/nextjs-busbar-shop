import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function ComponentsPage() {
    const where: any = {
        category: { slug: 'components' },
    };

    const components = await prisma.component.findMany({
        where,
        include: { category: true, series: true, brand: true, busbarType: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main className="py-12 container-padding mx-auto">
            <h1 className="text-3xl font-bold mb-6">Комплектующие</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {components.map((c) => (
                    <ProductCard
                        key={c.id}
                        name={c.name}
                        description={c.description || ''}
                        slug={c.slug}
                        seriesName={c.series?.name || ''}
                        imageUrl={c.imageUrl || ''}
                    />
                ))}
            </div>
        </main>
    );
}
