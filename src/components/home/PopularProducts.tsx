import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '../ProductCard';

export default async function PopularProducts() {
    // Получаем 4 самых популярных товаров (по просмотрам или по isFeatured)
    const products = await prisma.busbar.findMany({
        // where: { isFeatured: true }, // или убери where и оставь orderBy по views
        orderBy: { views: 'desc' },
        take: 4,
    });

    if (!products.length) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-neutral-100 to-white dark:from-zinc-900 dark:to-zinc-950">
            <div className="container-padding mx-auto px-4 text-center">
                <h2 className="text-xl md:text-xl font-normal mb-12 text-gray-500 dark:text-white">
                    [ Популярные товары ]
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            description={product.description || ''}
                            slug={product.slug}
                            imageUrl={product.imageUrl || ''}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
