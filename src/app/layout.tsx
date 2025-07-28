import '../styles/globals.css';
import { ReactNode } from 'react';
import { Roboto, Inter, Manrope } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const inter = Inter({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '700'], // или любые нужные
    display: 'swap',
    variable: '--font-inter',
});

const manrope = Manrope({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '700'], // или любые нужные
    display: 'swap',
    variable: '--font-manrope',
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru" className={inter.className}>
            <body className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
