
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

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
            <Button asChild variant="outline" size="lg" className="bg-transparent border-loteraa-purple text-white hover:bg-loteraa-purple/20 px-8 py-6 text-lg">
              <a href="#features">Learn More</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-loteraa-blue text-white hover:bg-loteraa-blue/20 px-8 py-6 text-lg">
              <Link to="/developer-docs">View Documentation <BookOpen className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
          
          {/* Animated IoT device illustration */}
          <div className="mt-16 w-full max-w-4xl relative">
            <div className="bg-loteraa-gray/30 backdrop-blur-sm rounded-xl border border-loteraa-gray/30 p-4 md:p-8 animate-float">
              <div className="relative">
                <div className="flex items-center justify-center">
                  <svg width="480" height="280" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    {/* Simplified network graph visualization */}
                    <circle cx="240" cy="140" r="40" fill="#7142F6" fillOpacity="0.3" />
                    <circle cx="240" cy="140" r="35" stroke="#7142F6" strokeWidth="1.5" />
                    
                    {/* IoT devices */}
                    <circle className="animate-pulse-soft" cx="120" cy="80" r="15" fill="#3182F4" fillOpacity="0.4" />
                    <circle className="animate-pulse-soft" cx="360" cy="200" r="15" fill="#3182F4" fillOpacity="0.4" /> 
                    <circle className="animate-pulse-soft" cx="100" cy="200" r="15" fill="#3182F4" fillOpacity="0.4" />
                    <circle className="animate-pulse-soft" cx="380" cy="100" r="15" fill="#3182F4" fillOpacity="0.4" />
                    
                    {/* Lines connecting devices */}
                    <line x1="240" y1="140" x2="120" y2="80" stroke="#7142F6" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="240" y1="140" x2="360" y2="200" stroke="#7142F6" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="240" y1="140" x2="100" y2="200" stroke="#7142F6" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="240" y1="140" x2="380" y2="100" stroke="#7142F6" strokeWidth="1.5" strokeDasharray="4 4" />
                    
                    {/* Blockchain representation */}
                    <rect x="220" y="120" width="40" height="40" rx="4" stroke="#0CCCBC" strokeWidth="1.5" fill="none" />
                    <rect x="225" y="125" width="30" height="10" rx="2" fill="#0CCCBC" fillOpacity="0.2" />
                    <rect x="225" y="140" width="30" height="5" rx="1" fill="#0CCCBC" fillOpacity="0.2" />
                    <rect x="225" y="150" width="20" height="5" rx="1" fill="#0CCCBC" fillOpacity="0.2" />
                  </svg>
                </div>
                
                {/* Data flow animations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute w-2 h-2 bg-loteraa-blue rounded-full animate-ping" style={{ top: '80px', left: '120px', animationDelay: '0s' }}></div>
                  <div className="absolute w-2 h-2 bg-loteraa-purple rounded-full animate-ping" style={{ top: '200px', left: '360px', animationDelay: '1s' }}></div>
                  <div className="absolute w-2 h-2 bg-loteraa-teal rounded-full animate-ping" style={{ top: '200px', left: '100px', animationDelay: '2s' }}></div>
                  <div className="absolute w-2 h-2 bg-loteraa-blue rounded-full animate-ping" style={{ top: '100px', left: '380px', animationDelay: '3s' }}></div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-white/70 text-sm">Real-time IoT data securely connected to blockchain smart contracts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
