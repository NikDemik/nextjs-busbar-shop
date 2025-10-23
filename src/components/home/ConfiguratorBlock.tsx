// components/ConfiguratorBlock.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ConfiguratorBlock() {
    return (
        <section className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                {/* Левая часть */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                        Конфигуратор шинопровода
                    </h2>
                    <p className="text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
                        Соберите комплект шинопровода под ваши параметры за 2 минуты. Укажите длину,
                        токопроводящие жилы, тип подвеса и получите готовое решение.
                    </p>
                    <Link
                        href="/configurator"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl shadow-md transition"
                    >
                        Открыть конфигуратор
                    </Link>
                </div>

                {/* Правая часть (изображение / иллюстрация) */}
                <div className="flex-1 mt-10 md:mt-0 flex justify-center relative">
                    <div className="w-[320px] h-[280px] relative">
                        <Image
                            src="/images/configurator-preview.png" // помести изображение в public/images
                            alt="Конфигуратор шинопровода"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
