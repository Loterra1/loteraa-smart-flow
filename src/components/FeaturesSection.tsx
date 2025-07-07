
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
    <section id="features" className="py-20 bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
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
