'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Moon, Sun, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [catalogOpen, setCatalogOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Логотип */}
                <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Шинопровод
                </Link>

                {/* Навигация */}
                <nav className="hidden md:flex gap-6 items-center">
                    <div className="relative">
                        <button
                            onClick={() => setCatalogOpen(!catalogOpen)}
                            className="hover:text-blue-600 transition"
                        >
                            Каталог ▾
                        </button>
                        {catalogOpen && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50"
                                >
                                    <Link
                                        href="/catalog"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Все товары
                                    </Link>
                                    <Link
                                        href="/catalog/busbars"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Шинопроводы
                                    </Link>
                                    <Link
                                        href="/catalog/components"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Комплектующие
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                    <Link href="/constructor" className="hover:text-blue-600 transition">
                        Конструктор
                    </Link>
                    <Link href="/news" className="hover:text-blue-600 transition">
                        Новости
                    </Link>
                    <Link href="/docs" className="hover:text-blue-600 transition">
                        Документация
                    </Link>
                    <Link href="/about" className="hover:text-blue-600 transition">
                        О нас
                    </Link>
                </nav>

                {/* Контакты и действия */}
                <div className="hidden md:flex items-center gap-4">
                    <a href="tel:+79998887766" className="text-sm hover:underline">
                        +7 (999) 888-77-66
                    </a>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                        Запрос
                    </button>
                    <button onClick={toggleDarkMode} className="ml-2">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Мобильное меню */}
                <div className="md:hidden flex items-center gap-2">
                    <button onClick={toggleDarkMode}>
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Мобильное меню (выпадающее) */}
            {menuOpen && (
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden bg-white dark:bg-gray-900 shadow-md px-4 space-y-2 overflow-hidden"
                        >
                            <details className="group pt-2">
                                <summary className="cursor-pointer hover:text-blue-600">
                                    Каталог
                                </summary>
                                <div className="pl-4 text-sm space-y-1">
                                    <Link href="/catalog" className="block hover:text-blue-600">
                                        Все товары
                                    </Link>
                                    <Link
                                        href="/catalog/busbars"
                                        className="block hover:text-blue-600"
                                    >
                                        Шинопроводы
                                    </Link>
                                    <Link
                                        href="/catalog/components"
                                        className="block hover:text-blue-600"
                                    >
                                        Комплектующие
                                    </Link>
                                </div>
                            </details>
                            <Link href="/constructor" className="block hover:text-blue-600">
                                Конструктор
                            </Link>
                            <Link href="/news" className="block hover:text-blue-600">
                                Новости
                            </Link>
                            <Link href="/docs" className="block hover:text-blue-600">
                                Документация
                            </Link>
                            <Link href="/about" className="block hover:text-blue-600">
                                О нас
                            </Link>
                            <a
                                href="tel:+79998887766"
                                className="block pt-2 text-sm hover:underline"
                            >
                                +7 (999) 888-77-66
                            </a>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                                Запрос
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </header>
    );
}
