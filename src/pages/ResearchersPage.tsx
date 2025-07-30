
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { 
  Database, 
  Brain, 
  BarChart3, 
  Shield, 
  Globe, 
  BookOpen, 
  ArrowRight,
  Users,
  Target,
  Zap
} from "lucide-react";

export default function ResearchersPage() {
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

  const researchAreas = [
    {
      title: "AI & Machine Learning",
      description: "Access vast datasets of sensor readings to train predictive models, anomaly detection systems, and intelligent automation algorithms with real-world IoT data.",
      icon: Brain,
      features: ["Real-time Data Streams", "Historical Analytics", "Model Training APIs", "Cross-device Correlation"]
    },
    {
      title: "Blockchain Research",
      description: "Study decentralized consensus mechanisms, oracle networks, and smart contract automation using live IoT sensor data as triggers and validators.",
      icon: Shield,
      features: ["Consensus Analysis", "Oracle Performance", "Smart Contract Testing", "Network Security"]
    },
    {
      title: "Environmental Studies",
      description: "Analyze climate patterns, pollution levels, and environmental changes through our global network of distributed sensors and weather stations.",
      icon: Globe,
      features: ["Climate Monitoring", "Pollution Tracking", "Biodiversity Studies", "Ecosystem Analysis"]
    },
    {
      title: "Urban Planning",
      description: "Leverage traffic flow data, occupancy sensors, and infrastructure monitoring to optimize city planning and smart city initiatives.",
      icon: BarChart3,
      features: ["Traffic Analysis", "Infrastructure Health", "Population Dynamics", "Resource Optimization"]
    }
  ];

  const benefits = [
    {
      icon: Database,
      title: "Massive Scale",
      description: "Access to millions of sensor readings from thousands of IoT devices worldwide"
    },
    {
      icon: Shield,
      title: "Verified Data",
      description: "All data is cryptographically verified and tamper-proof through blockchain validation"
    },
    {
      icon: Zap,
      title: "Real-time Access",
      description: "Stream live sensor data or access historical datasets through our API"
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Join a community of researchers working on cutting-edge IoT and blockchain projects"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-6 py-2 text-lg">
              For Researchers & Academia
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 glow-text">
              <span className="text-white">Accelerate Your</span> <br />
              <span className="text-white">Research with</span> <br />
              <span className="text-white">Real-World IoT Data</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Access the world's largest decentralized IoT dataset for groundbreaking research 
              in AI, blockchain, environmental science, and urban planning. Build the future 
              with verified, real-time sensor data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white hover:bg-white/90 text-black px-8 py-6 text-lg hologram-card">
                Start Your Research <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg">
                Browse Datasets <Database className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {animatedElements.map((element) => (
            <div
              key={element.id}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                animationDelay: `${element.delay}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              <span className="text-white">Research Areas</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Explore diverse research opportunities powered by our global IoT sensor network
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <Card key={index} className="bg-black backdrop-blur-sm border-white/40 hover:border-white/50 transition-all duration-300 hologram-card group">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <area.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl group-hover:text-white transition-colors">
                      {area.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {area.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-white/60">
                        <ArrowRight className="h-3 w-3 text-white mr-2" />
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

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              <span className="text-white">Why Choose Loteraa</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Unparalleled access to verified, real-world IoT data for your research projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-2xl p-8 md:p-12 border border-white/30 hologram-card">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
                <span className="text-white">Start Your Research Today</span>
              </h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Join leading researchers and institutions using Loteraa's IoT data platform. 
                Access our API, browse datasets, and contribute to the future of connected research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-white/90 text-black">
                  Apply for Research Access <Target className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  View Documentation <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
