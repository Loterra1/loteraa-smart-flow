
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  Lightbulb,
  ArrowRight,
  Cpu,
  Network,
  Database,
  Lock,
  Rocket,
  Heart
} from "lucide-react";

export default function AboutPage() {
  const [animatedElements, setAnimatedElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setAnimatedElements(elements);
  }, []);

  const goals = [
    {
      icon: <Target className="h-8 w-8 text-loteraa-purple" />,
      title: "Democratize IoT Data",
      description: "Make IoT data accessible and valuable for everyone through blockchain technology."
    },
    {
      icon: <Zap className="h-8 w-8 text-loteraa-blue" />,
      title: "Enable Automation",
      description: "Connect real-world devices to smart contracts for seamless automation."
    },
    {
      icon: <Shield className="h-8 w-8 text-loteraa-teal" />,
      title: "Ensure Security",
      description: "Provide unbreakable security and data integrity through blockchain encryption."
    },
    {
      icon: <Globe className="h-8 w-8 text-loteraa-purple" />,
      title: "Global Infrastructure",
      description: "Build a worldwide network of connected IoT devices and smart contracts."
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="h-6 w-6 text-loteraa-teal" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with IoT and blockchain."
    },
    {
      icon: <Users className="h-6 w-6 text-loteraa-blue" />,
      title: "Community",
      description: "We believe in the power of decentralized communities to drive change."
    },
    {
      icon: <Lock className="h-6 w-6 text-loteraa-purple" />,
      title: "Security",
      description: "Security and privacy are at the core of everything we build."
    },
    {
      icon: <Heart className="h-6 w-6 text-loteraa-teal" />,
      title: "Transparency",
      description: "We operate with complete transparency and open-source principles."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-loteraa-black via-loteraa-darkPurple to-loteraa-black relative overflow-hidden">
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
          
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(113, 66, 246, 0.3); transform: scale(1); }
            50% { box-shadow: 0 0 40px rgba(12, 204, 188, 0.5); transform: scale(1.02); }
          }
          
          @keyframes networkPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          .float-animation {
            animation: floatUp 12s linear infinite;
          }
          
          .pulse-glow {
            animation: pulseGlow 4s ease-in-out infinite;
          }
          
          .network-pulse {
            animation: networkPulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {animatedElements.map((element) => (
          <div
            key={element.id}
            className="absolute float-animation"
            style={{
              left: `${element.x}%`,
              animationDelay: `${element.delay}s`
            }}
          >
            {element.id % 4 === 0 && <Cpu className="h-4 w-4 text-loteraa-purple/40" />}
            {element.id % 4 === 1 && <Network className="h-4 w-4 text-loteraa-blue/40" />}
            {element.id % 4 === 2 && <Database className="h-4 w-4 text-loteraa-teal/40" />}
            {element.id % 4 === 3 && <Lock className="h-4 w-4 text-loteraa-purple/40" />}
          </div>
        ))}
      </div>

      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-loteraa-purple/20 text-loteraa-purple border-loteraa-purple/30 px-6 py-2 text-lg">
              About Loteraa
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">Connecting IoT</span> <br />
              <span className="gradient-text">to Blockchain</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Loteraa is building the future of IoT-blockchain infrastructure, enabling seamless 
              integration between real-world devices and decentralized smart contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-loteraa-gray/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-loteraa-gray/30 pulse-glow">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Our Mission</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                To create a decentralized ecosystem where IoT devices can securely interact with 
                blockchain networks, enabling new forms of automation, data monetization, and 
                machine-to-machine transactions that benefit everyone.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goals.map((goal, index) => (
                <Card key={index} className="bg-loteraa-gray/30 backdrop-blur-sm border-loteraa-gray/40 hover:border-loteraa-purple/50 transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-loteraa-purple/20 rounded-lg w-fit group-hover:bg-loteraa-purple/30 transition-colors">
                      {goal.icon}
                    </div>
                    <CardTitle className="text-white text-lg group-hover:text-loteraa-purple transition-colors">
                      {goal.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 text-center text-sm">
                      {goal.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Our Technology</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Built on cutting-edge blockchain technology with a focus on scalability and security
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-loteraa-purple/20 to-loteraa-blue/20 backdrop-blur-sm border-loteraa-purple/30 pulse-glow">
              <CardHeader>
                <div className="p-4 bg-loteraa-purple/20 rounded-lg w-fit mb-4">
                  <Network className="h-10 w-10 text-loteraa-purple" />
                </div>
                <CardTitle className="text-white text-xl">Decentralized Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Our blockchain network ensures no single point of failure while maintaining 
                  high throughput for IoT device interactions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-loteraa-blue/20 to-loteraa-teal/20 backdrop-blur-sm border-loteraa-blue/30 pulse-glow">
              <CardHeader>
                <div className="p-4 bg-loteraa-blue/20 rounded-lg w-fit mb-4">
                  <Shield className="h-10 w-10 text-loteraa-blue" />
                </div>
                <CardTitle className="text-white text-xl">Quantum-Resistant Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Advanced cryptographic protocols protect your IoT data against current 
                  and future security threats.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-loteraa-teal/20 to-loteraa-purple/20 backdrop-blur-sm border-loteraa-teal/30 pulse-glow">
              <CardHeader>
                <div className="p-4 bg-loteraa-teal/20 rounded-lg w-fit mb-4">
                  <Rocket className="h-10 w-10 text-loteraa-teal" />
                </div>
                <CardTitle className="text-white text-xl">Scalable Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Built to handle millions of IoT devices with lightning-fast transaction 
                  processing and minimal energy consumption.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-loteraa-teal/20 to-loteraa-purple/20 rounded-2xl p-8 md:p-12 border border-loteraa-teal/30 pulse-glow">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Our Values</span>
              </h3>
              <p className="text-white/70 text-xl">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-loteraa-black/50 backdrop-blur-sm rounded-lg p-6 border border-loteraa-gray/30 hover:border-loteraa-teal/50 transition-all duration-300">
                    <div className="mx-auto mb-4 p-3 bg-loteraa-teal/20 rounded-lg w-fit group-hover:bg-loteraa-teal/30 transition-colors">
                      {value.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-loteraa-teal transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-white/70 text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Join the Revolution</span>
          </h3>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Be part of the future where IoT and blockchain converge to create endless possibilities
          </p>
          <Button size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg pulse-glow">
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
