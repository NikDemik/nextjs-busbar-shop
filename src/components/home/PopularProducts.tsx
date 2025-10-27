import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

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
                        <div
                            key={product.id}
                            className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative w-full h-56 overflow-hidden">
                                <Image
                                    src={product.imageUrl || '/placeholder.jpg'}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-5 text-left">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>
                                {product.description && (
                                    <p className=" text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">
                                        {product.description}
                                    </p>
                                )}

                                <Link
                                    href={`/product/${product.slug}`}
                                    className="inline-block text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                >
                                    Подробнее →
                                </Link>
                            </div>

                            {/* Мягкое свечение при наведении */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
