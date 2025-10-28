import Link from 'next/link';
import Image from 'next/image';

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
        <div key={slug} className="card group">
            <div className="relative w-full h-56">
                <Image
                    src={imageUrl || '/placeholder.jpg'}
                    alt={name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6 text-left">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                {seriesName && <p className="text-sm text-muted mb-1">Серия: {seriesName}</p>}
                <p className="text-muted text-sm mb-4 flex-grow">{description}</p>
                <Link
                    href={`/product/${slug}`}
                    className="inline-block text-accent hover:underline"
                >
                    Подробнее →
                </Link>
            </div>
        </div>
    );
}
