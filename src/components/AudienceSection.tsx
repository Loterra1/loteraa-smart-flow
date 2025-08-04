import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface Principle {
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    title: "Seamless Integration",
    description: "Connect physical devices to blockchain networks without complex middleware or technical barriers."
  },
  {
    title: "Real-Time Data",
    description: "Process and validate IoT sensor data in real-time for immediate blockchain transactions."
  },
  {
    title: "Decentralized Trust",
    description: "Build trust through cryptographic proofs and decentralized validation of device data."
  },
  {
    title: "Developer-Friendly",
    description: "Simple APIs and SDKs that make Web3 integration accessible to developers of all skill levels."
  }
];

export default function AudienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  return (
    <section 
      ref={sectionRef} 
      className="py-12 md:py-20 bg-black w-full overflow-hidden"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Real-World → Web3 Integration Section */}
        <div className="py-8 md:py-12 relative">
          {/* CSS-based background pattern instead of p5.js */}
          {!isMobile && (
            <div className="absolute inset-0 w-full h-full opacity-20 bg-black pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-teal-500/5"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}></div>
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
            
            {/* Right side - Image with CSS animation */}
            <div className="flex-1 relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
              <img 
                src="/lovable-uploads/79201339-7541-40e0-a69d-321b49e8b86a.png" 
                alt="Real-World Web3 Integration"
                className="w-full h-full object-contain absolute inset-0 z-30"
              />
              {/* CSS-based cube animation instead of p5.js */}
              {!isMobile && (
                <div className="absolute inset-0 z-10 opacity-40 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-8 h-8 border border-white/20 animate-pulse"
                          style={{
                            left: `${(i % 3) * 40}px`,
                            top: `${Math.floor(i / 3) * 40}px`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Core Principles Section */}
        <div className="py-8 md:py-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 md:mb-12 lg:mb-16 text-center text-white uppercase">
            Core Principles
          </h2>
          
          {/* Mobile layout - stack vertically */}
          <div className="block md:hidden space-y-8">
            {principles.map((principle, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-loteraa-purple to-loteraa-blue rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">{principle.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>

          {/* Desktop layout - interactive grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {principles.map((principle, index) => {
                const isActive = activePrinciple === index;
                const isOdd = index % 2 === 1;
                
                return (
                  <div
                    key={index}
                    className={`
                      relative group cursor-pointer transition-all duration-500
                      ${isActive ? 'scale-105 z-10' : 'scale-100 z-0'}
                      ${isOdd ? 'mt-8 lg:mt-12' : ''}
                    `}
                    onMouseEnter={() => setActivePrinciple(index)}
                  >
                    {/* Background card */}
                    <div className={`
                      relative overflow-hidden rounded-2xl lg:rounded-3xl border transition-all duration-500
                      ${isActive 
                        ? 'bg-gray-900/80 border-loteraa-purple/50 shadow-2xl shadow-loteraa-purple/20' 
                        : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                      }
                    `}>
                      {/* Content */}
                      <div className="relative z-20 p-6 lg:p-8">
                        <div className="flex items-center gap-4 mb-4 lg:mb-6">
                          <div className={`
                            w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg lg:text-xl transition-all duration-500
                            ${isActive 
                              ? 'bg-gradient-to-br from-loteraa-purple to-loteraa-blue shadow-lg' 
                              : 'bg-gradient-to-br from-gray-700 to-gray-600'
                            }
                          `}>
                            {index + 1}
                          </div>
                          <h3 className={`
                            text-xl lg:text-2xl font-bold transition-colors duration-500
                            ${isActive ? 'text-white' : 'text-gray-300'}
                          `}>
                            {principle.title}
                          </h3>
                        </div>
                        
                        <p className={`
                          text-base lg:text-lg leading-relaxed transition-all duration-500
                          ${isActive ? 'text-gray-200 opacity-100' : 'text-gray-400 opacity-80'}
                        `}>
                          {principle.description}
                        </p>
                      </div>

                      {/* CSS-based background animation */}
                      {isActive && (
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-teal-500/20 animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
