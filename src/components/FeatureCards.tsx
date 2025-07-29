import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CubeAnimation from "./animations/CubeAnimation";
import RadialAnimation from "./animations/RadialAnimation";
import SpiralAnimation from "./animations/SpiralAnimation";
import VortexAnimation from "./animations/VortexAnimation";
import WireframeAnimation from "./animations/WireframeAnimation";

interface FeatureCard {
  title: string;
  description: string;
}

export default function FeatureCards() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  const features: FeatureCard[] = [
    {
      title: "Real-Time Data Feed",
      description: "Loteraa enables continuous, secure, and low-latency streaming of sensor and real world datas from physical environments such as GPS, or usage metrics directly to its blockchain network. This real-time pipeline ensures high-frequency data flows are verifiable, timestamped, and immutable, enabling on-chain actions to reflect dynamic, real-world conditions with unprecedented precision and speed."
    },
    {
      title: "Web3 Connected Contracts",
      description: "Loteraa smart contracts respond autonomously to live sensor inputs—enabling logic-based automation across DeFi, logistics, energy, and AI sectors. Data triggers from IoT devices execute cross-chain operations such as payments, alerts, insurance payouts, or asset transfers, establishing an intelligent link between off-chain activities and on-chain decision-making without intermediaries."
    },
    {
      title: "Tokenized Rewards",
      description: "Every participant whether data provider, validator, or consumer is incentivized through $LOT token rewards. Verified data uploads, accurate validations, and meaningful interactions trigger automated, on-chain compensation."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards in sequence
            setTimeout(() => setVisibleCards(prev => [true, ...prev.slice(1)]), 300);
            setTimeout(() => setVisibleCards(prev => [prev[0], true, ...prev.slice(2)]), 600);
            setTimeout(() => setVisibleCards(prev => [...prev.slice(0, 2), true]), 900);
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


  const animations = [CubeAnimation, RadialAnimation, WireframeAnimation];

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* All cards with image animations */}
          {features.map((feature, index) => {
            const AnimationComponent = animations[index];
            return (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-4 max-w-6xl mx-auto">
                  {/* Animation Card */}
                  <div 
                    className="w-[300px] h-[280px] relative overflow-hidden rounded-lg flex-shrink-0"
                    style={{
                      backgroundColor: '#000000'
                    }}
                  >
                    <AnimationComponent />
                  </div>
                  
                  {/* Text Card */}
                  <div 
                    className="flex-1 h-[280px] relative overflow-hidden rounded-lg"
                    style={{
                      backgroundColor: '#000000'
                    }}
                  >
                    <div className="p-6 h-full flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-white mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* New $LOT Token Section */}
          <div className="mt-16 flex items-center gap-8 max-w-6xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                EARN REWARD WITH $LOT TOKEN
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                The Loteraa ecosystem is powered by the $Lot token, a utility and reward token designed to fuel sensor contributions, validate data quality, incentivize uptime, and govern the platform's evolution. Loteraa's tokenomics are built to reward users for real-world participation whether they host sensors, validate data, build automation apps, or contribute to network growth.
              </p>
            </div>
            
            {/* Right Side - Image */}
            <div className="w-[600px] h-[480px] flex-shrink-0">
              <img 
                src="/lovable-uploads/9f7441f3-0811-41a6-b4a1-ae91f4972a30.png"
                alt="Black Spheres" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Real-World → Web3 Integration Section */}
          <div className="mt-16 flex items-center gap-8 max-w-6xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                REAL-WORLD → WEB3 INTEGRATION
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                Loteraa bridges the gap between physical sensors and blockchain networks, enabling seamless data flow from IoT devices to smart contracts. This integration allows real-world events to trigger automated Web3 actions, creating a truly connected ecosystem.
              </p>
            </div>
            
            {/* Right Side - Image */}
            <div className="w-[400px] h-[320px] flex-shrink-0">
              <img 
                src="/lovable-uploads/9f7441f3-0811-41a6-b4a1-ae91f4972a30.png"
                alt="Black Spheres Integration" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* For Developers Section */}
          <div className="mt-16 max-w-6xl mx-auto">
            {/* Image */}
            <div className="w-full flex justify-center mb-8">
              <img 
                src="/lovable-uploads/f506d009-7669-4f02-aa86-d72c1a1faa7c.png"
                alt="Radial Development Shape" 
                className="w-[400px] h-[320px] object-contain"
              />
            </div>
            
            {/* Content */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                FOR DEVELOPERS
              </h2>
              <p className="text-white/80 leading-relaxed text-lg mb-8 max-w-4xl mx-auto">
                Loteraa offers a robust set of APIs and software development kits (SDKs) that allow developers to quickly integrate IoT data into decentralized apps. With built-in security, compatibility layers, documentation, and pre-configured modules, it removes technical complexity empowering developers to build IoT-Web3 applications that scale across devices and blockchains.
              </p>
              <Button 
                className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3"
              >
                Start building
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}