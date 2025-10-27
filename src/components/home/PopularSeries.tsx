// components/PopularSeries.tsx

import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

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
                    {series.map((serie) => (
                        <div
                            key={serie.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-green-500/30"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={serie.imageUrl || '/placeholder.jpg'}
                                    alt={serie.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6 text-left">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                    {serie.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {serie.description}
                                </p>
                                {/* <Link
                                    href={serie.link}
                                    className="inline-block text-green-500 font-medium hover:underline"
                                >
                                    Подробнее →
                                </Link> */}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <Link
                        href="/catalog/busbars"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl shadow-md transition"
                    >
                        Смотреть все серии
                    </Link>
                </div>
            </div>
        </section>
    );
}

// const seriesOld = [
//         {
//             title: 'Серия 100А',
//             description: 'Компактный шинопровод для малых и средних нагрузок.',
//             image: '/images/series-100a.jpg',
//             link: '/product/series-100a',
//         },
//         {
//             title: 'Серия 250А',
//             description: 'Оптимальное решение для производственных помещений.',
//             image: '/images/series-250a.jpg',
//             link: '/product/series-250a',
//         },
//         {
//             title: 'Серия 400А',
//             description: 'Мощный шинопровод для крупных предприятий и объектов.',
//             image: '/images/series-400a.jpg',
//             link: '/product/series-400a',
//         },
//         {
//             title: 'Монотроллейный шинопровод',
//             description: 'Идеален для подвижных крановых систем и линий подачи питания.',
//             image: '/images/monorail-busbar.jpg',
//             link: '/product/monorail',
//         },
//     ];
