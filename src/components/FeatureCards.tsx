
import { Shield, Database, Zap, Award } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Decentralized Verification",
      description: "Multi-node consensus ensures data authenticity and prevents tampering through cryptographic proofs."
    },
    {
      icon: <Database className="h-8 w-8 text-white" />,
      title: "Verified IoT Data Access",
      description: "Access to millions of verified IoT data points from devices worldwide, ensuring data integrity and authenticity."
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Real-time Processing",
      description: "Stream live sensor data directly to smart contracts with minimal latency for time-sensitive applications."
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Automated Rewards",
      description: "Earn $LOT tokens automatically for contributing verified data, validating information, and maintaining network integrity."
    }
  ];

  return (
    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors"
        >
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
      ))}
    </div>
  );
}
