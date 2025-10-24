'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { motion } from 'framer-motion';

const logos = [
    { name: 'Giovenzana', image: '/image/logos/giovenzana.svg' },
    { name: 'Anneng', image: '/image/logos/anneng.svg' },
    { name: 'Современные технологии', image: '/image/logos/sovremenyi-tehnologii.svg' },
    { name: 'Giovenzana', image: '/image/logos/giovenzana.svg' },
    { name: 'Anneng', image: '/image/logos/anneng.svg' },
    { name: 'Современные технологии', image: '/image/logos/sovremenyi-tehnologii.svg' },
    { name: 'Giovenzana', image: '/image/logos/giovenzana.svg' },
];

export default function BrandLogo() {
    return (
        <section className="w-full bg-white dark:bg-gray-950 py-20 overflow-x-clip">
            <div className="container-padding">
                <div className=" flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        animate={{
                            x: '-50%',
                        }}
                        transition={{
                            duration: 25,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                        className="flex flex-none gap-24 pr-24 items-center"
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Fragment key={i}>
                                {logos.map((logo) => (
                                    <Image
                                        src={logo.image}
                                        alt={logo.name}
                                        width={200}
                                        height={100}
                                        className=" grayscale hover:grayscale-0 transition "
                                    />
                                ))}
                            </Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
