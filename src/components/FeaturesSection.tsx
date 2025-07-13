
import { Database, Zap, Code, Coins, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

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
            setTimeout(() => setVisibleCards(prev => [...prev.slice(0, 3), true, prev[4]]), 1700);
            setTimeout(() => setVisibleCards(prev => [...prev.slice(0, 4), true]), 2000);
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
      description: "Secure, low-latency data streaming from IoT devices directly to blockchain networks."
    },
    {
      icon: null,
      title: "Web3 Connected Contracts",
      description: "Seamlessly connect sensor data to trigger smart contract executions across multiple blockchains."
    },
    {
      icon: null,
      title: "Developer API & SDK",
      description: "Comprehensive tools and documentation to build IoT-blockchain integrations with minimal effort."
    },
    {
      icon: null,
      title: "Tokenized Rewards",
      description: "Incentive mechanisms for data providers and consumers built directly into the protocol."
    },
    {
      icon: null,
      title: "Decentralized Dashboard",
      description: "Monitor and manage your IoT networks with advanced real-time analytics and insights."
    }
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 relative overflow-hidden">

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 uppercase ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-loteraa-purple">Powerful</span> Features
          </h2>
          <p className={`text-xl text-white/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Unlock new possibilities at the intersection of IoT and blockchain technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-loteraa-gray/20 backdrop-blur-sm rounded-xl p-6 border border-loteraa-gray/20 transition-all duration-1000 hover:border-loteraa-purple/50 hover:translate-y-[-5px] group ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h3 className="text-xl font-bold mb-3 text-loteraa-purple">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
