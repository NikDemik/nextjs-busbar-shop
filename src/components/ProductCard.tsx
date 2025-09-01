import Link from 'next/link';

interface ProductCardProps {
    name: string;
    description: string;
    slug: string;
    imageUrl?: string;
    seriesName?: string;
}

export function ProductCard({ name, description, slug, imageUrl, seriesName }: ProductCardProps) {
    return (
        <div className="card hover:shadow-lg transition">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-40 object-cover rounded mb-4 bg-white"
                />
            )}
            <h2 className="text-lg font-semibold mb-2">{name}</h2>
            {seriesName && <p className="text-xs text-muted mb-1">Серия: {seriesName}</p>}
            <p className="text-muted text-sm mb-4">{description}</p>
            <Link
                href={`/product/${slug}`}
                className="inline-block text-[var(--color-accent)] hover:underline"
            >
                Подробнее →123
            </Link>
        </div>
    );
}
