
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroImageAnimation from "./animations/HeroImageAnimation";
import EconomyImageAnimation from "./animations/EconomyImageAnimation";

export default function HeroSection() {
  return (
    <section className="pt-20 md:pt-24 pb-12 md:pb-16 w-full bg-black relative">
      {/* Hero Three.js Animation Container - Moved up to center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-96 md:h-[500px] lg:h-[600px] opacity-80">
          <HeroImageAnimation />
        </div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6 uppercase text-white">
            <span className="animate-fade-in animation-delay-1000">Connecting IoT Datas</span> To <br className="hidden sm:block" /> 
            <span className="animate-fade-in animation-delay-2000">Blockchain</span> 
            <span className="animate-fade-in animation-delay-3000"> Seamlessly</span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-white/80 mb-8 md:mb-12 animate-fade-in animation-delay-4000 max-w-3xl px-4">
            The first AI-native blockchain powering real-time IoT, tokenized data rewards, and DePIN automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-5000 mb-16 md:mb-20">
            <Button asChild size="lg" className="bg-white hover:bg-white/90 text-black px-6 md:px-8 py-4 md:py-6 text-base md:text-lg">
              <Link to="/signup">Start Building <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" /></Link>
            </Button>
          </div>

          {/* New Economy Section with Three.js Animation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl w-full animate-fade-in animation-delay-6000">
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 uppercase">
                A NEW KIND OF ECONOMY
              </h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Loteraa is building a new kind of economy where real-world data becomes currency. It powers decentralized IoT and DePIN systems by connecting sensors, devices, and smart contracts, enabling automation, tokenized rewards, and trustless infrastructure. Loteraa serves as the backbone for data-driven economies in AI, smart cities, and edge automation.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto aspect-square">
                <EconomyImageAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
