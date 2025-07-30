
import { useEffect, useRef, useState } from "react";
import AIModelAnimation from "./AIModelAnimation";
import FeatureCards from "./FeatureCards";

export default function CorePrinciples() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

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
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden min-h-screen bg-black"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Multiple layers of black background - critical for mobile */}
      <div 
        className="fixed inset-0 w-full h-full bg-black z-0" 
        style={{ backgroundColor: '#000000' }}
      />
      <div 
        className="absolute inset-0 w-full h-full bg-black z-0" 
        style={{ backgroundColor: '#000000' }}
      />
      <div 
        className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] bg-black z-0" 
        style={{ backgroundColor: '#000000' }}
      />
      
      {/* P5.js animation covering entire section */}
      <div className="absolute inset-0 w-full h-full z-1">
        <AIModelAnimation />
      </div>
      
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
          
          {/* Right side - Image with P5.js animation */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden bg-black">
              {/* Background image - more visible on mobile with black background fallback */}
              <div className="absolute inset-0 bg-black z-0" />
              <img 
                src="/lovable-uploads/abde815c-1ff0-4f96-af89-2322637fb540.png" 
                alt="AI Model Training Visualization" 
                className="absolute inset-0 w-full h-full object-contain opacity-30 sm:opacity-40 lg:opacity-50 z-10"
              />
            </div>
          </div>
        </div>
        
        {/* Feature Cards Section */}
        <FeatureCards />
      </div>
    </section>
  );
}
