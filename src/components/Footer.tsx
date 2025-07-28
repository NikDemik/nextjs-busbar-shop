import Link from 'next/link';
import { Phone, Mail, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import contactData from '@/lib/contactData';

export default function Footer() {
    return (
        <footer className="bg-[var(--color-primary)] text-white text-sm">
            <div className="container-padding py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Лого и текст */}
                <div>
                    <h2 className="text-xl font-bold mb-2">Троллейный.рф</h2>
                    <p className="text-muted">
                        Надежные решения для троллейных шинопроводов. Работаем с B2B-сегментом по
                        всей России.
                    </p>
                    <div className="flex gap-3 mt-4">
                        <a href="#">
                            <Facebook size={18} />
                        </a>
                        <a href="#">
                            <Twitter size={18} />
                        </a>
                        <a href="#">
                            <Youtube size={18} />
                        </a>
                        <a href="#">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* Навигация */}
                <div>
                    <h4 className="font-semibold mb-2">Навигация</h4>
                    <ul className="space-y-1">
                        <li>
                            <Link href="/catalog" className="hover:underline">
                                Каталог
                            </Link>
                        </li>
                        <li>
                            <Link href="/constructor" className="hover:underline">
                                Конструктор
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className="hover:underline">
                                Новости
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs" className="hover:underline">
                                Документация
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Контакты */}
                <div>
                    <h4 className="font-semibold mb-2">Контакты</h4>
                    <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                            <Phone size={14} /> {contactData.phone}
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={14} /> {contactData.email}
                        </li>
                        <li>{contactData.workingHours}</li>
                    </ul>
                </div>

                {/* Подписка */}
                <div>
                    <h4 className="font-semibold mb-2">Подписка на новости</h4>
                    <form className="flex flex-col gap-2">
                        <input type="email" placeholder="Email" className="input" />
                        <button type="submit" className="btn w-fit">
                            Подписаться
                        </button>
                    </form>
                </div>
            </div>
            <div className="text-center py-4 border-t border-white/10 text-xs opacity-80">
                © 2025 Троллейный.рф — Все права защищены.
            </div>
        </footer>
    );
}
