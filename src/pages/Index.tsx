
import AdvancedBackground from "@/components/AdvancedBackground";
import AnimatedDataDots from "@/components/AnimatedDataDots";
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import CorePrinciples from "@/components/CorePrinciples";
import FeaturesSection from "@/components/FeaturesSection";
import AudienceSection from "@/components/AudienceSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <NavigationHeader />
      <main>
        <HeroSection />
        <VisionMissionSection />
        <CorePrinciples />
        <FeaturesSection />
        <AudienceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
