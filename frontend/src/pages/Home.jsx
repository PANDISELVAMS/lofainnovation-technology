import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import ProductsGrid from "../components/ProductsGrid";
import LaunchBanner from "../components/LaunchBanner";
import Portfolio from "../components/Portfolio";
import ClientShowcase from "../components/ClientShowcase";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import TechStack from "../components/TechStack";


export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesGrid />
      <TechStack />
      <Portfolio limit={2} />
      <LaunchBanner />
      <ProductsGrid />
      <ClientShowcase />
      <Testimonials />
    </>
  );
}
