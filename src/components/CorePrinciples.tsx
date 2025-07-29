
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
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 uppercase ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white">Core</span> Principles
          </h2>
        </div>
        
        <div className="grid md:grid-cols-1 gap-8 max-w-7xl mx-auto">
          <Card className={`bg-gray-500/10 backdrop-blur-md border-gray-400/20 hover:animate-bounce-ar relative overflow-hidden transition-all duration-1000 ${visibleCards[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                AI Model Training via On-Chain Data
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white leading-relaxed">
                AI projects can train their models using decentralized, verified data from Loteraa's IoT network. 
                Researchers upload sensor feeds like weather, motion, CO2 levels validated by smart contracts and 
                rewarded through token incentives. Models are trained using data or real-time feeds, creating a 
                trustless AI pipeline.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
