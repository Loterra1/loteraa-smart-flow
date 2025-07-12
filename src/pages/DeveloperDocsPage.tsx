import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { 
  Code, 
  Cpu, 
  Wrench, 
  Shield, 
  Monitor, 
  BookOpen, 
  ArrowRight,
  Layers,
  Zap,
  Globe,
  Settings
} from "lucide-react";

export default function DeveloperDocsPage() {
  const [animatedElements, setAnimatedElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setAnimatedElements(elements);
  }, []);

  const developerTools = [
    {
      title: "Loteraa Hardware SDK",
      description: "Comprehensive SDK with libraries for major IoT boards to connect devices directly to Loteraa, sign data packets and interact with smart contracts.",
      icon: Cpu,
      features: ["Multi-board Support", "Cryptographic Signing", "Smart Contract Integration", "Real-time Data Streaming"],
      badge: "Core SDK"
    },
    {
      title: "IoT Device Lab",
      description: "Simulate input from virtual devices to test smart contract responses before deploying to production environments.",
      icon: Monitor,
      features: ["Virtual Device Simulation", "Smart Contract Testing", "Response Validation", "Deployment Testing"],
      badge: "Testing"
    },
    {
      title: "No-Code Hardware Configurator",
      description: "Visual drag and drop interface for configuring and wiring sensors to boards without writing code.",
      icon: Wrench,
      features: ["Drag & Drop Interface", "Visual Wiring", "Sensor Configuration", "Board Management"],
      badge: "Visual Tools"
    },
    {
      title: "SensorChain Device Registration",
      description: "Tool that helps developers register physical devices onchain, binding metadata and device information.",
      icon: Layers,
      features: ["Onchain Registration", "Metadata Binding", "Device Management", "Blockchain Integration"],
      badge: "Registration"
    },
    {
      title: "Device Identity & Security Toolkit",
      description: "Manage key pairs, signed messages and device IDs using SensorChain PKI. Authenticate and secure sensor messages.",
      icon: Shield,
      features: ["PKI Management", "Key Pair Generation", "Message Signing", "Device Authentication"],
      badge: "Security"
    },
    {
      title: "Hardware Diagnostic Dashboard",
      description: "Monitor the health of deployed physical devices with real-time diagnostics and performance metrics.",
      icon: Settings,
      features: ["Real-time Monitoring", "Health Diagnostics", "Performance Metrics", "Alert System"],
      badge: "Monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <style>
        {`
          @keyframes codeFloat {
            0%, 100% { transform: translateY(0) rotateX(0deg); opacity: 0.3; }
            50% { transform: translateY(-30px) rotateX(15deg); opacity: 0.8; }
          }
          
          @keyframes digitalRain {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          
          @keyframes hologramGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(113, 66, 246, 0.3); }
            50% { box-shadow: 0 0 40px rgba(113, 66, 246, 0.8), 0 0 60px rgba(49, 130, 244, 0.4); }
          }
          
          @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 10px rgba(113, 66, 246, 0.5); }
            50% { text-shadow: 0 0 20px rgba(113, 66, 246, 1), 0 0 30px rgba(49, 130, 244, 0.5); }
          }
          
          .code-element {
            animation: codeFloat 8s ease-in-out infinite;
          }
          
          .digital-rain {
            animation: digitalRain 6s linear infinite;
          }
          
          .hologram-card {
            animation: hologramGlow 4s ease-in-out infinite;
          }
          
          .glow-text {
            animation: textGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Digital Rain Effect */}
        {animatedElements.map((element) => (
          <div
            key={element.id}
            className="absolute digital-rain text-loteraa-blue/20 font-mono text-xs"
            style={{
              left: `${element.x}%`,
              animationDelay: `${element.delay}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
        
        {/* Floating Code Elements */}
        <div className="absolute top-20 left-10 code-element">
          <Code className="h-8 w-8 text-loteraa-purple/30" />
        </div>
        <div className="absolute top-32 right-20 code-element" style={{ animationDelay: '2s' }}>
          <Cpu className="h-6 w-6 text-loteraa-blue/30" />
        </div>
        <div className="absolute bottom-40 left-1/4 code-element" style={{ animationDelay: '4s' }}>
          <Globe className="h-10 w-10 text-loteraa-teal/30" />
        </div>
        <div className="absolute top-1/2 right-10 code-element" style={{ animationDelay: '6s' }}>
          <Zap className="h-7 w-7 text-loteraa-purple/30" />
        </div>
      </div>

      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-loteraa-purple/20 text-loteraa-purple border-loteraa-purple/30 px-6 py-2 text-lg">
              Developer Documentation
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 glow-text">
              <span className="gradient-text">Build the Future</span> of <br />
              <span className="gradient-text">IoT & Blockchain</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Access comprehensive developer tools to build IoT DApps and innovative solutions. 
              Bring blockchain IoT closer to the people with Loteraa's cutting-edge development platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg hologram-card">
                Access Documentation <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              <span className="gradient-text">Developer Toolkit</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need to build, test, and deploy IoT applications on the Loteraa blockchain
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developerTools.map((tool, index) => (
              <Card key={index} className="bg-loteraa-gray/30 backdrop-blur-sm border-loteraa-gray/40 hover:border-loteraa-purple/50 transition-all duration-300 hologram-card group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-loteraa-purple/20 rounded-lg">
                      <tool.icon className="h-6 w-6 text-loteraa-purple" />
                    </div>
                    <Badge variant="outline" className="text-loteraa-blue border-loteraa-blue/40">
                      {tool.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-loteraa-purple transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-white/60">
                        <ArrowRight className="h-3 w-3 text-loteraa-teal mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-loteraa-purple/20 to-loteraa-blue/20 rounded-2xl p-8 md:p-12 border border-loteraa-purple/30 hologram-card">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
                  <span className="gradient-text">Start Building Today</span>
                </h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Get started with our comprehensive documentation, tutorials, and code samples. 
                  Join thousands of developers building the next generation of IoT applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white">
                    View Documentation <BookOpen className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-loteraa-black/50 rounded-lg p-6 font-mono text-sm">
                  <div className="text-loteraa-purple mb-2">// Initialize Loteraa SDK</div>
                  <div className="text-white">
                    <span className="text-loteraa-blue">import</span> {`{ LoteraaSDK }`} <span className="text-loteraa-blue">from</span> <span className="text-loteraa-teal">'@loteraa/sdk'</span>
                  </div>
                  <div className="text-white mt-2">
                    <span className="text-loteraa-blue">const</span> <span className="text-white">sdk</span> = <span className="text-loteraa-blue">new</span> <span className="text-loteraa-purple">LoteraaSDK</span>()
                  </div>
                  <div className="text-white mt-2">
                    <span className="text-loteraa-blue">await</span> sdk.<span className="text-loteraa-purple">connect</span>()
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
