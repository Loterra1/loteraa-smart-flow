
import { useEffect, useRef, useState } from "react";
import AIModelAnimation from "./AIModelAnimation";

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
            // Animate cards in sequence with delays
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
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* P5.js animation covering entire section */}
      <AIModelAnimation />
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase">
              AI Model Training via On-Chain Data
            </h2>
            <p className="text-white leading-relaxed text-lg">
              AI projects can train their models using decentralized, verified data from Loteraa's IoT network. 
              Researchers upload sensor feeds like weather, motion, CO2 levels validated by smart contracts and 
              rewarded through token incentives. Models are trained using data or real-time feeds, creating a 
              trustless AI pipeline.
            </p>
          </div>
          
          {/* Right side - Image with P5.js animation */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
              {/* Background image */}
              <img 
                src="/lovable-uploads/abde815c-1ff0-4f96-af89-2322637fb540.png" 
                alt="AI Model Training Visualization" 
                className="absolute inset-0 w-full h-full object-contain opacity-70 z-20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
