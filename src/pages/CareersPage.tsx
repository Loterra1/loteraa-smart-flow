
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { 
  Users, 
  Globe, 
  Rocket, 
  Heart,
  Code,
  Shield,
  Server,
  Brain,
  Cpu,
  Network,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react";

export default function CareersPage() {
  const [animatedElements, setAnimatedElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const elements = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
    }));
    setAnimatedElements(elements);
  }, []);

  const jobRoles = [
    {
      icon: <Cpu className="h-8 w-8 text-loteraa-purple" />,
      title: "IoT Firmware Developer",
      location: "Remote / Global",
      type: "Full-time",
      description: "Develop low-level firmware for IoT devices, optimize power consumption, and ensure seamless blockchain connectivity.",
      responsibilities: [
        "Design and implement firmware for various IoT sensors and devices",
        "Optimize code for memory and power efficiency",
        "Implement secure communication protocols",
        "Collaborate with hardware teams on device integration"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-loteraa-blue" />,
      title: "Security Engineer",
      location: "Remote / Global",
      type: "Full-time",
      description: "Ensure the highest security standards across our IoT-blockchain infrastructure and protect against emerging threats.",
      responsibilities: [
        "Conduct security audits and penetration testing",
        "Implement cryptographic protocols and key management",
        "Design secure communication channels for IoT devices",
        "Monitor and respond to security incidents"
      ]
    },
    {
      icon: <Server className="h-8 w-8 text-loteraa-teal" />,
      title: "DevOps / Infrastructure Engineer",
      location: "Remote / Global",
      type: "Full-time",
      description: "Build and maintain scalable infrastructure to support millions of IoT devices and blockchain transactions.",
      responsibilities: [
        "Design and implement CI/CD pipelines",
        "Manage cloud infrastructure and containerization",
        "Monitor system performance and reliability",
        "Automate deployment and scaling processes"
      ]
    },
    {
      icon: <Code className="h-8 w-8 text-loteraa-purple" />,
      title: "Developer Relations / SDK Engineer",
      location: "Remote / Global",
      type: "Full-time",
      description: "Create developer tools, SDKs, and documentation to help developers build on our IoT-blockchain platform.",
      responsibilities: [
        "Develop and maintain SDKs and APIs",
        "Create comprehensive documentation and tutorials",
        "Support developer community and answer technical questions",
        "Organize hackathons and developer events"
      ]
    },
    {
      icon: <Network className="h-8 w-8 text-loteraa-blue" />,
      title: "Protocol Engineer",
      location: "Remote / Global",
      type: "Full-time",
      description: "Design and implement blockchain protocols optimized for IoT device interactions and data validation.",
      responsibilities: [
        "Design consensus mechanisms for IoT data validation",
        "Implement smart contract protocols",
        "Optimize blockchain performance for IoT use cases",
        "Research and implement new protocol improvements"
      ]
    },
    {
      icon: <Brain className="h-8 w-8 text-loteraa-teal" />,
      title: "AI/ML Engineer",
      location: "Remote / Global",
      type: "Full-time",
      description: "Develop AI models to analyze IoT data patterns, predict device behavior, and optimize network performance.",
      responsibilities: [
        "Build machine learning models for IoT data analysis",
        "Implement predictive analytics for device maintenance",
        "Develop AI-powered fraud detection systems",
        "Optimize data processing pipelines"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Globe className="h-6 w-6 text-loteraa-purple" />,
      title: "Remote-First Culture",
      description: "Work from anywhere in the world with flexible hours"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-loteraa-teal" />,
      title: "Competitive Compensation",
      description: "Market-leading salaries plus equity in our growing company"
    },
    {
      icon: <Rocket className="h-6 w-6 text-loteraa-blue" />,
      title: "Innovation Freedom",
      description: "20% time for personal projects and research"
    },
    {
      icon: <Heart className="h-6 w-6 text-loteraa-purple" />,
      title: "Health & Wellness",
      description: "Comprehensive health coverage and wellness programs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-loteraa-black via-loteraa-darkPurple to-loteraa-black relative overflow-hidden">
      <style>
        {`
          @keyframes careerFloat {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-100vh) rotate(180deg); opacity: 0; }
          }
          
          @keyframes jobCardHover {
            0%, 100% { transform: translateY(0); box-shadow: 0 10px 30px rgba(113, 66, 246, 0.2); }
            50% { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(12, 204, 188, 0.3); }
          }
          
          @keyframes teamPulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          
          .career-float {
            animation: careerFloat 15s linear infinite;
          }
          
          .job-card-hover {
            animation: jobCardHover 6s ease-in-out infinite;
          }
          
          .team-pulse {
            animation: teamPulse 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {animatedElements.map((element) => (
          <div
            key={element.id}
            className="absolute career-float text-white/20"
            style={{
              left: `${element.x}%`,
              animationDelay: `${element.delay}s`
            }}
          >
            {element.id % 6 === 0 && <Code className="h-4 w-4" />}
            {element.id % 6 === 1 && <Shield className="h-4 w-4" />}
            {element.id % 6 === 2 && <Server className="h-4 w-4" />}
            {element.id % 6 === 3 && <Network className="h-4 w-4" />}
            {element.id % 6 === 4 && <Brain className="h-4 w-4" />}
            {element.id % 6 === 5 && <Cpu className="h-4 w-4" />}
          </div>
        ))}
      </div>

      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-loteraa-teal/20 text-loteraa-teal border-loteraa-teal/30 px-6 py-2 text-lg">
              Join Our Team
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">Build the Future</span> <br />
              <span className="gradient-text">with Loteraa</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're looking for talented teams all around the world to bring the goals and dreams 
              of IoT blockchain to life. Join us in creating the next generation of connected technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-loteraa-teal hover:bg-loteraa-teal/90 text-white px-8 py-6 text-lg team-pulse">
                View Open Positions <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Why Join Loteraa?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Be part of a revolutionary team that's shaping the future of IoT and blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-loteraa-gray/30 backdrop-blur-sm border-loteraa-gray/40 hover:border-loteraa-teal/50 transition-all duration-300 job-card-hover group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-loteraa-teal/20 rounded-lg w-fit group-hover:bg-loteraa-teal/30 transition-colors">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-white text-lg group-hover:text-loteraa-teal transition-colors">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Open Positions</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Find your perfect role in our growing team
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {jobRoles.map((job, index) => (
              <Card key={index} className="bg-gradient-to-br from-loteraa-gray/30 to-loteraa-gray/10 backdrop-blur-sm border-loteraa-gray/40 hover:border-loteraa-purple/50 transition-all duration-300 job-card-hover group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-loteraa-purple/20 rounded-lg group-hover:bg-loteraa-purple/30 transition-colors">
                      {job.icon}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-white/60 text-sm mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-white/60 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-loteraa-purple transition-colors mb-2">
                    {job.title}
                  </CardTitle>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {job.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Responsibilities:</h4>
                    <ul className="space-y-2">
                      {job.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-white/70 text-sm flex items-start">
                          <ArrowRight className="h-3 w-3 mr-2 mt-1 text-loteraa-teal flex-shrink-0" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90 text-white group-hover:bg-loteraa-teal group-hover:hover:bg-loteraa-teal/90 transition-all">
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-loteraa-purple/20 to-loteraa-teal/20 rounded-2xl p-8 md:p-12 border border-loteraa-purple/30 team-pulse">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Our Culture</span>
              </h3>
              <p className="text-white/80 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                At Loteraa, we believe in fostering innovation, collaboration, and continuous learning. 
                Our diverse team works together to solve complex challenges and push the boundaries 
                of what's possible with IoT and blockchain technology.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-loteraa-purple mb-2">50+</div>
                  <div className="text-white/70">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-loteraa-teal mb-2">20+</div>
                  <div className="text-white/70">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-loteraa-blue mb-2">24/7</div>
                  <div className="text-white/70">Global Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Ready to Join Us?</span>
          </h3>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Don't see a position that fits? We're always looking for exceptional talent. 
            Reach out and let's talk about how you can contribute to the future of IoT blockchain.
          </p>
          <Button size="lg" className="bg-loteraa-teal hover:bg-loteraa-teal/90 text-white px-8 py-6 text-lg team-pulse">
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
