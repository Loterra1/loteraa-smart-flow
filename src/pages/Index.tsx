
import Hero from "@/components/Hero";
import AudienceSection from "@/components/AudienceSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <AudienceSection />
      <FeaturesShowcase />
      <Footer />
    </div>
  );
}
