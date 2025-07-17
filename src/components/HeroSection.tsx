
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroAnimatedBackground from "./HeroAnimatedBackground";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="/lovable-uploads/d98a6185-c72c-4d83-99f4-5c5d80aadc18.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
        />
        {/* Blinking circles overlay */}
        <div className="absolute inset-0 z-1">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Inner circle */}
            <div className="absolute w-32 h-32 rounded-full bg-white/20 animate-pulse"></div>
            {/* Outer circle */}
            <div className="absolute w-64 h-64 rounded-full bg-white/10 animate-pulse animation-delay-500 -translate-x-16 -translate-y-16"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 z-2"></div>
      </div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12 uppercase">
            <span className="text-loteraa-purple animate-fade-in animation-delay-1000">Connecting IoT</span> To <br /> 
            <span className="text-loteraa-purple animate-fade-in animation-delay-2000">Blockchain</span> 
            <span className="animate-fade-in animation-delay-3000"> Seamlessly</span>
          </h1>
          
          <div className="mb-8"></div>
          
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
