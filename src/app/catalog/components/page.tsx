import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ComponentsPage() {
    const components = await prisma.component.findMany();

    return (
        <main className="p-10 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Комплектующие</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((c) => (
                    <li key={c.id} className="card p-4 rounded-xl shadow">
                        <h2 className="font-semibold text-lg mb-2">{c.name}</h2>
                        <p className="text-muted text-sm">{JSON.stringify(c.specs)}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
