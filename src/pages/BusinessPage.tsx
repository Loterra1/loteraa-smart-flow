
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Building, 
  ArrowRight, 
  Cpu, 
  Shield, 
  BarChart3, 
  Zap,
  Map,
  CheckCircle,
  Clock
} from "lucide-react";

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 3000);
  };

  const useCases = [
    {
      title: "Smart Manufacturing",
      description: "Automate inventory management, predictive maintenance, and quality control through IoT sensor integration.",
      icon: Cpu
    },
    {
      title: "Supply Chain Traceability",
      description: "Transparent end-to-end product tracking with immutable blockchain records and real-time IoT data.",
      icon: Map
    },
    {
      title: "Energy Management",
      description: "Optimize consumption with smart meter integration and create new revenue streams through tokenized excess energy.",
      icon: Zap
    },
    {
      title: "Smart Buildings",
      description: "Reduce operational costs through automated climate control, security systems, and smart space utilization.",
      icon: Building
    },
    {
      title: "Secure Data Monetization",
      description: "Create new revenue streams by securely selling valuable business data with blockchain verification.",
      icon: Shield
    },
    {
      title: "Real-time Analytics",
      description: "Make better business decisions with real-time IoT data streams and blockchain-verified historical data.",
      icon: BarChart3
    }
  ];

  const clients = [
    "Manufacturing", "Energy", "Smart Cities", "Healthcare", "Logistics", "Agriculture", "Retail"
  ];
  
  return (
    <div className="min-h-screen bg-loteraa-black text-white relative overflow-hidden">
      {/* Navigation */}
      <NavigationHeader />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="blob animate-blob-rotate bg-loteraa-purple/20 w-[800px] h-[800px] left-[-400px] top-[10%]"></div>
          <div className="blob animate-blob-rotate animation-delay-2000 bg-loteraa-blue/20 w-[600px] h-[600px] right-[-300px] bottom-[20%]"></div>
          <div className="blob bg-loteraa-teal/10 w-[700px] h-[700px] left-[40%] bottom-[-300px]"></div>
        </div>
        
        <div className="grid-lines absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute h-[1px] w-full bg-loteraa-gray/30" style={{ top: `${i * 10}%` }}></div>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute w-[1px] h-full bg-loteraa-gray/30" style={{ left: `${i * 10}%` }}></div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <main className="relative z-10 pt-24">
        {/* Hero section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <Badge className="bg-loteraa-purple/20 text-loteraa-purple px-4 py-1 mb-4">
                  Enterprise Solutions
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Transform Your Business with <span className="gradient-text">IoT-Blockchain Integration</span>
                </h1>
                
                <p className="text-xl text-white/70">
                  Automate processes, reduce operational costs, and create new revenue streams through tokenized data and machine-to-machine transactions.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                    Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-loteraa-blue text-white hover:bg-loteraa-blue/20">
                    View Case Studies
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-6 pt-8">
                  {clients.map((client, i) => (
                    <Badge key={i} variant="outline" className="px-3 py-1 border-loteraa-gray/30 text-white/70">
                      {client}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="bg-loteraa-gray/20 backdrop-blur-sm rounded-xl border border-loteraa-gray/30 p-6 relative">
                  {/* Animated map visualization */}
                  <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
                    {/* World map SVG */}
                    <svg 
                      className="w-full h-full opacity-40" 
                      viewBox="0 0 1000 500" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M191.2,217.1c-0.8-0.1-2.9-0.1-2.5-1.5c0.7-0.6,1.5-0.3,2.2-0.3c0.2-1,0.9-1,1.7-0.9c1.5-1.9,3.9-1.6,6-1.8c0.1-0.8,0.7-1.7,1.6-1.2 c1.3,0.3,2.9,0,3.7,1.3c0.9,0.7,2.8-1,2.9,0.9c1.1,0.7,2.7,0.2,3.8,0.9c1.9,0.1,3.4,1.6,5.3,1.5c0.6,0.2,0.8,1.2,1.7,0.9 c1.8,0.3,3.7,0.5,5.4,1.1c0.9,0.2,1.3-0.8,2.3-0.2c2.2,0.7,4.4,1.2,6.8,1.1c1.1,0.2,2.3,0.5,3.5,0.5c1,0,1.8,0.6,2.6,1 c1.2,0.8,2.7,0.5,4,0.1c1.4-0.5,3.1-0.5,4.3,0.3c1.3,0.8,2.6-0.3,3.9,0c2-0.1,1.7-0.1,1.5-2c1.1-0.7,2.1,0.2,3.1,0.6 c1,0.5,2,0.3,3,0.4c1.1,0.2,2.2,0.7,3.3,1.1c2.5,1.1,5.1,1.9,7.6,2.8c0.5-0.5,1-0.4,1.7-0.2c0.9,1,2,1.5,3.2,1.4c1.3,0,2.7,0.3,3.8-0.5 c0.4-0.5,0.9-0.8,1.5-0.4c0.4,0.4,0.3,1-0.1,1.4c-0.7,0.6,0.2,1.2-0.3,1.8c-0.8,0.7-1.3,1.2-0.9,2.4c0.2,0.6-0.3,1.1-0.6,1.8 c-0.3,0.8-1.4,0.6-1.3,1.5c-1.4-0.7-2.3,0.6-3.2,1.2c-1,0.5-2.1,1-3.2,1.2c-0.6,0-1.1,0.6-1.6,0.7c-1.2,0.2-2.5,0.3-3.8,0 c-0.1-1.2-1.4-0.7-2.1-1.2c-0.4-0.3-1.1,0.1-1-0.7c0-0.9-1.2-1-1.9-0.8c-1.1,0.2-2.2-0.4-3.4-0.2c-1.5,0.2-3-0.1-4.5-0.1 c-1.2,0-2.1,0.9-3.4,0.5c-0.5-0.2-2.1-0.2-2.6-0.5c-0.7-0.5-1.6-0.4-2.3-0.7c-1.1-0.4-1.9,0.2-2.9,0.4c-0.8,0.1-1.7,0-2.4-0.5 c-0.4-0.3-1.3,0.6-1.6-0.2c-0.4-1-1.6-0.6-2.4-1c-1-0.4-1.8-0.2-2.6,0.5c0,0.7-0.9-0.1-1.1,0.6c-0.4,0.8-1.4,1.1-2.1,0.6 c-0.8-0.6-1.2-1.4-2.3-1.3c-1,0.2-2.1,0.4-2.9-0.4c-0.8-0.8-1.7-1.5-2.9-1.5c-1.5,0-2.2-1.1-3.2-1.7c-0.9-0.5-2.2-0.5-2.9,0.4 c-1.2,0.2-2.7,0.3-3.5-0.8c-0.8-1-1.8-2.7-3.4-2c-0.6,0.4-1.3,0.3-1.9-0.1c-0.4-0.3-1.2,0.4-1.6-0.4C191.6,219.1,191.2,218,191.2,217.1z" 
                        fill="#ffffff"
                      />
                      {/* More map paths would go here */}
                    </svg>

                    {/* Business locations */}
                    <div className="absolute inset-0">
                      {[
                        { x: "20%", y: "30%", label: "North America" },
                        { x: "42%", y: "28%", label: "Europe" },
                        { x: "55%", y: "40%", label: "Middle East" },
                        { x: "65%", y: "30%", label: "Asia" },
                        { x: "80%", y: "55%", label: "Australia" },
                        { x: "30%", y: "60%", label: "South America" },
                        { x: "45%", y: "50%", label: "Africa" }
                      ].map((location, i) => (
                        <div 
                          key={i}
                          className="absolute"
                          style={{ left: location.x, top: location.y }}
                        >
                          <div className="relative">
                            <div className="w-3 h-3 bg-loteraa-purple rounded-full animate-ping"></div>
                            <div className="w-3 h-3 bg-loteraa-purple/80 absolute top-0 left-0 rounded-full"></div>
                            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white whitespace-nowrap">
                              {location.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Connection lines animation */}
                    <div className="absolute inset-0">
                      {[
                        { x1: "20%", y1: "30%", x2: "42%", y2: "28%", delay: "0s" },
                        { x1: "42%", y1: "28%", x2: "55%", y2: "40%", delay: "0.5s" },
                        { x1: "55%", y1: "40%", x2: "65%", y2: "30%", delay: "1s" },
                        { x1: "20%", y1: "30%", x2: "30%", y2: "60%", delay: "1.5s" },
                        { x1: "42%", y1: "28%", x2: "45%", y2: "50%", delay: "2s" },
                        { x1: "65%", y1: "30%", x2: "80%", y2: "55%", delay: "2.5s" }
                      ].map((line, i) => (
                        <div key={i} className="absolute w-full h-full overflow-hidden">
                          <svg className="absolute top-0 left-0 w-full h-full">
                            <line
                              x1={line.x1}
                              y1={line.y1}
                              x2={line.x2}
                              y2={line.y2}
                              stroke="#7142F6"
                              strokeWidth="1"
                              strokeDasharray="5,5"
                              style={{
                                animation: `dashOffset 30s linear infinite ${line.delay}`
                              }}
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                    
                    {/* Data Flow Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[
                        { x1: "20%", y1: "30%", x2: "42%", y2: "28%", delay: "0s" },
                        { x1: "42%", y1: "28%", x2: "55%", y2: "40%", delay: "4s" },
                        { x1: "55%", y1: "40%", x2: "65%", y2: "30%", delay: "8s" },
                        { x1: "20%", y1: "30%", x2: "30%", y2: "60%", delay: "12s" }
                      ].map((path, i) => (
                        <div key={i} className="absolute">
                          <div 
                            className="w-2 h-2 bg-loteraa-teal rounded-full absolute"
                            style={{
                              left: path.x1,
                              top: path.y1,
                              animation: `moveAlongPath-${i} 4s linear infinite ${path.delay}`
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-loteraa-black/0 to-loteraa-black/80"></div>

                    <div className="absolute bottom-4 left-0 w-full">
                      <div className="flex justify-between gap-2 px-4 text-sm text-white/80">
                        <div className="flex items-center gap-1">
                          <Building size={14} className="text-loteraa-purple" />
                          <span>Active Businesses: 2,438</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-loteraa-teal" />
                          <span>Real-time data</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases section */}
        <section className="py-20 relative">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-loteraa-blue/20 text-loteraa-blue px-4 py-1 mb-4">
                Industry Solutions
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Business Use Cases</span>
              </h2>
              <p className="text-xl text-white/70">
                Loteraa blockchain supports businesses integrating IoT dApps to innovate and build fast-growing industry solutions worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, i) => {
                const Icon = useCase.icon;
                return (
                  <div 
                    key={i} 
                    className="bg-loteraa-gray/20 backdrop-blur-sm rounded-xl border border-loteraa-gray/30 p-6 hover:border-loteraa-purple/50 transition-all duration-300"
                    style={{ 
                      animationDelay: `${i * 200}ms`,
                      animation: 'fade-in 0.5s ease-out forwards',
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                  >
                    <div className="bg-loteraa-purple/20 rounded-lg w-14 h-14 flex items-center justify-center mb-6">
                      <Icon className="text-loteraa-purple h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-white/70">{useCase.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* CTA / Demo Request section */}
        <section className="py-20 relative">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="rounded-2xl gradient-bg overflow-hidden">
              <div className="p-8 md:p-12 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">
                      Ready to transform your business operations?
                    </h2>
                    <p className="text-white/90 mb-6">
                      Schedule a demo with our team to see how Loteraa's blockchain-IoT integration can revolutionize your business processes and create new revenue streams.
                    </p>
                    
                    <div className="space-y-6 mt-8">
                      {[
                        { text: "Streamline operations with automated IoT-blockchain workflows" },
                        { text: "Create new revenue streams through data monetization" },
                        { text: "Reduce costs with optimized machine-to-machine transactions" },
                        { text: "Build trust with immutable records and verification" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-loteraa-teal mr-3 shrink-0" />
                          <p className="text-white/90">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-loteraa-gray/30 backdrop-blur-sm rounded-xl border border-loteraa-gray/30 p-6">
                    {formSubmitted ? (
                      <div className="flex flex-col items-center justify-center h-full py-8">
                        <CheckCircle className="h-16 w-16 text-loteraa-teal mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                        <p className="text-white/70 text-center">
                          Thank you for your interest. Our team will contact you shortly to schedule your personalized demo.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Schedule Your Demo</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="bg-loteraa-black/50 border-loteraa-gray/30 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input 
                              id="company" 
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              required
                              className="bg-loteraa-black/50 border-loteraa-gray/30 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="bg-loteraa-black/50 border-loteraa-gray/30 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="bg-loteraa-black/50 border-loteraa-gray/30 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message (Optional)</Label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-md border border-loteraa-gray/30 bg-loteraa-black/50 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        
                        <Button type="submit" className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90">
                          Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes dashOffset {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 1000;
          }
        }
        
        @keyframes moveAlongPath-0 {
          0% { left: 20%; top: 30%; }
          100% { left: 42%; top: 28%; }
        }
        
        @keyframes moveAlongPath-1 {
          0% { left: 42%; top: 28%; }
          100% { left: 55%; top: 40%; }
        }
        
        @keyframes moveAlongPath-2 {
          0% { left: 55%; top: 40%; }
          100% { left: 65%; top: 30%; }
        }
        
        @keyframes moveAlongPath-3 {
          0% { left: 20%; top: 30%; }
          100% { left: 30%; top: 60%; }
        }
      `}</style>
      
      <Footer />
    </div>
  );
}
