import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { 
  Building2, 
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
  Factory,
  Smartphone,
  MapPin,
  Network,
  Cpu,
  Radio
} from "lucide-react";

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    useCase: '',
    contactEmail: '',
    dataNeeds: ''
  });

  const [animatedPoints, setAnimatedPoints] = useState<Array<{ id: number; x: number; y: number; delay: number; type: string }>>([]);

  useEffect(() => {
    const points = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
      type: ['sensor', 'device', 'network', 'data'][Math.floor(Math.random() * 4)]
    }));
    setAnimatedPoints(points);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you would typically handle the form submission, e.g., sending the data to a server
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style>
        {`
          @keyframes businessOrbit {
            0% { transform: rotate(0deg) translateX(80px) rotate(0deg); opacity: 0.4; }
            50% { opacity: 1; }
            100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); opacity: 0.4; }
          }
          
          @keyframes mapGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(113, 66, 246, 0.3); }
            50% { box-shadow: 0 0 40px rgba(12, 204, 188, 0.5); }
          }
          
          @keyframes dataFlow {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
          
          @keyframes hologramGlow {
            0%, 100% { opacity: 0.7; transform: scale(1) rotateY(0deg); }
            50% { opacity: 1; transform: scale(1.02) rotateY(5deg); }
          }
          
          .business-orbit {
            animation: businessOrbit 25s linear infinite;
          }
          
          .map-glow {
            animation: mapGlow 6s ease-in-out infinite;
          }
          
          .data-flow {
            animation: dataFlow 10s linear infinite;
          }
          
          .hologram-glow {
            animation: hologramGlow 4s ease-in-out infinite;
          }
        `}
      </style>


      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-loteraa-purple/20 text-loteraa-purple border-loteraa-purple/30 px-6 py-2 text-lg">
              For Enterprises & Innovators
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-loteraa-purple">Unlock New</span> <br />
              <span className="text-loteraa-purple">Business Models</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Leverage our IoT-blockchain infrastructure to automate processes, create new revenue streams, 
              and gain a competitive edge in the digital economy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg">
                Book a Demo <Building2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-loteraa-purple">Global IoT Network</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Connect your devices and tap into a worldwide ecosystem of data and opportunities
            </p>
          </div>
          
          <div className="bg-loteraa-gray/20 backdrop-blur-sm rounded-2xl p-8 border border-loteraa-gray/30 hologram-glow">
            <div className="relative w-full h-96 map-glow">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* Simplified world map outline */}
                <path d="M100 200 Q200 150 300 200 T500 200 T700 180 T900 200" 
                      stroke="#7142F6" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M150 300 Q250 280 350 300 T550 320 T750 300 T900 320" 
                      stroke="#3182F4" strokeWidth="2" fill="none" opacity="0.6"/>
                
                {/* Animated data points on map */}
                {['Europe', 'North America', 'Asia', 'Africa'].map((region, index) => (
                  <g key={index}>
                    <circle 
                      cx={150 + index * 200} 
                      cy={200 + Math.sin(index) * 60} 
                      r="10" 
                      fill="#0CCCBC" 
                      className="animate-ping"
                      style={{ animationDelay: `${index * 0.7}s` }}
                    />
                    <circle 
                      cx={150 + index * 200} 
                      cy={200 + Math.sin(index) * 60} 
                      r="5" 
                      fill="#0CCCBC"
                    />
                  </g>
                ))}
                
                {/* Data connection lines */}
                <line x1="150" y1="200" x2="350" y2="140" stroke="#7142F6" strokeWidth="1" strokeDasharray="5,5" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="350" y1="140" x2="550" y2="240" stroke="#3182F4" strokeWidth="1" strokeDasharray="5,5" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                </line>
              </svg>
              
            </div>
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-loteraa-purple">Key Benefits</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Transform your business with blockchain-secured IoT solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {['Automation', 'New Revenue', 'Data Security', 'Cost Savings'].map((benefit, index) => (
              <Card key={index} className="bg-loteraa-gray/30 backdrop-blur-sm border-loteraa-gray/40 hover:border-loteraa-purple/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-loteraa-purple/20 rounded-lg">
                      {benefit === 'Automation' && <Activity className="h-6 w-6 text-loteraa-purple" />}
                      {benefit === 'New Revenue' && <TrendingUp className="h-6 w-6 text-loteraa-purple" />}
                      {benefit === 'Data Security' && <Shield className="h-6 w-6 text-loteraa-purple" />}
                      {benefit === 'Cost Savings' && <DollarSign className="h-6 w-6 text-loteraa-purple" />}
                    </div>
                    <Badge variant="outline" className="text-loteraa-teal border-loteraa-teal/40 bg-loteraa-teal/10">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Learn More
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-loteraa-purple transition-colors">
                    {benefit}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 leading-relaxed">
                    {benefit === 'Automation' && 'Automate your supply chain and manufacturing processes with real-time IoT data.'}
                    {benefit === 'New Revenue' && 'Create new revenue streams by tokenizing your IoT data and enabling machine-to-machine transactions.'}
                    {benefit === 'Data Security' && 'Secure your IoT data with blockchain encryption and ensure data integrity.'}
                    {benefit === 'Cost Savings' && 'Reduce operational costs by optimizing resource utilization and predictive maintenance.'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-loteraa-purple/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-loteraa-purple/30">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-loteraa-purple">Get in Touch</span>
              </h3>
              <p className="text-white/70 text-xl">
                Let us help you transform your business with IoT-blockchain solutions
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-white text-sm font-bold mb-2">
                  Company Name
                </label>
                <Input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Your Company Name"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-loteraa-black leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-white text-sm font-bold mb-2">
                  Industry
                </label>
                <Input
                  type="text"
                  id="industry"
                  name="industry"
                  placeholder="Your Industry"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-loteraa-black leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.industry}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="useCase" className="block text-white text-sm font-bold mb-2">
                  Use Case
                </label>
                <Textarea
                  id="useCase"
                  name="useCase"
                  placeholder="Describe your use case"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-loteraa-black leading-tight focus:outline-none focus:shadow-outline"
                  rows={4}
                  value={formData.useCase}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-white text-sm font-bold mb-2">
                  Contact Email
                </label>
                <Input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  placeholder="Your Contact Email"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-loteraa-black leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="dataNeeds" className="block text-white text-sm font-bold mb-2">
                  Data Needs
                </label>
                <Input
                  type="text"
                  id="dataNeeds"
                  name="dataNeeds"
                  placeholder="Your Data Needs"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-loteraa-black leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.dataNeeds}
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-2 text-center">
                <Button type="submit" size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-4 text-lg">
                  Submit Request <Radio className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
