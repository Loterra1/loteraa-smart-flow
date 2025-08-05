
import { useEffect, useRef, useState } from "react";
import AIModelTrainingAnimation from "./animations/AIModelTrainingAnimation";
import Web3DepinAnimation from "./animations/Web3DepinAnimation";
import BankingFintechAnimation from "./animations/BankingFintechAnimation";
import NetworkingTelecomAnimation from "./animations/NetworkingTelecomAnimation";

export default function UseCasesSection() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false]);
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
    },
    {
      title: "Web3 & DePIN Ecosystems",
      description: "Loteraa powers decentralized physical infrastructure (DePIN) by connecting sensors, devices, and data streams to smart contracts, enabling trustless automation, incentivized participation, and token rewards for builders and operators.",
      animation: <Web3DepinAnimation />,
      position: "right"
    },
    {
      title: "Banking & Fintech",
      description: "Loteraa is built to power financial institutions to automate insurance claims, loan triggers, and risk assessments using real-world IoT inputs like GPS, biometrics, or environmental data reducing fraud, manual processing, and latency.",
      animation: <BankingFintechAnimation />,
      position: "left"
    },
    {
      title: "Networking & Telecom",
      description: "Loteraa is built to enables telecoms to tokenize bandwidth usage, track network quality via sensors, and incentivize community-built infrastructure with programmable rewards, while providing immutable data logs for audits and quality assurance.",
      animation: <NetworkingTelecomAnimation />,
      position: "right"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-white uppercase">
          Use Cases
        </h2>
        
        <div className="max-w-6xl mx-auto space-y-20">
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
                  useCase.position === "right" ? "lg:order-2" : ""
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
              
              {/* Animation */}
              <div
                className={`${
                  useCase.position === "right" ? "lg:order-1" : ""
                } relative h-80 transform transition-all duration-1000 delay-300 ${
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
