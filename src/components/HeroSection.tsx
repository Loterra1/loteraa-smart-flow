
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background elements */}
      <div className="blob animate-blob-rotate bg-loteraa-purple/30 w-[500px] h-[500px] left-[-150px] top-[10%]"></div>
      <div className="blob animate-blob-rotate animation-delay-2000 bg-loteraa-blue/20 w-[600px] h-[600px] right-[-200px] bottom-[10%]"></div>
      <div className="blob bg-loteraa-teal/20 w-[400px] h-[400px] left-[40%] bottom-[-100px]"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            <span className="gradient-text">Connecting IoT</span> to <br /> 
            <span className="gradient-text">Blockchain</span> Seamlessly
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl animate-fade-in">
            Infrastructure layer connecting IoT sensor data directly to blockchain smart contracts - enabling machine-to-machine payments, trustless automation, and data monetization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button asChild size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg">
              <Link to="/signup">Start Building <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
