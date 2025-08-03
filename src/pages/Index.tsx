
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import CorePrinciples from "@/components/CorePrinciples";
import FeaturesSection from "@/components/FeaturesSection";
import AudienceSection from "@/components/AudienceSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="w-full bg-black">
      {/* Additional black background layer */}
      <div 
        className="fixed inset-0 w-full h-full bg-black"
        style={{ 
          backgroundColor: '#000000',
          background: '#000000',
          zIndex: -999
        }}
      />
      <div className="relative w-full bg-black">
        <NavigationHeader />
        <main className="relative w-full bg-black">
          <HeroSection />
          <CorePrinciples />
          <FeaturesSection />
          <AudienceSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
