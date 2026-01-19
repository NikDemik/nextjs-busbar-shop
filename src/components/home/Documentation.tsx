'use client';
import { FileText, Download, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const documents = [
    {
        title: 'Каталог продукции 2025',
        description: 'Подробное описание шинопроводов и комплектующих.',
        icon: FileText,
        file: '/docs/catalog-2025.pdf',
    },
    {
        title: 'Сертификат соответствия',
        description: 'Подтверждает соответствие стандартам качества и безопасности.',
        icon: ShieldCheck,
        file: '/docs/certificate.pdf',
    },
    {
        title: 'Инструкция по монтажу',
        description: 'Руководство по установке шинопровода и комплектующих.',
        icon: FileText,
        file: '/docs/installation-guide.pdf',
    },
];

export default function DocumentsSection() {
    return (
        <section className="w-full py-24 bg-foreground text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Документация и сертификаты
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {documents.map((doc, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800/50 rounded-2xl shadow-lg p-8 text-left flex flex-col justify-between transition hover:bg-gray-800 hover:shadow-xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div>
                                <doc.icon className="w-10 h-10 text-green-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                                <p className="text-gray-400 text-sm">{doc.description}</p>
                            </div>
                            <a
                                href={doc.file}
                                download
                                className="mt-6 inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition text-sm font-medium"
                            >
                                <Download className="w-4 h-4" />
                                Скачать PDF
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
