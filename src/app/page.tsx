import AboutCompany from '@/components/home/AboutCompany';
import Advantages from '@/components/home/Advantages';
import BrandLogo from '@/components/home/BrandLogo';
import CallToActionSection from '@/components/home/CallToAction';
import ConfiguratorBlock from '@/components/home/ConfiguratorBlock';
import Documentation from '@/components/home/Documentation';
import HeroBanner from '@/components/home/HeroBanner';
import PopularProducts from '@/components/home/PopularProducts';
import PopularSeries from '@/components/home/PopularSeries';
import ProductCategories from '@/components/home/ProductCategories';
import TestimonialsProjectsSection from '@/components/home/TestimonialsProject';

export default function HomePage() {
    return (
        <div>
            <HeroBanner />
            <ProductCategories />
            <BrandLogo />
            <PopularProducts />
            <Advantages />
            <PopularSeries />
            <ConfiguratorBlock />
            <AboutCompany />
            <Documentation />
            <TestimonialsProjectsSection />
            <CallToActionSection />
        </div>
    );
}
