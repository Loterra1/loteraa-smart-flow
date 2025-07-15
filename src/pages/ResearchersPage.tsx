import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { 
  Database, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  BarChart3, 
  ArrowRight,
  Globe,
  Coins,
  CheckCircle,
  Activity,
  Users,
  Zap,
  FileText
} from "lucide-react";

export default function ResearchersPage() {
  const [animatedDataPoints, setAnimatedDataPoints] = useState<Array<{ id: number; x: number; y: number; delay: number; type: string }>>([]);

  useEffect(() => {
    const dataPoints = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      type: ['temperature', 'humidity', 'pressure', 'motion'][Math.floor(Math.random() * 4)]
    }));
    setAnimatedDataPoints(dataPoints);
  }, []);

  const researchBenefits = [
    {
      icon: Database,
      title: "Verified IoT Data Access",
      description: "Access to millions of verified IoT data points from devices worldwide, ensuring data integrity and authenticity."
    },
    {
      icon: DollarSign,
      title: "Passive Income Generation",
      description: "Earn passive income by contributing to data verification and analysis. Get rewarded for every validated data entry."
    },
    {
      icon: Shield,
      title: "Blockchain-Secured Data",
      description: "All data is cryptographically secured and stored on blockchain, providing immutable research datasets."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Tools",
      description: "Access powerful analytics dashboard and tools to process and analyze IoT data at scale."
    }
  ];

  const dataCategories = [
    { name: "Environmental", count: "2.3M", color: "text-green-400", icon: "🌿" },
    { name: "Industrial", count: "1.8M", color: "text-blue-400", icon: "🏭" },
    { name: "Smart Cities", count: "1.2M", color: "text-purple-400", icon: "🏙️" },
    { name: "Agriculture", count: "950K", color: "text-yellow-400", icon: "🌾" },
    { name: "Healthcare", count: "780K", color: "text-red-400", icon: "🏥" },
    { name: "Transport", count: "650K", color: "text-cyan-400", icon: "🚗" }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style>
        {`
          @keyframes dataOrbit {
            0% { transform: rotate(0deg) translateX(60px) rotate(0deg); opacity: 0.3; }
            50% { opacity: 1; }
            100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); opacity: 0.3; }
          }
          
          @keyframes mapPulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          
          @keyframes dataStream {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-100vh) rotate(180deg); opacity: 0; }
          }
          
          @keyframes hologramFlicker {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
          }
          
          .data-orbit {
            animation: dataOrbit 20s linear infinite;
          }
          
          .map-pulse {
            animation: mapPulse 4s ease-in-out infinite;
          }
          
          .data-stream {
            animation: dataStream 8s linear infinite;
          }
          
          .hologram-effect {
            animation: hologramFlicker 3s ease-in-out infinite;
          }
        `}
      </style>


      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-loteraa-teal/20 text-loteraa-teal border-loteraa-teal/30 px-6 py-2 text-lg">
              <span className="text-loteraa-teal">For Researchers & Data Analysts</span>
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">Explore Global</span> <br />
              <span className="gradient-text">IoT Data</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Access verified IoT datasets from around the world. Contribute to data verification 
              and earn passive income while advancing research and innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-loteraa-teal hover:bg-loteraa-teal/90 text-white px-8 py-6 text-lg">
                Start Exploring Data <Database className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Research Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-loteraa-teal">Research & Earn</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Contribute to the global IoT data ecosystem and earn rewards for your research contributions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {researchBenefits.map((benefit, index) => (
              <Card key={index} className="bg-loteraa-gray/30 backdrop-blur-sm border-loteraa-gray/40 hover:border-loteraa-teal/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-loteraa-teal/20 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-loteraa-teal" />
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-loteraa-teal transition-colors">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-loteraa-teal/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-loteraa-teal/30">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-loteraa-teal">How It Works</span>
              </h3>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-loteraa-teal/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-loteraa-teal" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">1. Register</h4>
                <p className="text-white/70 text-sm">Sign up as a researcher and verify your credentials</p>
              </div>
              
              <div className="text-center">
                <div className="bg-loteraa-blue/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-loteraa-blue" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">2. Input Data</h4>
                <p className="text-white/70 text-sm">Enter different types of IoT datas and researches and store them on Loterra blockchain to be used by innovative global products</p>
              </div>
              
              <div className="text-center">
                <div className="bg-loteraa-purple/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-loteraa-purple" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">3. Verify</h4>
                <p className="text-white/70 text-sm">Contribute to data verification and quality assurance</p>
              </div>
              
              <div className="text-center">
                <div className="bg-loteraa-teal/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Coins className="h-8 w-8 text-loteraa-teal" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">4. Earn</h4>
                <p className="text-white/70 text-sm">Receive $Terra tokens as rewards monthly basis for your contributions and other incentives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
