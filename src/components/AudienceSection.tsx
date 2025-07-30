
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Building, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import GlobeMapAnimation from "./animations/GlobeMapAnimation";
import GrainyNoiseAnimation from "./animations/GrainyNoiseAnimation";
import InteractiveDotFieldAnimation from "./animations/InteractiveDotFieldAnimation";

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
      icon: <Code className="h-8 w-8 md:h-10 md:w-10 text-white" />,
      title: "For Developers",
      description: "Build IoT-connected dApps with our comprehensive SDK and API. Integrate real-world data into your blockchain projects seamlessly.",
      cta: "View Documentation",
      link: "/developer-docs"
    },
    {
      icon: <Building className="h-8 w-8 md:h-10 md:w-10 text-white" />,
      title: "For Businesses",
      description: "Automate processes and reduce operational costs. Create new revenue streams through tokenized data and machine-to-machine transactions.",
      cta: "Book a Demo",
      link: "/business"
    },
    {
      icon: <FileText className="h-8 w-8 md:h-10 md:w-10 text-white" />,
      title: "Verified IoT Data Access",
      description: "Access to millions of verified IoT data points from devices worldwide, ensuring data integrity and authenticity.",
      cta: "Explore Data",
      link: "/researchers"
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-black relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
      </div>
      
      {/* Real-World → Web3 Integration Section */}
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10 py-8 md:py-12">
        {/* Enhanced Grainy Noise Background */}
        <div className="absolute inset-0 w-full h-full opacity-90">
          <GrainyNoiseAnimation />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 md:mb-6 text-white uppercase">
            <span className="text-white">Real-World → Web3</span> Integration
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
            Loteraa is engineered to make the transition from physical device to smart contract seamless. Through REST APIs, low-code scripts, and SDKs, developers can integrate off-chain data sources into on-chain logic without building complex middleware.
          </p>
          
          {/* P5.js Animation for Automating the Physical World */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-black border border-white/10 mb-6">
            {/* p5.js Animation Layer */}
            <div className="absolute inset-0">
              <InteractiveDotFieldAnimation />
            </div>
            
            {/* Centered Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white text-center px-4">
                Automating the physical world
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Future Built, Real World Ready Section */}
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10 py-12 md:py-20">
        {/* Grainy Noise Background */}
        <div className="absolute inset-0 w-full h-full opacity-90">
          <GrainyNoiseAnimation />
        </div>
        
        <div className="text-center relative z-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 md:mb-6 text-white uppercase">
            <span className="text-white">Future Built,</span>{' '}
            <span className="text-white">Real World Ready</span>
          </h2>
          
          {/* Globe Animation Background - Responsive Size */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[800px] md:w-[1000px] lg:w-[1200px] h-[500px] md:h-[600px] lg:h-[800px] relative overflow-hidden">
              <GlobeMapAnimation />
            </div>
          </div>
          
          <div className="relative z-10">
            <p className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              Connect the physical and digital worlds through our revolutionary IoT-blockchain infrastructure.
            </p>
            
            {/* Sign Up Button with Light Background */}
            <Button className="bg-gray-100 hover:bg-gray-200 text-black font-semibold px-6 md:px-8 py-3 rounded-lg text-sm md:text-base">
              Sign Up Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
