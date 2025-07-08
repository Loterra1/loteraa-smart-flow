
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroAnimatedBackground from "./HeroAnimatedBackground";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 min-h-[90vh] flex items-center relative overflow-hidden">
      <HeroAnimatedBackground />
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="gradient-text animate-fade-in animation-delay-1000">Connecting IoT</span> to <br /> 
            <span className="gradient-text animate-fade-in animation-delay-2000">Blockchain</span> 
            <span className="animate-fade-in animation-delay-3000"> Seamlessly</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl animate-fade-in animation-delay-4000">
            Infrastructure layer connecting IoT sensor data directly to blockchain smart contracts - enabling machine-to-machine payments, trustless automation, and data monetization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-5000 mb-12">
            <Button asChild size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg">
              <Link to="/signup">Start Building <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>

          <div className="animate-glitch-fade-in animation-delay-6000 mb-16 max-w-6xl w-full">
            <div className="bg-black/80 backdrop-blur-md border border-loteraa-gray/40 rounded-lg p-12">
              <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed text-center max-w-4xl mx-auto glowing-text-ultra">
                Loteraa's vision is to power the first global decentralized sensor network, where real-world data becomes the fuel for smart automation, DePIN incentives, and decentralized economies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
