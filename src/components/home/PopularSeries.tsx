// components/PopularSeries.tsx

import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';

export default async function PopularSeries() {
    // Получаем 4 самых популярные серии (по просмотрам или по isFeatured(вручную))
    const series = await prisma.series.findMany({
        where: { isFeatured: true }, // или убери where и оставь orderBy по views
        // orderBy: { views: 'desc' },
        take: 4,
    });

    if (!series.length) return null;

    return (
        <section className="w-full bg-gradient-to-b from-neutral-100 to-white dark:from-zinc-900 dark:to-zinc-950 py-20">
            <div className="container-padding mx-auto px-6 text-center">
                <h2 className="text-xl md:text-xl font-normal mb-12 text-gray-500 dark:text-white">
                    [ Популярные серии ]
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {series.map((series) => (
                        <ProductCard
                            key={series.id}
                            name={series.name}
                            description={series.description || ''}
                            slug={series.slug}
                            imageUrl={series.imageUrl || ''}
                        />
                    ))}
                </div>

                <div className="mt-12">
                    <Link href="/catalog/busbars" className="btn">
                        Смотреть все серии
                    </Link>
                </div>
            </div>
        </section>
    );
}
