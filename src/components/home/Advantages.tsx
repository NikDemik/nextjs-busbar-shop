// components/Advantages.tsx
'use client';

import { ShieldCheck, Clock, Wrench, FileCheck, Truck, Users } from 'lucide-react';

export default function Advantages() {
    const advantages = [
        {
            title: 'Сертифицированная продукция',
            description:
                'Вся продукция соответствует техническим требованиям и проходит контроль качества.',
            icon: <FileCheck className="w-10 h-10 text-green-500" />,
        },
        {
            title: 'Быстрая поставка',
            description:
                'Готовые решения и отлаженная логистика позволяют минимизировать сроки доставки.',
            icon: <Truck className="w-10 h-10 text-green-500" />,
        },
        {
            title: 'Индивидуальные решения',
            description: 'Разрабатываем комплекты под конкретные задачи и параметры проекта.',
            icon: <Wrench className="w-10 h-10 text-green-500" />,
        },
        {
            title: 'Надёжность и долговечность',
            description: 'Используем проверенные материалы и конструктивные решения.',
            icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
        },
    ];

    return (
        <section className="w-full bg-white dark:bg-gray-950 py-20 border-t border-gray-100 dark:border-gray-800">
            <div className="container-padding mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                    Почему выбирают нас
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {advantages.map((item) => (
                        <div
                            key={item.title}
                            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent "
                        >
                            <div className="flex justify-center mb-6">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
