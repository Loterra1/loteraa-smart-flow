import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AIModelTrainingAnimation from "./animations/AIModelTrainingAnimation";
import RealUsesImpactAnimation from "./animations/RealUsesImpactAnimation";
import CoreInfrastructureAnimation from "./animations/CoreInfrastructureAnimation";

export default function UseCasesSection() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false]);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((item, index) => {
      if (item) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setVisibleItems(prev => {
                    const newVisibleItems = [...prev];
                    newVisibleItems[index] = true;
                    return newVisibleItems;
                  });
                }, index * 300); // Stagger the animations
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const useCases = [
    {
      title: "AI Development & Model Training",
      description: "Loteraa supplies real-world, verified IoT data to train and refine AI/ML models on-chain, while enabling AI devs to monetize models, automate logic, and verify outputs via tokenized smart contract feedback loops.",
      animation: <AIModelTrainingAnimation />,
      position: "left"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-white uppercase">
          Use Cases
        </h2>

        {/* Two New Cards */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Card 1 */}
          <Card className="bg-black border border-gray-800 mb-0">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Animation on left */}
                <div className="relative h-64 lg:h-80">
                  <RealUsesImpactAnimation />
                </div>
                {/* Content on right */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
                    Real uses and impact
                  </h3>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    Loteraa connects real-world data to blockchain, enabling AI model training, decentralized finance triggers, IoT automation, and DePIN economies. It powers fintech, telecom, logistics, and smart device networks by turning real-time sensor data into tokenized assets, unlocking new data-driven apps and rewarding users for data contribution and utility.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Directly below Card 1 with no spacing */}
          <Card className="bg-black border border-gray-800 border-t-0">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Animation on left */}
                <div className="relative h-64 lg:h-80">
                  <CoreInfrastructureAnimation />
                </div>
                {/* Content on right */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
                    Loteraa as a Core Infrastructure
                  </h3>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    Loteraa is the foundational layer power, DePIN-powered sensor networks translating real-world signals into on-chain logic that smart contracts can understand and execute. loteraa handles data ingestion, sensor registration, secure transmission, oracle integration, and programmable event triggers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-2">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                useCase.position === "right" ? "lg:grid-cols-2" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`${
                  (index === 1 || index === 3) ? "lg:order-2" : ""
                } transform transition-all duration-1000 ${
                  visibleItems[index]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
                  {useCase.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {useCase.description}
                </p>
              </div>
              
              {/* Animation - Increased height significantly */}
              <div
                className={`${
                  (index === 1 || index === 3) ? "lg:order-1" : ""
                } relative h-[700px] md:h-[800px] lg:h-[900px] transform transition-all duration-1000 delay-300 ${
                  visibleItems[index]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {useCase.animation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
