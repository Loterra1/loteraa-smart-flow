
import { Shield, Database, Zap } from "lucide-react";
import CubeIllustrationAnimation from "./animations/CubeIllustrationAnimation";
import RadialBurstIllustrationAnimation from "./animations/RadialBurstIllustrationAnimation";
import VortexIllustrationAnimation from "./animations/VortexIllustrationAnimation";
import SpikeBallAnimation from "./animations/SpikeBallAnimation";
import RadialBurstIllustrationAnimation2 from "./animations/RadialBurstIllustrationAnimation2";
import MassAdoptionAnimation from "./animations/MassAdoptionAnimation";
import { Button } from "@/components/ui/button";

export default function FeatureCards() {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-white" />,
      title: "Decentralized Verification",
      description: "Multi-node consensus ensures data authenticity and prevents tampering through cryptographic proofs. Loteraa enables continuous, secure, and low-latency streaming of sensor data from physical environments such as temperature, GPS, or usage metrics directly to its blockchain network.",
      image: "/lovable-uploads/93530648-e8c9-4d3d-8634-90300112ef81.png",
      animation: CubeIllustrationAnimation,
      children: [
        {
          icon: <Database className="h-12 w-12 text-white" />,
          title: "Web3 Connected Contracts",
          description: "Loteraa smart contracts respond autonomously to live sensor inputs enabling logic-based automation across DeFi, logistics, energy, and AI sectors. Data triggers from IoT devices execute cross-chain operations such as payments, alerts, insurance payouts, or asset transfers, establishing an intelligent link between off-chain activities and on-chain decision-making without intermediaries.",
          image: "/lovable-uploads/880ce30d-fe30-44dc-bd14-1cc7f4a471b1.png",
          animation: RadialBurstIllustrationAnimation,
          children: [
            {
              icon: <Zap className="h-12 w-12 text-white" />,
              title: "Advanced Analytics Platform",
              description: "Built-in tools for data visualization, statistical analysis, and machine learning model development. Access live sensor data from thousands of IoT devices worldwide for real-time analysis and research applications.",
              image: "/lovable-uploads/5b8abd22-3a3b-43fe-a8c3-6e1a30a1b758.png",
              animation: VortexIllustrationAnimation
            }
          ]
        }
      ]
    }
  ];

  const renderFeatureCard = (feature: any, level: number = 0) => {
    const marginLeft = level * 4; // Reduced spacing for mobile
    const AnimationComponent = feature.animation;
    
    // Special positioning for the first level (decentralized verification) - pushed down much more
    const isFirstLevel = level === 0;
    const marginTop = isFirstLevel ? 20 : 8; // Reduced margins for mobile
    
    return (
      <div key={feature.title} className={`ml-${marginLeft} mt-${marginTop}`}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 mb-8 lg:mb-12">
          {/* Larger Image with P5.js Animation */}
          <div className="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 relative">
            <img 
              src={feature.image} 
              alt={feature.title}
              className="w-full h-full object-contain opacity-30 absolute inset-0 z-10"
            />
            <div className="absolute inset-0 z-20">
              <AnimationComponent />
            </div>
          </div>
          
          {/* Text content without card styling */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4 lg:mb-6">
              {feature.title}
            </h3>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
        
        {feature.children && (
          <div className="space-y-8 lg:space-y-12">
            {feature.children.map((child: any) => renderFeatureCard(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-24">
      {features.map((feature) => renderFeatureCard(feature))}
      
      {/* Made for Mass Adoption Section */}
      <div className="mt-16 lg:mt-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left side - Heading and Image */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-8 uppercase tracking-wide text-center lg:text-left">
              MADE FOR MASS ADOPTION
            </h2>
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
              <MassAdoptionAnimation />
            </div>
          </div>
          
          {/* Right side - Cards */}
          <div className="flex-1 max-w-2xl">
            {/* Top row - Card 1 and Card 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Card 1 */}
              <div className="bg-black border border-white/20 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                  REAL-WORLD UTILITY, NOT HYPE
                </h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  From data-driven automations to sensor-powered rewards, Loteraa delivers immediate and understandable value to industries, researchers, and individuals. It's not about speculation — it's about solving real problems with on-chain logic.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-black border border-white/20 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                  TOKENOMICS BUILT FOR PARTICIPATION
                </h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  Users earn $LOT by contributing data, staking, or building on the platform — not just holding tokens. This model brings everyone into the economy: developers, businesses, researchers, and everyday users.
                </p>
              </div>
            </div>
            
            {/* Bottom row - Card 3 centered */}
            <div className="flex justify-center">
              <div className="bg-black border border-white/20 rounded-lg p-6 w-full sm:w-2/3 lg:w-3/4 min-h-[200px] flex flex-col">
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                  DATA-FIRST DESIGN FOR THE REAL WORLD
                </h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  Loteraa is built around real-time sensor data, making it the first blockchain where data isn't just stored — it's monetized, automated, and rewarded. From supply chain to healthcare to smart cities, this approach transforms everyday data into economic activity, unlocking mass adoption beyond crypto-native users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Earn Rewards Section */}
      <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-6">
        {/* Left side - Heading and Description */}
        <div className="flex-1 max-w-3xl text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 lg:mb-12 uppercase tracking-wide leading-tight">
            EARN REWARD WITH $LOT TOKEN
          </h2>
          <p className="text-white/70 text-base sm:text-lg lg:text-2xl leading-relaxed">
            The Loteraa ecosystem is powered by the $Lot token, a utility and reward token designed to fuel sensor contributions, validate data quality, incentivize uptime, and govern the platform's evolution.
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <img 
            src="/lovable-uploads/a2f6c8cd-4a5e-421c-ad7c-865057026961.png" 
            alt="$LOT Token Reward System"
            className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] object-contain"
          />
        </div>
      </div>

      {/* Three Square Cards Section - Mobile Responsive */}
      <div className="mt-16 lg:mt-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 mb-4 lg:mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors overflow-hidden">
            <div className="w-full h-48 sm:h-64 lg:h-96">
              <img 
                src="/lovable-uploads/fcf61d68-e0b0-43c5-be0e-73816884379c.png" 
                alt="Sphere"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors overflow-hidden">
            <div className="w-full h-48 sm:h-64 lg:h-96">
              <img 
                src="/lovable-uploads/837a4976-6ca2-4340-ad3a-e63df1a93783.png" 
                alt="Abstract Form"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-2/3 lg:w-1/2 overflow-hidden">
            <div className="w-full h-48 sm:h-64 lg:h-96">
              <img 
                src="/lovable-uploads/cdbb3b1e-c51a-4f69-8e64-5f0e520fcaed.png" 
                alt="Spiral Disk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 lg:mt-24 flex justify-center px-4">
        <div 
          className="relative w-full max-w-[700px] h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col items-center justify-center text-center rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url('/lovable-uploads/5892d5a1-463b-4189-9015-cb021db22c40.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 lg:mb-10 uppercase tracking-wide">
              FOR DEVELOPERS
            </h2>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 lg:mb-12">
              Loteraa offers a robust set of APIs and software development kits (SDKs) that allow developers to quickly integrate IoT data into decentralized apps. With built-in security, compatibility layers, documentation, and pre-configured modules, it removes technical complexity empowering developers to build IoT-Web3 applications that scale across devices and blockchains.
            </p>
            <Button className="bg-white hover:bg-white/90 text-black px-6 lg:px-10 py-3 lg:py-5 text-sm sm:text-lg lg:text-xl font-semibold rounded-lg">
              START BUILDING
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-7xl mx-auto px-4">
        <div className="bg-black border border-white/20 rounded-lg p-4 sm:p-6 lg:p-12 min-h-[300px] lg:h-96 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 h-full">
            <div className="w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-full flex-shrink-0">
              <SpikeBallAnimation />
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 uppercase tracking-wide text-white">
                PLATFORM ARCHITECTURE
              </h3>
              <p className="text-white/80 text-sm sm:text-base lg:text-xl leading-relaxed">
                The Loteraa platform is built on a modular and scalable architecture designed to securely connect real-world sensor data to on-chain smart contracts. This architecture bridges five core components: the Device Layer, the Backend Data Ingestion Layer, the Oracle Layer, the Smart Contract Layer, and the Storage Layer. Together, these layers form a robust, tamper-proof pipeline that transforms raw physical inputs into verified blockchain transactions and automation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-black border border-white/20 rounded-lg p-4 sm:p-6 lg:p-12 min-h-[300px] lg:h-96">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 h-full">
            <div className="w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-full flex-shrink-0">
              <RadialBurstIllustrationAnimation2 />
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 uppercase tracking-wide text-white">
                USE CASES AND IMPACT
              </h3>
              <p className="text-white/80 text-sm sm:text-base lg:text-xl leading-relaxed">
                Loteraa creates a new paradigm for how physical data can power decentralized applications, enabling automation, transparency, and equitable reward systems. Through Loteraa, real-time sensor data can trigger smart contracts, train AI models, or settle digital agreements with no need for centralized intermediaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
