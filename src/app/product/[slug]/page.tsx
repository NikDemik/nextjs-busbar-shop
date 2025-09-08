// /app/product/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface PageProps {
    params: { slug: string };
}

// --- ✅ SEO-метаданные ---
export async function generateMetadata({ params }: PageProps) {
    const product = await prisma.busbar.findUnique({
        where: { slug: params.slug },
        include: { series: true },
    });

    if (!product) return {};

    const title = `${product.name}${product.series ? ' – ' + product.series.name : ''}`;
    const description = product.description || 'Качественные шинопроводы и комплектующие';
    const image = product.imageUrl || '/images/placeholder.jpg';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: image }],
            type: 'website',
        },
    };
}

// --- Основной рендер страницы ---
export default async function ProductPage({ params }: PageProps) {
    const slug = params.slug;

    // Пробуем найти среди продуктов (включая busbars и kits)
    let item =
        (await prisma.busbar.findUnique({
            where: { slug },
            include: {
                category: true,
                series: true,
                brand: true,
                components: { include: { component: true } },
            },
        })) ||
        // Пробуем найти среди комплектующих
        (await prisma.component.findUnique({
            where: { slug },
        }));

    if (!item) return notFound();

    const isProduct = 'category' in item;
    const isKit = isProduct && item.category?.slug === 'kits';

    // --- ✅ Structured Data (JSON-LD) ---
    const productJsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: item.name,
        description: item.description,
        image: item.imageUrl || '/images/placeholder.jpg',
        brand: item.brand ? item.brand.name : 'Свой бренд',
        sku: item.slug,
        offers: {
            '@type': 'Offer',
            url: `https://yourdomain.com/product/${item.slug}`,
            availability: 'https://schema.org/InStock',
            priceCurrency: 'RUB',
            // 👇 если будет цена в БД — подставим, пока заглушка
            price: '0.00',
        },
    };

    const placeholder = '/images/placeholder.jpg'; // 👈 сделай любое дефолтное изображение

    return (
        <main className="p-10 max-w-screen-xl mx-auto">
            {/* 👇 Structured Data вставляем в head через script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                    <img
                        src={item.imageUrl ?? placeholder}
                        alt={item.name}
                        className="rounded-lg w-full max-h-96 object-contain bg-white"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{item.name}</h1>

                    {/* Серия только для шинопроводов */}
                    {isProduct && !isKit && item.series && (
                        <p className="mb-4">Серия: {item.series.name}</p>
                    )}

                    {/* Категория для всех */}
                    {/* {isProduct && (
                        <p className="mb-2 text-sm text-muted">Категория: {item.category?.name}</p>
                    )} */}

                    <p className="mb-6">{item.description}</p>

                    <div className="mb-4">
                        <strong>Характеристики:</strong>
                        <ul className="mt-2 space-y-1">
                            {Object.entries(item.specs || {})
                                .filter(
                                    ([_, value]) =>
                                        value !== null && value !== undefined && value !== '',
                                )
                                .map(([key, value]) => (
                                    <li key={key} className="flex gap-2 text-sm">
                                        <span className="font-medium">{key}:</span>
                                        <span>{String(value)}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <button className="btn btn-accent">Запросить</button>
                        <button className="btn btn-outline">В корзину</button>
                    </div>

                    {'drawingUrl' in item && item.drawingUrl && (
                        <Link
                            href={item.drawingUrl}
                            className="text-sm text-[var(--color-accent)] hover:underline"
                        >
                            📐 Скачать документацию
                        </Link>
                    )}
                </div>
            </div>

            {/* Комплектация: для шинопроводов и готовых комплектов */}
            {isProduct && item.components?.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-2">
                        {isKit ? 'Состав комплекта:' : 'Комплектация:'}
                    </h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {item.components.map((c) => (
                            <li key={c.id} className="p-4 border rounded shadow-sm">
                                <div className="font-semibold">{c.component.name}</div>
                                <div className="text-sm text-muted">x{c.quantity}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    );
}
