
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroImageAnimation from "./animations/HeroImageAnimation";

export default function HeroSection() {
  return (
    <section 
      className="pt-20 md:pt-24 pb-12 md:pb-16 min-h-[80vh] md:min-h-[90vh] flex items-center relative overflow-hidden"
      style={{ 
        backgroundColor: '#000000',
        background: '#000000'
      }}
    >
      {/* Enhanced black background enforcement with multiple layers */}
      <div 
        className="absolute inset-0 w-full h-full bg-black"
        style={{ 
          backgroundColor: '#000000 !important',
          background: '#000000 !important',
          zIndex: 0 
        }}
      />
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundColor: '#000000 !important',
          background: '#000000 !important',
          zIndex: 1 
        }}
      />
      <div 
        className="absolute inset-0 w-full h-full bg-loteraa-black"
        style={{ 
          backgroundColor: '#000000 !important',
          background: '#000000 !important',
          zIndex: 2 
        }}
      />
      
      {/* Hero Three.js Animation Container with black background */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-black"
        style={{ 
          backgroundColor: '#000000 !important',
          background: '#000000 !important',
          zIndex: 3 
        }}
      >
        <div 
          className="w-full max-w-4xl h-96 md:h-[500px] lg:h-[600px] opacity-80 bg-black"
          style={{ 
            backgroundColor: '#000000 !important',
            background: '#000000 !important'
          }}
        >
          <HeroImageAnimation />
        </div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6 uppercase text-white">
            <span className="animate-fade-in animation-delay-1000">Connecting IoT Datas</span> To <br className="hidden sm:block" /> 
            <span className="animate-fade-in animation-delay-2000">Blockchain</span> 
            <span className="animate-fade-in animation-delay-3000"> Seamlessly</span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-white/80 mb-8 md:mb-12 animate-fade-in animation-delay-4000 max-w-3xl px-4">
            The first AI-native blockchain powering real-time IoT, tokenized data rewards, and DePIN automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-5000">
            <Button asChild size="lg" className="bg-white hover:bg-white/90 text-black px-6 md:px-8 py-4 md:py-6 text-base md:text-lg">
              <Link to="/signup">Start Building <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
