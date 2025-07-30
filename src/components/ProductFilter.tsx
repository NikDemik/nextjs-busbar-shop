'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function ProductFilter() {
    const router = useRouter();
    const search = useSearchParams();

    const amperage = search.get('amperage') || '';

    const handleChange = (value: string) => {
        const params = new URLSearchParams(search.toString());
        if (value) params.set('amperage', value);
        else params.delete('amperage');
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="mb-6 flex gap-4">
            <select
                value={amperage}
                onChange={(e) => handleChange(e.target.value)}
                className="border rounded px-4 py-2"
            >
                <option value="">Все амперажи</option>
                <option value="60">60А</option>
                <option value="100">100А</option>
            </select>
        </div>
    );
}
