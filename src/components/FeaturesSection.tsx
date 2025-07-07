
import { Database, Zap, Code, Coins, BarChart3 } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Database className="h-8 w-8 text-loteraa-blue" />,
      title: "Real-Time Data Feed",
      description: "Secure, low-latency data streaming from IoT devices directly to blockchain networks."
    },
    {
      icon: <Zap className="h-8 w-8 text-loteraa-purple" />,
      title: "Web3 Connected Contracts",
      description: "Seamlessly connect sensor data to trigger smart contract executions across multiple blockchains."
    },
    {
      icon: <Code className="h-8 w-8 text-loteraa-teal" />,
      title: "Developer API & SDK",
      description: "Comprehensive tools and documentation to build IoT-blockchain integrations with minimal effort."
    },
    {
      icon: <Coins className="h-8 w-8 text-loteraa-blue" />,
      title: "Tokenized Rewards",
      description: "Incentive mechanisms for data providers and consumers built directly into the protocol."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-loteraa-purple" />,
      title: "Decentralized Dashboard",
      description: "Monitor and manage your IoT networks with advanced real-time analytics and insights."
    }
  ];

  return (
    <section id="features" className="py-20 bg-black relative overflow-hidden">
      {/* Background Crystal Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Image 1 - Blue Diamond in the middle */}
        <img 
          src="/lovable-uploads/a6679839-c209-48f6-aa09-b523fc108529.png" 
          alt="" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_30px_rgba(49,130,244,0.8)] animate-pulse-soft"
        />
        
        {/* Image 2 - Purple Crystals on right side and duplicates */}
        <img 
          src="/lovable-uploads/3c22ba94-5195-49f8-91d3-bbd18517ee08.png" 
          alt="" 
          className="absolute right-10 top-1/4 w-32 h-auto opacity-40 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.7)] animate-pulse-soft"
        />
        <img 
          src="/lovable-uploads/3c22ba94-5195-49f8-91d3-bbd18517ee08.png" 
          alt="" 
          className="absolute right-20 bottom-1/4 w-24 h-auto opacity-35 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.7)] animate-pulse-soft"
        />
        <img 
          src="/lovable-uploads/3c22ba94-5195-49f8-91d3-bbd18517ee08.png" 
          alt="" 
          className="absolute left-1/3 top-10 w-28 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.7)] animate-pulse-soft"
        />
        <img 
          src="/lovable-uploads/3c22ba94-5195-49f8-91d3-bbd18517ee08.png" 
          alt="" 
          className="absolute right-1/3 bottom-10 w-26 h-auto opacity-35 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.7)] animate-pulse-soft"
        />
        <img 
          src="/lovable-uploads/3c22ba94-5195-49f8-91d3-bbd18517ee08.png" 
          alt="" 
          className="absolute left-1/2 bottom-1/3 w-20 h-auto opacity-25 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.7)] animate-pulse-soft"
        />
        
        {/* Image 3 - Purple/Pink Crystals on left side and duplicates */}
        <img 
          src="/lovable-uploads/5922370a-5cd7-49bb-b920-4ce1c5cae5a4.png" 
          alt="" 
          className="absolute left-10 top-1/3 w-36 h-auto opacity-40 z-0 filter brightness-150 drop-shadow-[0_0_25px_rgba(113,66,246,0.8)] animate-pulse-soft"
        />
        <img 
          src="/lovable-uploads/5922370a-5cd7-49bb-b920-4ce1c5cae5a4.png" 
          alt="" 
          className="absolute left-20 bottom-1/3 w-28 h-auto opacity-35 z-0 filter brightness-150 drop-shadow-[0_0_25px_rgba(113,66,246,0.8)] animate-pulse-soft"
        />
        <img 
          src="/lovable-uploads/5922370a-5cd7-49bb-b920-4ce1c5cae5a4.png" 
          alt="" 
          className="absolute right-1/4 top-20 w-24 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_25px_rgba(113,66,246,0.8)] animate-pulse-soft"
        />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Powerful</span> Features
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Unlock new possibilities at the intersection of IoT and blockchain technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-loteraa-gray/20 backdrop-blur-sm rounded-xl p-6 border border-loteraa-gray/20 transition-all duration-300 hover:border-loteraa-purple/50 hover:translate-y-[-5px] group"
            >
              <div className="bg-loteraa-gray/30 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-loteraa-purple/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
