
import AdvancedBackground from "@/components/AdvancedBackground";
import AnimatedDataDots from "@/components/AnimatedDataDots";
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import CorePrinciples from "@/components/CorePrinciples";
import FeaturesSection from "@/components/FeaturesSection";
import AudienceSection from "@/components/AudienceSection";
import LotTokenSection from "@/components/LotTokenSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-black/95 to-loteraa-darkPurple/30">
      <AdvancedBackground />
      <AnimatedDataDots />
      <NavigationHeader />
      <main>
        <HeroSection />
        <CorePrinciples />
        <FeaturesSection />
        <AudienceSection />
        <LotTokenSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
