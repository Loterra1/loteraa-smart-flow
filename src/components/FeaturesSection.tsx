
import { Database, Zap, Code, Coins, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const [isStakeCardVisible, setIsStakeCardVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate cards in sequence
            setTimeout(() => setVisibleCards(prev => [true, ...prev.slice(1)]), 800);
            setTimeout(() => setVisibleCards(prev => [prev[0], true, ...prev.slice(2)]), 1100);
            setTimeout(() => setVisibleCards(prev => [...prev.slice(0, 2), true, ...prev.slice(3)]), 1400);
            setTimeout(() => setVisibleCards(prev => [...prev.slice(0, 3), true]), 1700);
            setTimeout(() => setIsStakeCardVisible(true), 2000);
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

  const features = [
    {
      icon: null,
      title: "Real-Time Data Feed",
      description: "Loteraa enables continuous, secure, and low-latency streaming of sensor data from physical environments such as temperature, GPS, or usage metrics directly to its blockchain network. This real-time pipeline ensures high-frequency data flows are verifiable, timestamped, and immutable, enabling on-chain actions to reflect dynamic, real-world conditions with unprecedented precision and speed."
    },
    {
      icon: null,
      title: "Web3 Connected Contracts",
      description: "Loteraa smart contracts respond autonomously to live sensor inputs enabling logic-based automation across DeFi, logistics, energy, and AI sectors. Data triggers from IoT devices execute cross-chain operations such as payments, alerts, insurance payouts, or asset transfers, establishing an intelligent link between off-chain activities and on-chain decision-making without intermediaries."
    },
    {
      icon: null,
      title: "Developer API & SDK",
      description: "Loteraa offers a robust set of APIs and software development kits (SDKs) that allow developers to quickly integrate IoT data into decentralized apps. With built-in security, compatibility layers, documentation, and pre-configured modules, it removes technical complexity empowering developers to build IoT-Web3 applications that scale across devices and blockchains."
    },
    {
      icon: null,
      title: "Tokenized Rewards",
      description: "Every participant whether data provider, validator, or consumer is incentivized through $LOT token rewards. Verified data uploads, accurate validations, and meaningful interactions trigger automated, on-chain compensation. This embedded economy aligns ecosystem incentives, fuels engagement, and sustains a decentralized model of crowdsourced data infrastructure that is scalable, fair, and self-regulating."
    }
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 relative overflow-hidden">
      {/* Purple Light Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-loteraa-purple/25 rounded-full blur-3xl animate-pulse animation-delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-88 h-88 bg-loteraa-purple/20 rounded-full blur-3xl animate-pulse animation-delay-1200"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 uppercase ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-loteraa-purple">Powerful</span> Features
          </h2>
          <p className={`text-xl text-white/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Unlock new possibilities at the intersection of IoT and blockchain technologies
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`w-[300px] h-[450px] bg-loteraa-gray/20 backdrop-blur-sm rounded-xl p-6 border border-loteraa-gray/20 transition-all duration-1000 hover:border-loteraa-purple/50 hover:translate-y-[-5px] group ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h3 className="text-xl font-bold mb-3 text-loteraa-purple">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Stake & Reward Card */}
        <div className={`w-full max-w-4xl bg-gray-500/10 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-400/20 hover:border-loteraa-teal/50 transition-all duration-1000 mt-8 mx-auto ${isStakeCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-loteraa-purple">Loteraa Stake & Reward Mechanism</h3>
            <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">Loteraa's Stake & Reward system is designed to power the decentralized data economy by locking value, ensuring network integrity, and incentivizing contributors all while increasing the utility and demand for the native token $LOT.</p>
            <Button 
              onClick={() => navigate('/stake')}
              className="bg-loteraa-purple hover:bg-loteraa-purple/80 text-white"
            >
              Stake
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
