'use client';

import Link from 'next/link';
import { Boxes, Settings, Package } from 'lucide-react';
import Image from 'next/image';

export default function ProductCategories() {
    const categories = [
        {
            title: 'Комплектующие',
            description: 'Подвесы, кронштейны, заглушки и другие элементы систем.',
            icon: <Settings className="w-10 h-10 text-accent" />,
            image: '/image/category/accessories-category-img-v.png',
            link: '/catalog/components',
        },
        {
            title: 'Шинопроводы',
            description: 'Системы для передачи электроэнергии различной мощности.',
            icon: <Boxes className="w-10 h-10 text-accent" />,
            image: '/image/category/shinoprovod-category-img.png',
            link: '/catalog/busbars',
        },
        {
            title: 'Готовые комплекты',
            description: 'Оптимальные решения на основе популярных серий шинопровода.',
            icon: <Package className="w-10 h-10 text-accent" />,
            image: '/image/category/kits-category-img-v.png',
            link: '/catalog/kits',
        },
    ];

    return (
        <section className="w-full dark:bg-gray-900 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-xl md:text-xl font-normal mb-12 text-gray-500 dark:text-white">
                    [ Ассортимент ]
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {categories.map((cat, index) => (
                        <Link
                            key={cat.title}
                            href={cat.link}
                            className={`group relative dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                                ${
                                    index === 1
                                        ? 'bg-foreground text-white shadow-lg'
                                        : 'bg-neutral-50'
                                }`}
                        >
                            {/* Фоновое изображение только для второй карточки */}
                            {index === 1 && (
                                <Image
                                    src="/image/category/cart-category-bg-img.png"
                                    alt="фон карточки"
                                    fill
                                    className="object-cover object-center z-0 pointer-events-none opacity-80 "
                                />
                            )}

                            <div className=" relative z-20">
                                <h3 className="text-xl lg:text-2xl font-semibold mb-3 dark:text-white">
                                    {cat.title}
                                </h3>
                                <p className="mb-6">{cat.description}</p>
                                <div className="flex justify-center mb-6 z-9">
                                    <div
                                        className={`${
                                            index === 1
                                                ? 'flex items-center justify-center p-4'
                                                : 'bg-foreground group-hover:bg-accent rounded-full p-4 flex items-center justify-center transition-all duration-300'
                                        }`}
                                    >
                                        <Image
                                            src={cat.image}
                                            alt={cat.title}
                                            width={index === 1 ? 400 : 100}
                                            height={index === 1 ? 100 : 100}
                                            className="object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <span className="inline-block text-green-500 font-medium group-hover:underline">
                                Подробнее →
                            </span> */}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
