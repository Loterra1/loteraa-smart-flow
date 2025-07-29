import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import p5 from 'p5';

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


  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative transition-all duration-1000 ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl group overflow-hidden relative">
                <CardContent className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}