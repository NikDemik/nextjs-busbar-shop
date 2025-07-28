'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [catalogOpen, setCatalogOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="w-full bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm sticky top-0 z-50">
            <div className="container-padding py-4 flex items-center justify-between">
                {/* Логотип */}
                <Link href="/" className="text-xl font-bold text-primary">
                    Шинопровод
                </Link>

                {/* Десктоп навигация */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <div className="relative">
                        <button
                            onClick={() => setCatalogOpen(!catalogOpen)}
                            className="hover:text-primary transition"
                        >
                            Каталог
                        </button>
                        <AnimatePresence>
                            {catalogOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-2 w-52 bg-[var(--color-surface)] shadow-soft rounded-lg p-2 z-50"
                                >
                                    <Link
                                        href="/catalog"
                                        className="block px-3 py-2 hover:bg-[var(--color-bg-soft)] rounded"
                                    >
                                        Все товары
                                    </Link>
                                    <Link
                                        href="/catalog/busbars"
                                        className="block px-3 py-2 hover:bg-[var(--color-bg-soft)] rounded"
                                    >
                                        Шинопроводы
                                    </Link>
                                    <Link
                                        href="/catalog/components"
                                        className="block px-3 py-2 hover:bg-[var(--color-bg-soft)] rounded"
                                    >
                                        Комплектующие
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Link href="/constructor" className="hover:text-primary transition">
                        Конструктор
                    </Link>
                    <Link href="/news" className="hover:text-primary transition">
                        Новости
                    </Link>
                    <Link href="/docs" className="hover:text-primary transition">
                        Документация
                    </Link>
                    <Link href="/about" className="hover:text-primary transition">
                        О нас
                    </Link>

                    {/* Контакты */}
                    <a href="tel:+79998887766" className="text-muted text-sm">
                        +7 (999) 888-77-66
                    </a>

                    {/* Кнопка запроса */}
                    <Link href="/request" className="btn-accent transition-base">
                        Запрос
                    </Link>

                    {/* Переключатель темы */}
                    <button
                        onClick={toggleTheme}
                        className="ml-2 text-muted hover:text-primary transition"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </nav>

                {/* Мобильное меню и бургер */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Мобильное меню */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[var(--color-surface)] px-6 py-4 space-y-3 text-sm"
                    >
                        <details>
                            <summary className="cursor-pointer text-muted">Каталог</summary>
                            <div className="pl-4 space-y-1 mt-1">
                                <Link href="/catalog" className="block hover:text-primary">
                                    Все товары
                                </Link>
                                <Link href="/catalog/busbars" className="block hover:text-primary">
                                    Шинопроводы
                                </Link>
                                <Link
                                    href="/catalog/components"
                                    className="block hover:text-primary"
                                >
                                    Комплектующие
                                </Link>
                            </div>
                        </details>
                        <Link href="/constructor" className="block hover:text-primary">
                            Конструктор
                        </Link>
                        <Link href="/news" className="block hover:text-primary">
                            Новости
                        </Link>
                        <Link href="/docs" className="block hover:text-primary">
                            Документация
                        </Link>
                        <Link href="/about" className="block hover:text-primary">
                            О нас
                        </Link>
                        <Link href="/request" className="btn-accent block text-center">
                            Запрос
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
