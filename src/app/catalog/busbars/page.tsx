import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function BusbarsPage() {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: {
                    startsWith: 'busbar', // 👈 можно настраивать
                },
            },
        },
        include: {
            category: true,
        },
    });

    return (
        <main className="p-10 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Шинопроводы</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <li key={p.id} className="card p-4 rounded-xl shadow">
                        <h2 className="font-semibold text-lg mb-2">{p.name}</h2>
                        <p className="text-muted text-sm">{p.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
