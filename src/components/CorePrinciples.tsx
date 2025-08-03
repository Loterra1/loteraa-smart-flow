
import { useEffect, useRef, useState } from "react";
import FeatureCards from "./FeatureCards";
import GenerativeArtAnimation from "./animations/GenerativeArtAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CorePrinciples() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setVisibleCards(prev => [true, ...prev.slice(1)]), 600);
            setTimeout(() => setVisibleCards(prev => [prev[0], true, ...prev.slice(2)]), 900);
            setTimeout(() => setVisibleCards(prev => [...prev.slice(0, 2), true, prev[3]]), 1200);
            setTimeout(() => setVisibleCards(prev => [...prev.slice(0, 3), true]), 1500);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-16 lg:py-20 bg-black w-full"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* AI Model Training Section */}
        <div className="max-w-7xl mx-auto mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 lg:mb-12 uppercase leading-tight tracking-wide">
                AI MODEL TRAINING VIA ON-CHAIN DATA
              </h2>
              
              <div className="space-y-6">
                <p className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-medium">
                  AI projects can train their models using decentralized, verified data from Loteraa's IoT network.
                </p>
                
                <p className="text-white text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  Researchers upload sensor feeds like weather, motion, CO2 levels validated by smart contracts and 
                  rewarded through token incentives.
                </p>
                
                <p className="text-white text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  Models are trained using data or real-time feeds, creating a trustless AI pipeline that revolutionizes 
                  how artificial intelligence systems access and utilize real-world data.
                </p>
              </div>
            </div>
            
            {/* Right side - Animation */}
            <div className="relative">
              <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] rounded-xl overflow-hidden border border-white/20 bg-black">
                <GenerativeArtAnimation />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Cards Section */}
        <div>
          <FeatureCards />
        </div>
      </div>
    </section>
  );
}
