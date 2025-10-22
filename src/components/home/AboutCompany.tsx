// components/AboutCompany.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutCompany() {
    return (
        <section className="w-full bg-white dark:bg-gray-950 py-24 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
                {/* Левая часть (изображение) */}
                <div className="flex-1 relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src="/images/about-company.jpg" // добавь изображение в public/images
                        alt="Производство шинопровода"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Правая часть (текст) */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        О компании
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Мы специализируемся на проектировании, производстве и поставке шинопроводных
                        систем для промышленности, энергетики и инфраструктурных объектов. Наш опыт
                        и собственная инженерная база позволяют создавать надёжные решения под любые
                        задачи.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        За годы работы мы реализовали десятки проектов по всей стране — от малых
                        производств до крупных предприятий. Гарантируем качество, техническую
                        поддержку и соблюдение сроков поставки.
                    </p>
                    <Link
                        href="/about"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl shadow-md transition"
                    >
                        Подробнее о компании
                    </Link>
                </div>
            </div>
        </section>
    );
}
