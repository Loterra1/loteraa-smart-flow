
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
          <div className="flex-shrink-0 w-48 h-48 relative">
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
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-10 border border-white/10 hover:bg-white/10 transition-colors flex-1 max-w-lg">
            <div className="mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-white/70 text-base leading-relaxed">
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
    </div>
  );
}
