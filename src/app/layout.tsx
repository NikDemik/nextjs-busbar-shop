import '../styles/globals.css';
import { ReactNode } from 'react';
import { Roboto, Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const roboto = Roboto({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '700'], // или любые нужные
    display: 'swap',
    variable: '--font-roboto',
});

const manrope = Manrope({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '700'], // или любые нужные
    display: 'swap',
    variable: '--font-manrope',
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru" className={manrope.className}>
            <body className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
