import Hero from "../components/home/Hero";
import StatsStrip from "../components/home/StatsStrip";
import CategoryShowcase from "../components/home/CategoryShowcase";
import ProductRail from "../components/home/ProductRail";
import WhyChooseUs from "../components/home/WhyChooseUs";
import BenefitsSection from "../components/home/BenefitsSection";
import ProjectsShowcase from "../components/home/ProjectsShowcase";
import TestimonialsSection from "../components/home/TestimonialsSection";
import OffersTeaser from "../components/home/OffersTeaser";
import FaqTeaser from "../components/home/FaqTeaser";
import FinalCta from "../components/home/FinalCta";
import { products } from "../data/products";

const featured = products.filter((p) => p.badges?.includes("Featured")).slice(0, 8);
const bestSellers = products.filter((p) => p.badges?.includes("Best Seller")).slice(0, 8);

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <CategoryShowcase />
      <ProductRail
        eyebrow="Featured"
        title="Featured Products"
        description="Hand-picked systems and products our engineers recommend most often."
        products={featured}
        viewAllHref="/products?filter=featured"
      />
      <ProductRail
        eyebrow="Customer Favourites"
        title="Best Sellers"
        description="The products Indian homes and businesses are buying the most, right now."
        products={bestSellers}
        viewAllHref="/products?filter=bestseller"
        dark
      />
      <WhyChooseUs />
      <BenefitsSection />
      <ProjectsShowcase />
      <TestimonialsSection />
      <OffersTeaser />
      <FaqTeaser />
      <FinalCta />
    </>
  );
}
