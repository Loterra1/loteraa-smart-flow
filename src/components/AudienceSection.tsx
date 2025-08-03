
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import GlobeMapAnimation from "./animations/GlobeMapAnimation";
import GrainyNoiseAnimation from "./animations/GrainyNoiseAnimation";
import CubeGenerativeAnimation from "./animations/CubeGenerativeAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AudienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
      className="py-12 md:py-20 bg-black w-full overflow-hidden"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Real-World → Web3 Integration Section */}
        <div className="py-8 md:py-12 relative">
          {/* Only render Grainy Noise Background on desktop */}
          {!isMobile && (
            <div className="absolute inset-0 w-full h-full opacity-20 bg-black pointer-events-none">
              <GrainyNoiseAnimation />
            </div>
          )}
          
          <div className="relative z-30 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Left side - Heading and Description */}
            <div className="flex-1 max-w-4xl lg:pr-8 text-center lg:text-left relative z-40">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 lg:mb-10 text-white uppercase leading-tight">
                <span className="text-white">Real-World → Web3</span> Integration
              </h2>
              <div className="space-y-4 md:space-y-6 relative z-50">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-relaxed font-medium opacity-100">
                  Loteraa is engineered to make the transition from physical device to smart contract seamless.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed opacity-100">
                  Through REST APIs, low-code scripts, and SDKs, developers can integrate off-chain data sources into on-chain logic without building complex middleware.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed opacity-100">
                  This revolutionary approach bridges the gap between IoT devices and blockchain technology, enabling real-world data to seamlessly flow into decentralized applications.
                </p>
              </div>
            </div>
            
            {/* Right side - Image with optional animation */}
            <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] relative bg-black rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/79201339-7541-40e0-a69d-321b49e8b86a.png" 
                alt="Real-World Web3 Integration"
                className="w-full h-full object-contain absolute inset-0 z-30"
              />
              {/* Only render CubeGenerativeAnimation on desktop */}
              {!isMobile && (
                <div className="absolute inset-0 z-10 opacity-40">
                  <CubeGenerativeAnimation />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Future Built, Real World Ready Section */}
        <div className="py-8 md:py-16 relative">
          {/* Only render Grainy Noise Background on desktop */}
          {!isMobile && (
            <div className="absolute inset-0 w-full h-full opacity-30 bg-black">
              <GrainyNoiseAnimation />
            </div>
          )}
          
          <div className="text-center relative z-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 lg:mb-12 text-white uppercase leading-tight">
              <span className="text-white">Future Built,</span>{' '}
              <span className="text-white">Real World Ready</span>
            </h2>
            
            {/* Only render Globe Animation Background on desktop */}
            {!isMobile && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[800px] sm:w-[1000px] md:w-[1400px] lg:w-[1800px] xl:w-[2200px] h-[600px] sm:h-[700px] md:h-[900px] lg:h-[1100px] xl:h-[1300px] relative overflow-hidden bg-black">
                  <GlobeMapAnimation />
                </div>
              </div>
            )}
            
            <div className="relative z-20">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-relaxed max-w-4xl mx-auto mb-6 md:mb-8 lg:mb-12 px-4 font-medium">
                Connect the physical and digital worlds through our revolutionary IoT-blockchain infrastructure.
              </p>
              
              <Button className="bg-gray-100 hover:bg-gray-200 text-black font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-sm md:text-base">
                Sign Up Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
