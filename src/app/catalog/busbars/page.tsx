import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';

export default async function BusbarCatalogPage({
    searchParams,
}: {
    searchParams: { series?: string };
}) {
    const seriesSlug = Array.isArray(searchParams.series)
        ? searchParams.series[0]
        : searchParams.series;

    const seriesList = await prisma.series.findMany({
        where: { busbars: { some: {} } },
    });

    const where: any = {
        category: { is: { slug: 'busbars' } },
        ...(seriesSlug ? { series: { is: { slug: seriesSlug } } } : {}),
    };

    const busbars = await prisma.busbar.findMany({
        where,
        include: { series: true, brand: true, type: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main className="py-12 container-padding mx-auto">
            <h1 className="text-3xl font-bold mb-6">Шинопроводы</h1>

            {/* Фильтр по сериям */}
            <div className="mb-6 flex flex-wrap gap-4">
                <Link
                    href="/catalog/busbars"
                    className={`filter-pill ${!seriesSlug ? 'active' : ''}`}
                >
                    Все серии
                </Link>
                {seriesList.map((s) => (
                    <Link
                        key={s.slug}
                        href={`/catalog/busbars?series=${s.slug}`}
                        className={`filter-pill ${seriesSlug === s.slug ? 'active' : ''}`}
                    >
                        {s.name}
                    </Link>
                ))}
            </div>

            {/* Сетка товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
