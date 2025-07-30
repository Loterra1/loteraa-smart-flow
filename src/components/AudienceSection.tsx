
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
    <section 
      ref={sectionRef} 
      className="py-12 md:py-20 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: '#000000 !important', background: '#000000 !important' }}
    >
      {/* Critical black background layers to prevent any white showing */}
      {Array.from({ length: 8 }).map((_, index) => (
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
      
      {/* Mobile-specific black background coverage with extra padding */}
      <div 
        className="block md:hidden absolute -inset-32 w-[calc(100vw+16rem)] h-[calc(100vh+16rem)]"
        style={{ 
          backgroundColor: '#000000 !important',
          background: '#000000 !important',
          zIndex: 5
        }}
      />
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        {/* Real-World → Web3 Integration Section */}
        <div 
          className="py-8 md:py-12 relative"
          style={{ backgroundColor: '#000000 !important', background: '#000000 !important' }}
        >
          {/* Multiple black background layers for this subsection */}
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
          
          {/* Enhanced Grainy Noise Background with black fallback */}
          <div 
            className="absolute inset-0 w-full h-full opacity-90"
            style={{ 
              backgroundColor: '#000000 !important',
              background: '#000000 !important',
              zIndex: 6
            }}
          >
            <GrainyNoiseAnimation />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Left side - Heading and Description - Mobile responsive */}
            <div className="flex-1 max-w-4xl lg:pr-8 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 lg:mb-10 text-white uppercase leading-tight">
                <span className="text-white">Real-World → Web3</span> Integration
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/70 leading-relaxed mb-6 md:mb-8">
                Loteraa is engineered to make the transition from physical device to smart contract seamless. Through REST APIs, low-code scripts, and SDKs, developers can integrate off-chain data sources into on-chain logic without building complex middleware.
              </p>
            </div>
            
            {/* Right side - Responsive Image with P5.js Animation */}
            <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] relative">
              {/* Black background for image container */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: '#000000 !important',
                  background: '#000000 !important'
                }}
              />
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

        {/* Future Built, Real World Ready Section */}
        <div 
          className="py-8 md:py-16 relative"
          style={{ backgroundColor: '#000000 !important', background: '#000000 !important' }}
        >
          {/* Multiple black background layers for this subsection */}
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
          
          {/* Grainy Noise Background with black fallback */}
          <div 
            className="absolute inset-0 w-full h-full opacity-90"
            style={{ 
              backgroundColor: '#000000 !important',
              background: '#000000 !important',
              zIndex: 6
            }}
          >
            <GrainyNoiseAnimation />
          </div>
          
          <div className="text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 lg:mb-12 text-white uppercase leading-tight">
              <span className="text-white">Future Built,</span>{' '}
              <span className="text-white">Real World Ready</span>
            </h2>
            
            {/* Responsive Globe Animation Background with black fallback */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div 
                className="w-[800px] sm:w-[1000px] md:w-[1400px] lg:w-[1800px] xl:w-[2200px] h-[600px] sm:h-[700px] md:h-[900px] lg:h-[1100px] xl:h-[1300px] relative overflow-hidden"
                style={{ 
                  backgroundColor: '#000000 !important',
                  background: '#000000 !important'
                }}
              >
                <GlobeMapAnimation />
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/70 leading-relaxed max-w-4xl mx-auto mb-6 md:mb-8 lg:mb-12 px-4">
                Connect the physical and digital worlds through our revolutionary IoT-blockchain infrastructure.
              </p>
              
              {/* Sign Up Button with Light Background */}
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
