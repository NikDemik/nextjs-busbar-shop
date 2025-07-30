// /app/catalog/busbars/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function BusbarCatalogPage({
    searchParams,
}: {
    searchParams: { series?: string };
}) {
    const seriesList = await prisma.series.findMany();

    const where = {
        category: { slug: 'busbars' },
        ...(searchParams.series
            ? {
                  series: {
                      slug: searchParams.series,
                  },
              }
            : {}),
    };

    const products = await prisma.product.findMany({
        where,
        include: { series: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main className="py-12 container-padding mx-auto">
            <h1 className="text-3xl font-bold mb-6">Шинопроводы</h1>

            {/* Фильтр по сериям */}
            <div className="mb-6 flex flex-wrap gap-4">
                <Link
                    href="/catalog/busbars"
                    className={`filter-pill ${!searchParams.series ? 'active' : ''}`}
                >
                    Все серии
                </Link>
                {seriesList.map((s) => (
                    <Link
                        key={s.slug}
                        href={`/catalog/busbars?series=${s.slug}`}
                        className={`filter-pill ${searchParams.series === s.slug ? 'active' : ''}`}
                    >
                        {s.name}
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((p) => (
                    <div
                        key={p.slug}
                        className="card border border-gray-200 bg-white shadow-sm hover:shadow-lg transition"
                    >
                        <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="rounded-t w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{p.name}</h2>
                            {p.series?.name && (
                                <p className="text-sm text-muted">Серия: {p.series.name}</p>
                            )}
                            <p className="text-sm text-muted mt-2">{p.description}</p>
                            <Link
                                href={`/product/${p.slug}`}
                                className="mt-4 inline-block text-[var(--color-accent)] font-medium hover:underline"
                            >
                                Подробнее →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
