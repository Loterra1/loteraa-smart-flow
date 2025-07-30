
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { 
  Database, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  Globe,
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

  const researchFeatures = [
    {
      title: "Real-Time IoT Data Streams",
      description: "Access live sensor data from thousands of IoT devices worldwide for real-time analysis and research applications.",
      icon: Database,
      features: ["Live Data Streaming", "Multiple Device Types", "Global Coverage", "High-Frequency Updates"],
      badge: "Live Data"
    },
    {
      title: "Blockchain-Verified Datasets",
      description: "Ensure data integrity with cryptographically signed datasets that are tamper-proof and traceable to their source.",
      icon: Shield,
      features: ["Cryptographic Signatures", "Tamper-Proof Records", "Source Verification", "Audit Trail"],
      badge: "Verified"
    },
    {
      title: "Advanced Analytics Platform",
      description: "Built-in tools for data visualization, statistical analysis, and machine learning model development.",
      icon: TrendingUp,
      features: ["Data Visualization", "Statistical Tools", "ML Integration", "Custom Dashboards"],
      badge: "Analytics"
    },
    {
      title: "Collaborative Research Environment",
      description: "Share datasets, collaborate on projects, and publish findings within a decentralized research community.",
      icon: Users,
      features: ["Dataset Sharing", "Project Collaboration", "Peer Review", "Publication Tools"],
      badge: "Community"
    },
    {
      title: "Historical Data Archives",
      description: "Access years of historical IoT data for trend analysis, pattern recognition, and longitudinal studies.",
      icon: Clock,
      features: ["Historical Records", "Time Series Analysis", "Pattern Recognition", "Long-term Studies"],
      badge: "Archives"
    },
    {
      title: "Quality Assurance Framework",
      description: "Automated data quality checks and validation processes ensure research-grade data reliability.",
      icon: CheckCircle,
      features: ["Quality Metrics", "Validation Rules", "Error Detection", "Data Cleaning"],
      badge: "Quality"
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
              Research Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 glow-text">
              <span className="text-white">Unlock IoT Data</span> <br />
              <span className="text-white">for Research</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Access the world's largest decentralized IoT dataset. Conduct groundbreaking research 
              with verified, real-time sensor data from devices across the globe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white hover:bg-white/90 text-black px-8 py-6 text-lg hologram-card">
                Access Research Data <Database className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Research Features Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              <span className="text-white">Research-Grade Data Platform</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything researchers need to conduct world-class IoT and sensor data analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchFeatures.map((feature, index) => (
              <Card key={index} className="bg-black backdrop-blur-sm border-white/40 hover:border-white/50 transition-all duration-300 hologram-card group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-white border-white/40">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-white transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.features.map((item, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-white/60">
                        <ArrowRight className="h-3 w-3 text-white mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Access Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-loteraa-purple/20 to-loteraa-blue/20 rounded-2xl p-8 md:p-12 border border-loteraa-purple/30 hologram-card">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
                  <span className="text-white">Start Your Research Today</span>
                </h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Join thousands of researchers already using Loteraa's platform to conduct 
                  cutting-edge IoT and sensor data research. Get instant access to verified, 
                  real-time data streams.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white hover:bg-white/90 text-black">
                    Access Data Platform <Database className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-black/50 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4">
                      <div className="text-3xl font-bold text-white mb-2">10M+</div>
                      <div className="text-white/70">Data Points</div>
                    </div>
                    <div className="p-4">
                      <div className="text-3xl font-bold text-white mb-2">50+</div>
                      <div className="text-white/70">Device Types</div>
                    </div>
                    <div className="p-4">
                      <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                      <div className="text-white/70">Uptime</div>
                    </div>
                    <div className="p-4">
                      <div className="text-3xl font-bold text-white mb-2">24/7</div>
                      <div className="text-white/70">Real-time</div>
                    </div>
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
