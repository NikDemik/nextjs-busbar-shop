import HeroBanner from '@/components/home/HeroBanner';
import { inView } from 'framer-motion';
import { div } from 'framer-motion/client';

export default function HomePage() {
    return (
        <div>
            <HeroBanner />
            <div className="py-12 container-padding mx-auto">
                <h1 className="text-3xl font-bold">Троллейный шинопровод онлайн</h1>
                <p className="mt-4 text-lg">
                    Промышленный B2B-магазин по продаже шинопроводов и комплектующих
                </p>
            </div>
        </div>
    );
}
