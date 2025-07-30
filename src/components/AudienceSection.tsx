
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import GlobeMapAnimation from "./animations/GlobeMapAnimation";
import GrainyNoiseAnimation from "./animations/GrainyNoiseAnimation";
import CubeGenerativeAnimation from "./animations/CubeGenerativeAnimation";

export default function AudienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="py-12 md:py-20 bg-black relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        {/* Real-World → Web3 Integration Section */}
        <div className="py-8 md:py-12">
          {/* Enhanced Grainy Noise Background */}
          <div className="absolute inset-0 w-full h-full opacity-90">
            <GrainyNoiseAnimation />
          </div>
          
          <div className="relative z-10 flex items-center justify-between gap-16">
            {/* Left side - Heading and Description - Better positioned and larger */}
            <div className="flex-1 max-w-4xl pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 md:mb-10 text-white uppercase leading-tight">
                <span className="text-white">Real-World → Web3</span> Integration
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/70 leading-relaxed mb-6 md:mb-8">
                Loteraa is engineered to make the transition from physical device to smart contract seamless. Through REST APIs, low-code scripts, and SDKs, developers can integrate off-chain data sources into on-chain logic without building complex middleware.
              </p>
            </div>
            
            {/* Right side - Much Larger Image with P5.js Animation */}
            <div className="flex-shrink-0 w-[600px] h-[600px] relative">
              <img 
                src="/lovable-uploads/79201339-7541-40e0-a69d-321b49e8b86a.png" 
                alt="Real-World Web3 Integration"
                className="w-full h-full object-contain opacity-40 absolute inset-0 z-10"
              />
              <div className="absolute inset-0 z-20">
                <CubeGenerativeAnimation />
              </div>
            </div>
          </div>
        </div>

        {/* Future Built, Real World Ready Section - Moved up to be closer to previous section */}
        <div className="py-8 md:py-16">
          {/* Grainy Noise Background */}
          <div className="absolute inset-0 w-full h-full opacity-90">
            <GrainyNoiseAnimation />
          </div>
          
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 md:mb-12 text-white uppercase">
              <span className="text-white">Future Built,</span>{' '}
              <span className="text-white">Real World Ready</span>
            </h2>
            
            {/* Much Much Larger Globe Animation Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[1600px] md:w-[1800px] lg:w-[2200px] h-[900px] md:h-[1100px] lg:h-[1300px] relative overflow-hidden">
                <GlobeMapAnimation />
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl lg:text-3xl text-white/70 leading-relaxed max-w-4xl mx-auto mb-8 md:mb-12 px-4">
                Connect the physical and digital worlds through our revolutionary IoT-blockchain infrastructure.
              </p>
              
              {/* Sign Up Button with Light Background */}
              <Button className="bg-gray-100 hover:bg-gray-200 text-black font-semibold px-6 md:px-8 py-3 rounded-lg text-sm md:text-base">
                Sign Up Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
