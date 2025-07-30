
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import AboutHeroAnimation from "@/components/animations/AboutHeroAnimation";
import RadialBurstAnimation from "@/components/animations/RadialBurstAnimation";
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
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (sectionId: string) => (el: HTMLElement | null) => {
    sectionRefs.current[sectionId] = el;
  };

  const goals = [
    {
      icon: <Target className="h-8 w-8 text-white" />,
      title: "Democratize IoT Data",
      description: "Make IoT data accessible and valuable for everyone through blockchain technology."
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Enable Automation",
      description: "Connect real-world devices to smart contracts for seamless automation."
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Ensure Security",
      description: "Provide unbreakable security and data integrity through blockchain encryption."
    },
    {
      icon: <Globe className="h-8 w-8 text-white" />,
      title: "Global Infrastructure",
      description: "Build a worldwide network of connected IoT devices and smart contracts."
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with IoT and blockchain."
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Community",
      description: "We believe in the power of decentralized communities to drive change."
    },
    {
      icon: <Lock className="h-6 w-6 text-white" />,
      title: "Security",
      description: "Security and privacy are at the core of everything we build."
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      title: "Transparency",
      description: "We operate with complete transparency and open-source principles."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <AboutHeroAnimation />
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
              <span className="text-white">Connecting IoT</span> <br />
              <span className="text-white">to Blockchain</span>
            </h1>
            
            {/* Large Image with P5.js Animation Overlay */}
            <div className="relative mx-auto mb-12 w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
              {/* Background Image */}
              <img 
                src="/lovable-uploads/8643e5bb-b534-4077-ac53-edb38eb13163.png" 
                alt="IoT to Blockchain Connection" 
                className="w-full h-full object-contain absolute inset-0 z-10"
              />
              
              {/* P5.js Animation Overlay */}
              <div className="absolute inset-0 z-20 opacity-70">
                <RadialBurstAnimation />
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Loteraa is building the future of IoT-blockchain infrastructure, enabling seamless 
              integration between real-world devices and decentralized smart contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={setSectionRef('mission')} 
        data-section="mission" 
        className="py-20 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-black rounded-2xl p-8 md:p-12 border border-gray-400/20">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ease-out ${visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="text-white">Our Mission</span>
              </h2>
              <p className={`text-xl text-white/80 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-300 ${visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                To create a decentralized ecosystem where IoT devices can securely interact with 
                blockchain networks, enabling new forms of automation, data monetization, and 
                machine-to-machine transactions that benefit everyone.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goals.map((goal, index) => (
                <Card key={index} className={`bg-gray-500/10 backdrop-blur-md border-gray-400/20 hover:border-loteraa-purple/50 transition-all duration-700 ease-out group ${visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${600 + index * 150}ms` }}>
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
      <section 
        ref={setSectionRef('technology')} 
        data-section="technology" 
        className="py-20 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ease-out ${visibleSections.technology ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-white">Our Technology</span>
            </h2>
            <p className={`text-xl text-white/70 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-300 ${visibleSections.technology ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Built on cutting-edge blockchain technology with a focus on scalability and security
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`bg-gray-900/50 backdrop-blur-md border-gray-400/20 transition-all duration-700 ease-out ${visibleSections.technology ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
              <CardHeader>
                <div className="p-4 bg-loteraa-purple/20 rounded-lg w-fit mb-4">
                  <Network className="h-10 w-10 text-white" />
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
            
            <Card className={`bg-gray-900/50 backdrop-blur-md border-gray-400/20 transition-all duration-700 ease-out ${visibleSections.technology ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '750ms' }}>
              <CardHeader>
                <div className="p-4 bg-loteraa-blue/20 rounded-lg w-fit mb-4">
                  <Shield className="h-10 w-10 text-white" />
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
            
            <Card className={`bg-gray-900/50 backdrop-blur-md border-gray-400/20 transition-all duration-700 ease-out ${visibleSections.technology ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '900ms' }}>
              <CardHeader>
                <div className="p-4 bg-loteraa-teal/20 rounded-lg w-fit mb-4">
                  <Rocket className="h-10 w-10 text-white" />
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
      <section 
        ref={setSectionRef('values')} 
        data-section="values" 
        className="py-20 bg-black relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-500/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-gray-400/20">
            <div className="text-center mb-12">
              <h3 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ease-out ${visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="text-white">Our Values</span>
              </h3>
              <p className={`text-white/70 text-xl transition-all duration-1000 ease-out delay-300 ${visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className={`bg-gray-500/10 backdrop-blur-md rounded-lg p-6 border border-gray-400/20 hover:border-loteraa-teal/50 transition-all duration-700 ease-out ${visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${600 + index * 150}ms` }}>
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
      <section 
        ref={setSectionRef('cta')} 
        data-section="cta" 
        className="py-20 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ease-out ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white">Join the Revolution</span>
          </h3>
          <p className={`text-xl text-white/70 mb-8 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-300 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Be part of the future where IoT and blockchain converge to create endless possibilities
          </p>
          <div className={`transition-all duration-1000 ease-out delay-600 ${visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button size="lg" className="bg-black hover:bg-black/90 text-white px-8 py-6 text-lg">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
