import { notFound } from 'next/navigation';
import { PrismaClient } from '@/generated/prisma';
import Image from 'next/image';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const category = await prisma.category.findUnique({
        where: { slug: params.slug },
        include: {
            products: {
                include: {
                    components: {
                        include: {
                            component: true,
                        },
                    },
                },
            },
        },
    });

    if (!category) return notFound();

    return (
        <main className="bg-[var(--color-bg)] text-[var(--color-text)] py-12">
            <div className="container-padding max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-muted mb-6">В категории: {category.products.length} товаров</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product) => (
                        <div key={product.id} className="card hover:shadow-lg transition-shadow">
                            {/* Картинка */}
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                            />
                            {/* Название и описание */}
                            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                            <p className="text-muted text-sm line-clamp-2 mb-2">
                                {product.description}
                            </p>
                            {/* Компоненты */}
                            <div className="text-xs text-muted mb-3">
                                <strong>Комплектация:</strong>{' '}
                                {product.components.map((c) => c.component.name).join(', ') || '—'}
                            </div>
                            <Link href={`/product/${product.slug}`} className="btn w-full text-sm">
                                Подробнее
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
