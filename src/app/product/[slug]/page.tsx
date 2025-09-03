import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';

// export const dynamic = 'force-dynamic';

interface PageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
    const product = await prisma.busbar.findUnique({
        where: { slug: params.slug },
        include: { series: true, components: true },
    });

    if (!product) return notFound();

    return (
        <main className="p-10 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="rounded-lg w-full max-h-96 object-contain bg-white"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    {product.series && <p className="mb-4">Серия: {product.series.name}</p>}
                    <p className="mb-6">{product.description}</p>

                    <div className="mb-4">
                        <strong>Характеристики:</strong>
                        <pre className="bg-muted p-2 rounded text-sm whitespace-pre-wrap">
                            {JSON.stringify(product.specs, null, 2)}
                        </pre>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <button className="btn btn-accent">Запросить</button>
                        <button className="btn btn-outline">В корзину</button>
                    </div>

                    <Link
                        href={product.drawingUrl || '#'}
                        className="text-sm text-[var(--color-accent)] hover:underline"
                    >
                        📐 Скачать чертёж
                    </Link>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-2">Комплектация:</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.components.map((c) => (
                        <li key={c.id} className="p-4 border rounded shadow-sm">
                            <div className="font-semibold">{c.name}</div>
                            <div className="text-sm text-muted">x{c.description}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
