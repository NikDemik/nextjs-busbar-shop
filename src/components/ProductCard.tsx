import Link from 'next/link';

interface ProductCardProps {
    name: string;
    description: string;
    slug: string;
    imageUrl?: string;
    seriesName?: string;
}

export function ProductCard({ name, description, slug, imageUrl, seriesName }: ProductCardProps) {
    const placeholder = '/images/placeholder.jpg'; // 👈 сделай любое дефолтное изображение

    return (
        <div key={slug} className="card ">
            <img
                src={imageUrl ?? placeholder}
                alt={name}
                className="w-full h-48 object-cover mb-4 bg-white rounded-t"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                {seriesName && <p className="text-sm text-muted mb-1">Серия: {seriesName}</p>}
                <p className="text-muted text-sm mb-4">{description}</p>
                <Link
                    href={`/product/${slug}`}
                    className="inline-block text-[var(--color-accent)] hover:underline"
                >
                    Подробнее →
                </Link>
            </div>
        </div>
    );
}
