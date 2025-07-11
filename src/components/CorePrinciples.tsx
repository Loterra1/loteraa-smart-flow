
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

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
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="/lovable-uploads/a6f6f001-c472-416b-9f80-7c0da082a66c.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-0"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Core Principles
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Card className={`bg-gradient-to-br from-white/5 to-purple-500/5 backdrop-blur-sm border-white/10 hover:animate-bounce-ar relative overflow-hidden transition-all duration-1000 ${visibleCards[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Background Image for AI Model Training */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="/lovable-uploads/8027db38-dd38-4c6f-afc7-4b7f1bdeed00.png" 
                alt="" 
                className="absolute right-0 top-0 w-56 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                AI Model Training via On-Chain Data
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white/80 leading-relaxed">
                AI projects can train their models using decentralized, verified data from Loteraa's IoT network. 
                Researchers upload sensor feeds like weather, motion, CO2 levels validated by smart contracts and 
                rewarded through token incentives. Models are trained using data or real-time feeds, creating a 
                trustless AI pipeline. This encourages both data creators and AI builders to contribute to and 
                monetize within the Loteraa ecosystem.
              </p>
            </CardContent>
          </Card>
          
          <Card className={`bg-gradient-to-br from-white/5 to-purple-500/5 backdrop-blur-sm border-white/10 hover:animate-bounce-ar relative overflow-hidden transition-all duration-1000 ${visibleCards[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Background Image for Digital IoT Data Layer */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="/lovable-uploads/c425ae29-8f3b-4b1b-a1a5-50062978e056.png" 
                alt="" 
                className="absolute right-0 bottom-0 w-56 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                Digital IoT Data Layer
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white/80 leading-relaxed">
                Beyond physical devices, Loteraa supports digital IoT streams such as APIs, browser plugins, 
                or digital sensor emulators. Developers can build dApps that simulate weather conditions, 
                traffic behaviors, or market sentiment. This digital-first IoT layer helps developers test 
                real-time logic before hardware deployment and creates a sandbox for AI models, automation 
                flows, or token-reward experiments.
              </p>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br from-white/5 to-purple-500/5 backdrop-blur-sm border-white/10 hover:animate-bounce-ar relative overflow-hidden transition-all duration-1000 ${visibleCards[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Background Image for Reward Mechanism */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="/lovable-uploads/05430015-7293-481c-aef0-4e5015e0491e.png" 
                alt="" 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-56 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                Reward Mechanism
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white/80 leading-relaxed">
                Loteraa's core reward loop centers on Data-to-Earn. Users earn $LOT for contributing quality data, 
                running sensor nodes, validating uploads, or building dApps. Smart contracts verify contributions 
                and automate payouts.
              </p>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br from-white/5 to-purple-500/5 backdrop-blur-sm border-white/10 hover:animate-bounce-ar relative overflow-hidden transition-all duration-1000 ${visibleCards[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Background Image for Physical IoT dApps */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="/lovable-uploads/494f92b9-37ce-4847-a0b0-b04c1f50a12d.png" 
                alt="" 
                className="absolute right-0 bottom-0 w-56 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                Physical IoT dApps
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white/80 leading-relaxed">
                Loteraa is built to power physical decentralized applications. Whether it's environmental sensors 
                in smart farms, GPS trackers on logistics fleets, or biometric gates in smart cities Loteraa 
                provides the infrastructure to build real-world dApps with on-chain verification, automation, 
                and token rewards. These dApps use smart contracts to reward node uptime, detect anomalies, 
                and automate responses creating an end-to-end programmable physical world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
