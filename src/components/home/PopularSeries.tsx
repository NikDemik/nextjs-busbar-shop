// components/PopularSeries.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PopularSeries() {
    const series = [
        {
            title: 'Серия 100А',
            description: 'Компактный шинопровод для малых и средних нагрузок.',
            image: '/images/series-100a.jpg',
            link: '/product/series-100a',
        },
        {
            title: 'Серия 250А',
            description: 'Оптимальное решение для производственных помещений.',
            image: '/images/series-250a.jpg',
            link: '/product/series-250a',
        },
        {
            title: 'Серия 400А',
            description: 'Мощный шинопровод для крупных предприятий и объектов.',
            image: '/images/series-400a.jpg',
            link: '/product/series-400a',
        },
        {
            title: 'Монотроллейный шинопровод',
            description: 'Идеален для подвижных крановых систем и линий подачи питания.',
            image: '/images/monorail-busbar.jpg',
            link: '/product/monorail',
        },
    ];

    return (
        <section className="w-full bg-gray-50 dark:bg-gray-900 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                    Популярные серии
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {series.map((item) => (
                        <div
                            key={item.title}
                            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-green-500/30"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6 text-left">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {item.description}
                                </p>
                                <Link
                                    href={item.link}
                                    className="inline-block text-green-500 font-medium hover:underline"
                                >
                                    Подробнее →
                                </Link>
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
