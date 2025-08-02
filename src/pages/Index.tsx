
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import CorePrinciples from "@/components/CorePrinciples";
import FeaturesSection from "@/components/FeaturesSection";
import AudienceSection from "@/components/AudienceSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-black" 
      style={{ 
        backgroundColor: '#000000 !important',
        background: '#000000 !important'
      }}
    >
      <NavigationHeader />
      <main className="bg-black" style={{ backgroundColor: '#000000 !important' }}>
        <HeroSection />
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
