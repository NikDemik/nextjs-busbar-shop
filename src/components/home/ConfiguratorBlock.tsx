// components/ConfiguratorBlock.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FallingCubes from '../ui/fallingCubes';

export default function ConfiguratorBlock() {
    return (
        <section className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-24">
            <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row gap-4 items-center justify-between px-5">
                {/* Левая часть */}
                <div className="flex-1 text-center md:text-left space-y-6 z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl md:text-3xl lg:text-4xl text-start lg:leading-10"
                    >
                        Конфигуратор <span className="text-accent">шинопровода</span>
                    </motion.h2>
                    <p className="max-w-lg mx-auto md:mx-0">
                        Соберите комплект шинопровода под ваши параметры за 2 минуты. Укажите длину,
                        токопроводящие жилы, тип подвеса и получите готовое решение.
                    </p>
                    <Link href="/configurator" className="btn">
                        Открыть конфигуратор
                    </Link>
                </div>

                {/* Правая часть (изображение / иллюстрация) */}
                <div className="flex-1 mt-10 md:mt-0 flex justify-center relative z-10">
                    <FallingCubes />
                    {/* <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="w-full max-w-[448px] aspect-square relative"
                    >
                        <Image
                            src="/image/component/configurator.png" // помести изображение в public/images
                            alt="Конфигуратор шинопровода"
                            fill
                            className="object-contain drop-shadow-2xl rounded-2xl"
                        />
                    </motion.div> */}
                </div>

                <div className="z-0 pointer-events-none">
                    <Image
                        src="/image/component/section-bg-img.svg"
                        alt="Изображение фона"
                        width={1000}
                        height={1000}
                        className=" absolute -top-32 -left-40 opacity-5"
                    />
                </div>
            </div>
        </section>
    );
}
