
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import AudienceSection from "@/components/AudienceSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      <HeroSection />
      <AudienceSection />
      <FeaturesShowcase />
      <Footer />
    </div>
  );
}
