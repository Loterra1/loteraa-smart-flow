
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Building, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SphereGridAnimation from "./animations/SphereGridAnimation";

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

  const audiences = [
    {
      icon: <Code className="h-10 w-10 text-white" />,
      title: "For Developers",
      description: "Build IoT-connected dApps with our comprehensive SDK and API. Integrate real-world data into your blockchain projects seamlessly.",
      cta: "View Documentation",
      link: "/developer-docs"
    },
    {
      icon: <Building className="h-10 w-10 text-white" />,
      title: "For Businesses",
      description: "Automate processes and reduce operational costs. Create new revenue streams through tokenized data and machine-to-machine transactions.",
      cta: "Book a Demo",
      link: "/business"
    },
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "For Researchers",
      description: "Access trustworthy sensor data on a global scale. Leverage verified IoT data sources for your research and development initiatives.",
      cta: "Explore Data",
      link: "/researchers"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
      </div>
      
      {/* Real-World → Web3 Integration Section */}
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white uppercase">
              <span className="text-white">Real-World → Web3</span> Integration
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
              Loteraa is engineered to make the transition from physical device to smart contract seamless. Through REST APIs, low-code scripts, and SDKs, developers can integrate off-chain data sources into on-chain logic without building complex middleware.
            </p>
            
            {/* End to End Trust Layer Section - moved here to be close */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white uppercase">
              <span className="text-white">End to End Trust Layer</span> for IoT
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Trust is everything in decentralized systems and Loteraa delivers it across the entire stack. From sensor identity to data hashing, from oracle relay to on-chain logic every step is cryptographically validated and publicly auditable.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-[500px] h-[400px] relative overflow-hidden rounded-lg bg-black">
              <SphereGridAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
