import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';

export default async function BusbarCatalogPage({
    searchParams,
}: {
    searchParams: { brands?: string };
}) {
    const brandsSlug = Array.isArray(searchParams.brands)
        ? searchParams.brands[0]
        : searchParams.brands;

    const brandsList = await prisma.brand.findMany({
        where: { busbars: { some: {} } },
    });

    const where: any = {
        category: { is: { slug: 'busbars' } },
        ...(brandsSlug ? { brand: { is: { slug: brandsSlug } } } : {}),
    };

    const busbars = await prisma.busbar.findMany({
        where,
        include: { series: true, brand: true, type: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main className="container-padding mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">Шинопроводы</h1>

            {/* Фильтр по сериям */}
            <div className="mb-6 flex flex-wrap gap-4">
                <Link
                    href="/catalog/busbars"
                    className={`filter-pill ${!brandsSlug ? 'active' : ''}`}
                >
                    Все серии
                </Link>
                {brandsList.map((s) => (
                    <Link
                        key={s.slug}
                        href={`/catalog/busbars?brands=${s.slug}`}
                        className={`filter-pill ${brandsSlug === s.slug ? 'active' : ''}`}
                    >
                        {s.name}
                    </Link>
                ))}
            </div>

            {/* Сетка товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {busbars.map((p) => (
                    <ProductCard
                        key={p.id}
                        name={p.name}
                        description={p.description || ''}
                        slug={p.slug}
                        seriesName={p.series?.name || ''}
                        imageUrl={p.imageUrl || ''}
                    />
                ))}
            </div>
        </main>
    );
}
