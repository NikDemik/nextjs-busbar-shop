'use client';

import Link from 'next/link';
import { Boxes, Settings, Package } from 'lucide-react';

export default function ProductCategories() {
    const categories = [
        {
            title: 'Шинопроводы',
            description: 'Системы для передачи электроэнергии различной мощности.',
            icon: <Boxes className="w-10 h-10 text-accent" />,
            link: '/catalog/busbars',
        },
        {
            title: 'Комплектующие',
            description: 'Подвесы, кронштейны, заглушки и другие элементы систем.',
            icon: <Settings className="w-10 h-10 text-accent" />,
            link: '/catalog/components',
        },
        {
            title: 'Готовые комплекты',
            description: 'Оптимальные решения на основе популярных серий шинопровода.',
            icon: <Package className="w-10 h-10 text-accent" />,
            link: '/catalog/kits',
        },
    ];

    return (
        <section className="w-full bg-gray-50 dark:bg-gray-900 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-900 dark:text-white">
                    Ассортимент
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {categories.map((cat) => (
                        <Link
                            key={cat.title}
                            href={cat.link}
                            className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex justify-center mb-6">{cat.icon}</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                                {cat.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {cat.description}
                            </p>
                            <span className="inline-block text-green-500 font-medium group-hover:underline">
                                Подробнее →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
