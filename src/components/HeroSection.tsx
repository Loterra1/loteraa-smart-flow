
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

          <div className="animate-fade-in animation-delay-700 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-lg text-white/80 max-w-3xl">
              Unlock new possibilities at the intersection of IoT and blockchain technologies.
            </p>
          </div>

          <div className="animate-fade-in animation-delay-900 mb-16 max-w-4xl">
            <div className="bg-loteraa-gray/30 backdrop-blur-md border border-loteraa-gray/40 rounded-lg p-8">
              <p className="text-lg text-white/90 leading-relaxed">
                Loteraa powers a modular infrastructure that enables physical or digital sensors to autonomously communicate with smart contracts creating a decentralized machine-to-machine economy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
