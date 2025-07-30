
import { useEffect, useRef, useState } from "react";
import AIModelAnimation from "./AIModelAnimation";
import FeatureCards from "./FeatureCards";
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
        background: '#000000 !important'
      }}
    >
      {/* Black background layers */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div 
          key={index}
          className="absolute inset-0 w-full h-full"
          style={{ 
            backgroundColor: '#000000 !important',
            background: '#000000 !important',
            zIndex: index
          }}
        />
      ))}
      
      {/* Only render P5.js animation on desktop */}
      {!isMobile && (
        <div 
          className="absolute -inset-10 w-[calc(100%+5rem)] h-[calc(100%+5rem)]"
          style={{ 
            backgroundColor: '#000000 !important',
            background: '#000000 !important',
            zIndex: 5,
            overflow: 'hidden'
          }}
        >
          <AIModelAnimation />
        </div>
      )}
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 uppercase leading-tight">
              AI Model Training via On-Chain Data
            </h2>
            <p className="text-white leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl">
              AI projects can train their models using decentralized, verified data from Loteraa's IoT network. 
              Researchers upload sensor feeds like weather, motion, CO2 levels validated by smart contracts and 
              rewarded through token incentives. Models are trained using data or real-time feeds, creating a 
              trustless AI pipeline.
            </p>
          </div>
          
          {/* Right side - Animated Image with reduced brightness */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div 
              className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden"
              style={{ 
                backgroundColor: '#000000 !important',
                background: '#000000 !important'
              }}
            >
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: '#000000 !important',
                  background: '#000000 !important'
                }}
              />
              
              {/* Animated container with smooth motion */}
              <div 
                className="absolute inset-0 animate-gentle-sway"
                style={{
                  animation: 'gentle-sway 10s ease-in-out infinite'
                }}
              >
                <img 
                  src="/lovable-uploads/be2062d6-238d-49d9-bd0a-893d74c74d88.png" 
                  alt="AI Model Training Sphere Visualization" 
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out hover:scale-105 z-10"
                  style={{ 
                    filter: 'brightness(0.9) contrast(1.05)',
                    animation: 'float 8s ease-in-out infinite'
                  }}
                />
              </div>
              
              {/* Subtle static glow effect without blinking */}
              <div 
                className="absolute inset-0 opacity-10 z-5"
                style={{
                  background: 'radial-gradient(circle at center, rgba(113, 66, 246, 0.2), transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
        
        <FeatureCards />
      </div>
    </section>
  );
}
