'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Иван Петров',
        company: 'Завод ЭлектроСнаб',
        text: 'Сотрудничаем уже более 3 лет. Шинопроводы отличного качества, всё поставляется точно в срок. Рекомендуем!',
        avatar: '/images/avatars/petrov.jpg',
    },
    {
        name: 'Анна Кузнецова',
        company: 'ТехноПром',
        text: 'Конфигуратор шинопровода — просто находка. Подобрали комплект за 5 минут, всё идеально подошло.',
        avatar: '/images/avatars/kuznetsova.jpg',
    },
];

const projects = [
    {
        title: 'Производственный комплекс “МеталлПром”',
        image: '/images/projects/project-1.jpg',
    },
    {
        title: 'Логистический центр “СеверТранс”',
        image: '/images/projects/project-2.jpg',
    },
    {
        title: 'Автозавод “ВолгаМаш”',
        image: '/images/projects/project-3.jpg',
    },
];

export default function TestimonialsProjectsSection() {
    return (
        <section className="w-full py-24 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="max-w-6xl mx-auto px-6">
                {/* Заголовок */}
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Отзывы и реализованные проекты
                </motion.h2>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Отзывы */}
                    <div className="flex flex-col gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative overflow-hidden"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Quote className="absolute top-4 right-4 w-6 h-6 text-green-400 opacity-40" />
                                <p className="text-gray-700 dark:text-gray-300 mb-6">{t.text}</p>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={t.avatar}
                                        alt={t.name}
                                        width={50}
                                        height={50}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {t.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {t.company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Проекты */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {projects.map((p, i) => (
                            <motion.div
                                key={i}
                                className="relative rounded-2xl overflow-hidden group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Image
                                    src={p.image}
                                    alt={p.title}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                                    <p className="text-white font-semibold">{p.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
