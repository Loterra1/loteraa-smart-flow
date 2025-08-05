
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import CorePrinciples from "@/components/CorePrinciples";
import UseCasesSection from "@/components/UseCasesSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      <HeroSection />
      <CorePrinciples />
      <UseCasesSection />
      <Footer />
    </div>
  );
}
