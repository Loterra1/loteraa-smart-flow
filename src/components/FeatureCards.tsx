
import { Shield, Database, Zap } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Decentralized Verification",
      description: "Multi-node consensus ensures data authenticity and prevents tampering through cryptographic proofs.",
      children: [
        {
          icon: <Database className="h-8 w-8 text-white" />,
          title: "Verified IoT Data Access",
          description: "Access to millions of verified IoT data points from devices worldwide, ensuring data integrity and authenticity.",
          children: [
            {
              icon: <Zap className="h-8 w-8 text-white" />,
              title: "Real-time Processing",
              description: "Stream live sensor data directly to smart contracts with minimal latency for time-sensitive applications."
            }
          ]
        }
      ]
    }
  ];

  const renderFeatureCard = (feature: any, level: number = 0) => {
    const marginLeft = level * 8; // 32px (8 * 4) per level
    
    return (
      <div key={feature.title} className={`ml-${marginLeft}`}>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors mb-6">
          <div className="mb-4">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-3">
            {feature.title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
        
        {feature.children && (
          <div className="space-y-6">
            {feature.children.map((child: any) => renderFeatureCard(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-16">
      {features.map((feature) => renderFeatureCard(feature))}
    </div>
  );
}
