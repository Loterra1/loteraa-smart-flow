
import { Shield, Database, Zap } from "lucide-react";
import CubeIllustrationAnimation from "./animations/CubeIllustrationAnimation";
import RadialBurstIllustrationAnimation from "./animations/RadialBurstIllustrationAnimation";
import VortexIllustrationAnimation from "./animations/VortexIllustrationAnimation";

export default function FeatureCards() {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-white" />,
      title: "Decentralized Verification",
      description: "Multi-node consensus ensures data authenticity and prevents tampering through cryptographic proofs.",
      image: "/lovable-uploads/93530648-e8c9-4d3d-8634-90300112ef81.png",
      animation: CubeIllustrationAnimation,
      children: [
        {
          icon: <Database className="h-12 w-12 text-white" />,
          title: "Verified IoT Data Access",
          description: "Access to millions of verified IoT data points from devices worldwide, ensuring data integrity and authenticity.",
          image: "/lovable-uploads/880ce30d-fe30-44dc-bd14-1cc7f4a471b1.png",
          animation: RadialBurstIllustrationAnimation,
          children: [
            {
              icon: <Zap className="h-12 w-12 text-white" />,
              title: "Real-time Processing",
              description: "Stream live sensor data directly to smart contracts with minimal latency for time-sensitive applications.",
              image: "/lovable-uploads/5b8abd22-3a3b-43fe-a8c3-6e1a30a1b758.png",
              animation: VortexIllustrationAnimation
            }
          ]
        }
      ]
    }
  ];

  const renderFeatureCard = (feature: any, level: number = 0) => {
    const marginLeft = level * 12; // Increased spacing between levels
    const AnimationComponent = feature.animation;
    
    // Special positioning for the first level (decentralized verification)
    const isFirstLevel = level === 0;
    const marginTop = isFirstLevel ? 48 : 12; // Pushed first level down much more (3 steps down)
    
    return (
      <div key={feature.title} className={`ml-${marginLeft} mt-${marginTop}`}>
        <div className="flex items-center justify-center gap-12 mb-12">
          {/* Larger Image with P5.js Animation */}
          <div className="flex-shrink-0 w-64 h-64 relative">
            <img 
              src={feature.image} 
              alt={feature.title}
              className="w-full h-full object-contain opacity-30 absolute inset-0 z-10"
            />
            <div className="absolute inset-0 z-20">
              <AnimationComponent />
            </div>
          </div>
          
          {/* Larger card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10 hover:bg-white/10 transition-colors flex-1 max-w-xl">
            <div className="mb-6">
              {feature.icon}
            </div>
            <h3 className="text-3xl font-semibold text-white mb-6">
              {feature.title}
            </h3>
            <p className="text-white/70 text-lg leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
        
        {feature.children && (
          <div className="space-y-12">
            {feature.children.map((child: any) => renderFeatureCard(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-24">
      {features.map((feature) => renderFeatureCard(feature))}
      
      {/* New Earn Rewards Section */}
      <div className="mt-24 flex items-center justify-center gap-20">
        {/* Left side - Heading and Description */}
        <div className="flex-1 max-w-3xl">
          <h2 className="text-6xl font-bold text-white mb-12 uppercase tracking-wide">
            EARN REWARD WITH $LOT TOKEN
          </h2>
          <p className="text-white/70 text-2xl leading-relaxed">
            The Loteraa ecosystem is powered by the $Lot token, a utility and reward token designed to fuel sensor contributions, validate data quality, incentivize uptime, and govern the platform's evolution.
          </p>
        </div>
        
        {/* Right side - Very Large Image */}
        <div className="flex-shrink-0">
          <img 
            src="/lovable-uploads/a2f6c8cd-4a5e-421c-ad7c-865057026961.png" 
            alt="$LOT Token Reward System"
            className="w-[500px] h-[500px] object-contain"
          />
        </div>
      </div>

      {/* Three Square Cards Section */}
      <div className="mt-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Card 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-full h-80 mb-6">
              <img 
                src="/lovable-uploads/b735b677-3ceb-4e10-9297-7a791a86fdfe.png" 
                alt="Sphere"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-full h-80 mb-6">
              <img 
                src="/lovable-uploads/13293393-b3d8-4bee-97e7-03c1063cfb41.png" 
                alt="Abstract Form"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Card 3 - Centered below */}
        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors w-1/2">
            <div className="w-full h-80 mb-6">
              <img 
                src="/lovable-uploads/07cc36d1-fe8c-48eb-bc48-c6d4478f4428.png" 
                alt="Spiral Disk"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
