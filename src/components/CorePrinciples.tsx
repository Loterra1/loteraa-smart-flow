
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
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden min-h-screen"
      style={{ 
        backgroundColor: '#000000 !important',
        background: '#000000 !important',
        color: '#ffffff'
      }}
    >
      {/* Multiple layer black background enforcement */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          backgroundColor: '#000000 !important',
          background: '#000000 !important',
          zIndex: -100
        }}
      />
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundColor: '#000000 !important',
          background: '#000000 !important',
          zIndex: -10
        }}
      />
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        {/* Main AI Model Training Section - Made more prominent */}
        <div className="max-w-7xl mx-auto mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Text content - Enhanced visibility */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-6 lg:mb-8 uppercase leading-tight tracking-wide">
                AI MODEL TRAINING VIA ON-CHAIN DATA
              </h2>
              <div className="space-y-4 lg:space-y-6">
                <p className="text-white/90 leading-relaxed text-base sm:text-lg lg:text-xl xl:text-2xl font-medium">
                  AI projects can train their models using decentralized, verified data from Loteraa's IoT network.
                </p>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl">
                  Researchers upload sensor feeds like weather, motion, CO2 levels validated by smart contracts and 
                  rewarded through token incentives.
                </p>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl">
                  Models are trained using data or real-time feeds, creating a trustless AI pipeline that revolutionizes 
                  how artificial intelligence systems access and utilize real-world data.
                </p>
              </div>
            </div>
            
            {/* Right side - Enhanced animation container */}
            <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div 
                className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-xl overflow-hidden border border-white/10"
                style={{ 
                  backgroundColor: '#000000 !important',
                  background: '#000000 !important'
                }}
              >
                <GenerativeArtAnimation />
                {/* Optional overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Cards Section */}
        <FeatureCards />
      </div>
    </section>
  );
}
