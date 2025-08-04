
import { useState } from 'react';
import { ArrowRight, Zap, Code2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* CSS-based background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-sm text-gray-300 mb-8">
            <Zap className="w-4 h-4 text-loteraa-teal" />
            Bridging Physical & Digital Worlds
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 text-white leading-tight">
            <span className="block">Connect</span>
            <span className="block gradient-text">IoT to Web3</span>
            <span className="block">Seamlessly</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform physical device data into blockchain-ready smart contracts with our revolutionary platform
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-loteraa-purple to-loteraa-blue hover:from-loteraa-purple/90 hover:to-loteraa-blue/90 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Start Building
              <ArrowRight className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-gray-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900/50 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-loteraa-purple" />
              </div>
              <span className="text-sm sm:text-base">Developer APIs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900/50 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-loteraa-blue" />
              </div>
              <span className="text-sm sm:text-base">Global Network</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900/50 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-loteraa-teal" />
              </div>
              <span className="text-sm sm:text-base">Real-time Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-loteraa-purple rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-loteraa-teal rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-loteraa-blue rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-10 w-1 h-1 bg-loteraa-purple rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
