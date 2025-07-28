
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroP5Animation from "./HeroP5Animation";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 min-h-[90vh] flex items-center relative overflow-hidden">
      {/* P5.js Interactive Animation Background */}
      <HeroP5Animation />
      <div className="absolute inset-0 bg-black/30 z-1"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 uppercase text-white">
            <span className="animate-fade-in animation-delay-1000">Connecting IoT Datas</span> To <br /> 
            <span className="animate-fade-in animation-delay-2000">Blockchain</span> 
            <span className="animate-fade-in animation-delay-3000"> Seamlessly</span>
          </h1>
          
          <div className="mb-8"></div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-5000">
            <Button asChild size="lg" className="bg-black hover:bg-black/90 text-white px-8 py-6 text-lg">
              <Link to="/signup">Start Building <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
