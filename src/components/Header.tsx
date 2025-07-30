'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import contactData from '@/lib/contactData';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [catalogOpen, setCatalogOpen] = useState(false);

    const pathname = usePathname();
    const isActive = (path: string) => pathname.startsWith(path);

    return (
        <header className="w-full z-50">
            {/* ВЕРХНЯЯ ПОЛОСА */}
            <div className="bg-[#132d2d] text-white text-sm">
                <div className="container-padding flex justify-end items-center h-9 gap-6">
                    <a
                        href={`tel:${contactData.phone}`}
                        className="flex items-center gap-1 hover:underline"
                    >
                        <Phone size={14} /> {contactData.phone}
                    </a>
                    <a
                        href={`mailto:${contactData.email}`}
                        className="flex items-center gap-1 hover:underline"
                    >
                        <Mail size={14} /> {contactData.email}
                    </a>
                </div>
            </div>

            {/* ОСНОВНОЙ ХЕДЕР */}
            <div className="header shadow-sm">
                <div className="container-padding py-4 flex items-center justify-between">
                    {/* ЛОГОТИП */}
                    <Link href="/" className="text-xl font-bold tracking-wide text-white">
                        Троллейный шинопровод
                    </Link>

                    {/* ДЕСКТОП МЕНЮ */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white relative">
                        {/* КАТАЛОГ С ВЫПАДАЮЩИМ МЕНЮ */}
                        <div
                            onMouseEnter={() => setCatalogOpen(true)}
                            onMouseLeave={() => setCatalogOpen(false)}
                            className="relative"
                        >
                            <button className="hover:underline">Каталог</button>
                            <AnimatePresence>
                                {catalogOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-56 bg-white text-[var(--color-text)] rounded-lg shadow-soft z-50"
                                    >
                                        <Link
                                            href="/catalog"
                                            className="block px-4 py-2 hover:bg-[var(--color-bg-soft)]"
                                        >
                                            Все товары
                                        </Link>
                                        <Link
                                            href="/catalog/busbars"
                                            className="block px-4 py-2 hover:bg-[var(--color-bg-soft)]"
                                        >
                                            Шинопроводы
                                        </Link>
                                        <Link
                                            href="/catalog/components"
                                            className="block px-4 py-2 hover:bg-[var(--color-bg-soft)]"
                                        >
                                            Комплектующие
                                        </Link>
                                        <Link
                                            href="/catalog/kits"
                                            className="block px-4 py-2 hover:bg-[var(--color-bg-soft)]"
                                        >
                                            Готовые комплекты
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href="/constructor"
                            className="isActive('/constructor') ? 'underline font-semibold' : 'hover:underline'"
                        >
                            Конструктор
                        </Link>
                        <Link
                            href="/news"
                            className="isActive('/news') ? 'underline font-semibold' : 'hover:underline'"
                        >
                            Новости
                        </Link>
                        <Link
                            href="/docs"
                            className="isActive('/docs') ? 'underline font-semibold' : 'hover:underline'"
                        >
                            Документация
                        </Link>
                        <Link
                            href="/about"
                            className="isActive('/about') ? 'underline font-semibold' : 'hover:underline'"
                        >
                            О нас
                        </Link>
                        <Link
                            href="/contacts"
                            className="isActive('/contacts') ? 'underline font-semibold' : 'hover:underline'"
                        >
                            Контакты
                        </Link>
                        <Link href="/request" className="btn ml-4 text-sm">
                            Запрос
                        </Link>
                    </nav>

                    {/* МОБИЛЬНЫЙ БУРГЕР */}
                    <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* МОБИЛЬНОЕ МЕНЮ */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.nav
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden bg-[var(--color-primary)] px-6 pb-4 space-y-3 text-sm text-white"
                        >
                            <details className="group">
                                <summary className="cursor-pointer py-2 hover:underline">
                                    Каталог
                                </summary>
                                <div className="pl-4 mt-1 space-y-1">
                                    <Link href="/catalog" className="block hover:underline">
                                        Все товары
                                    </Link>
                                    <Link href="/catalog/busbars" className="block hover:underline">
                                        Шинопроводы
                                    </Link>
                                    <Link
                                        href="/catalog/components"
                                        className="block hover:underline"
                                    >
                                        Комплектующие
                                    </Link>
                                    <Link
                                        href="/catalog/kits"
                                        className="block px-4 py-2 hover:bg-[var(--color-bg-soft)]"
                                    >
                                        Готовые комплекты
                                    </Link>
                                </div>
                            </details>
                            <Link href="/constructor" className="block">
                                Конструктор
                            </Link>
                            <Link href="/news" className="block">
                                Новости
                            </Link>
                            <Link href="/docs" className="block">
                                Документация
                            </Link>
                            <Link href="/about" className="block">
                                О нас
                            </Link>
                            <Link href="/contacts" className="block">
                                Контакты
                            </Link>
                            <Link href="/request" className="btn block text-center mt-3">
                                Запрос
                            </Link>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
