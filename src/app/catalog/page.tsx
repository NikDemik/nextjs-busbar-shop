// /app/catalog/page.tsx
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function CatalogPage() {
    const categories = await prisma.category.findMany();

    return (
        <main className="bg-[var(--color-bg)] text-[var(--color-text)] py-12">
            <div className="container-padding mx-auto">
                <h1 className="text-3xl font-bold mb-4">Каталог продукции</h1>
                <p className="text-muted mb-10 max-w-2xl">
                    Здесь вы можете ознакомиться с продукцией, выбрать шинопровод под задачу или
                    собрать комплект в конструкторе.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/catalog/${cat.slug}`}
                            className="card hover:shadow-lg transition-shadow duration-200"
                        >
                            <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
                            <p className="text-muted text-sm mb-4">{cat.description}</p>
                            <div className="mt-auto text-[var(--color-accent)] font-medium hover:underline">
                                Смотреть →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
