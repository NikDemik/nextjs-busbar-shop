'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
    return (
        <section className="w-full bg-gradient text-white">
            <div className="container-padding-l mx-auto flex flex-col md:flex-row items-center justify-between ">
                {/* Левая часть */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <h1 className="text-4xl md:text-6xl uppercase font-bold leading-tight text-accent">
                        Современные решения шинопровода
                    </h1>
                    <p className="text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
                        Каталог шинопроводов, комплектующих и готовых решений для вашего бизнеса.
                    </p>
                    <Link href="/catalog" className="btn text-white px-6 py-3 shadow-md">
                        Перейти в каталог
                    </Link>
                </div>

                {/* Правая часть (картинка) */}
                <div className="flex-1 mt-10 md:mt-0 flex justify-center">
                    <Image
                        src="/image/banners/main.png" // положи картинку в public/images
                        alt="Баннер шинопровод"
                        width={1000}
                        height={600}
                        className=""
                    />
                </div>
            </div>
        </section>
    );
}
