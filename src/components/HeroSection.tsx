
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            <span className="gradient-text">Connecting IoT</span> to <br /> 
            <span className="gradient-text">Blockchain</span> Seamlessly
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl animate-fade-in animation-delay-300">
            Infrastructure layer connecting IoT sensor data directly to blockchain smart contracts - enabling machine-to-machine payments, trustless automation, and data monetization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-500 mb-12">
            <Button asChild size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg">
              <Link to="/signup">Start Building <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>

          <div className="animate-fade-in animation-delay-900 mb-8 max-w-5xl">
            <div className="bg-loteraa-gray/30 backdrop-blur-md border border-loteraa-gray/40 rounded-lg p-10">
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                Loteraa powers a modular infrastructure that enables physical or digital sensors to autonomously communicate with smart contracts creating a decentralized machine-to-machine economy.
              </p>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-1000 mb-16 max-w-5xl">
            <div className="relative">
              <img 
                src="/lovable-uploads/267dda64-7a1e-4349-af16-466eda622938.png" 
                alt="Loteraa Network Visualization" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-loteraa-black/60 rounded-lg flex items-center justify-center p-8">
                <p className="text-lg text-white/90 leading-relaxed text-center max-w-3xl">
                  Loteraa's vision is to power the first global decentralized sensor network, where real-world data becomes the fuel for smart automation, DePIN incentives, and decentralized economies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
