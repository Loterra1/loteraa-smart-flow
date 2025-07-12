
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { ArrowLeft, Code, Database, TrendingUp, Shield, Zap, Globe, Users, BarChart3, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const useCases = [
  {
    id: 1,
    title: "IoT DApp Development",
    category: "Developers",
    icon: Code,
    description: "Build decentralized applications that connect IoT devices directly to smart contracts for real-time automation.",
    benefits: [
      "Direct device-to-contract communication",
      "Automated smart contract execution",
      "Reduced infrastructure costs",
      "Enhanced security and transparency"
    ],
    examples: [
      "Smart home automation systems",
      "Industrial IoT monitoring",
      "Supply chain tracking"
    ]
  },
  {
    id: 2,
    title: "Data Storage & Analytics",
    category: "Researchers",
    icon: Database,
    description: "Store IoT data on blockchain for immutable, verifiable datasets that can drive industry insights.",
    benefits: [
      "Immutable data records",
      "Verifiable data provenance",
      "Cross-platform data sharing",
      "Incentivized data contribution"
    ],
    examples: [
      "Environmental monitoring research",
      "Healthcare data studies",
      "Agricultural optimization"
    ]
  },
  {
    id: 3,
    title: "Industry Trend Analysis",
    category: "Data Analysts",
    icon: TrendingUp,
    description: "Access aggregated IoT data to identify patterns, predict trends, and make data-driven business decisions.",
    benefits: [
      "Real-time trend identification",
      "Predictive analytics capabilities",
      "Cross-industry data insights",
      "Monetizable data products"
    ],
    examples: [
      "Market trend prediction",
      "Resource optimization",
      "Consumer behavior analysis"
    ]
  },
  {
    id: 4,
    title: "Secure Device Management",
    category: "Enterprise",
    icon: Shield,
    description: "Manage IoT device fleets with blockchain-based identity and access control systems.",
    benefits: [
      "Decentralized device identity",
      "Tamper-proof access logs",
      "Automated compliance reporting",
      "Reduced security vulnerabilities"
    ],
    examples: [
      "Corporate IoT fleet management",
      "Critical infrastructure monitoring",
      "Healthcare device networks"
    ]
  },
  {
    id: 5,
    title: "Automated Trading & Monetization",
    category: "Business",
    icon: Zap,
    description: "Enable IoT devices to autonomously trade data, resources, or services through smart contracts.",
    benefits: [
      "Autonomous device transactions",
      "Real-time resource trading",
      "Micro-payment capabilities",
      "Reduced intermediary costs"
    ],
    examples: [
      "Energy grid optimization",
      "Bandwidth sharing networks",
      "Computing resource markets"
    ]
  },
  {
    id: 6,
    title: "Global IoT Networks",
    category: "Infrastructure",
    icon: Globe,
    description: "Build scalable, interoperable IoT networks that span geographical and organizational boundaries.",
    benefits: [
      "Cross-platform compatibility",
      "Global data accessibility",
      "Standardized protocols",
      "Reduced vendor lock-in"
    ],
    examples: [
      "Smart city initiatives",
      "Global supply chains",
      "International research projects"
    ]
  }
];

const categoryColors = {
  "Developers": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Researchers": "bg-green-500/10 text-green-400 border-green-500/20",
  "Data Analysts": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Enterprise": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Business": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Infrastructure": "bg-red-500/10 text-red-400 border-red-500/20"
};

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationHeader />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-loteraa-purple hover:text-loteraa-blue transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Loteraa Use Cases</span>
            </h1>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Discover how Loteraa blockchain transforms IoT ecosystems across industries, 
              enabling developers, researchers, and businesses to build innovative solutions 
              with real-time data and automated smart contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {useCases.map((useCase) => {
              const IconComponent = useCase.icon;
              return (
                <Card key={useCase.id} className="bg-loteraa-gray/20 backdrop-blur-sm border-loteraa-gray/30 hover:bg-loteraa-gray/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-loteraa-purple/20 p-3 rounded-lg mr-4">
                          <IconComponent className="h-6 w-6 text-loteraa-purple" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-xl">{useCase.title}</CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full border ${categoryColors[useCase.category as keyof typeof categoryColors]}`}>
                            {useCase.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed">
                      {useCase.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-loteraa-teal font-semibold mb-2 flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Key Benefits
                        </h4>
                        <ul className="space-y-1">
                          {useCase.benefits.map((benefit, index) => (
                            <li key={index} className="text-white/70 text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-loteraa-purple rounded-full mr-2"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-loteraa-teal font-semibold mb-2 flex items-center">
                          <Cpu className="h-4 w-4 mr-2" />
                          Example Applications
                        </h4>
                        <ul className="space-y-1">
                          {useCase.examples.map((example, index) => (
                            <li key={index} className="text-white/70 text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-loteraa-blue rounded-full mr-2"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-loteraa-gray/10 backdrop-blur-sm border border-loteraa-gray/20 rounded-2xl p-8 mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-6">Why Choose Loteraa?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-loteraa-purple/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-loteraa-purple" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Enterprise Security</h3>
                  <p className="text-white/70 text-sm">Military-grade encryption and decentralized architecture ensure your IoT data remains secure and tamper-proof.</p>
                </div>
                <div className="text-center">
                  <div className="bg-loteraa-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-loteraa-blue" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Real-time Processing</h3>
                  <p className="text-white/70 text-sm">Process millions of IoT transactions per second with our optimized blockchain infrastructure.</p>
                </div>
                <div className="text-center">
                  <div className="bg-loteraa-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-loteraa-teal" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Developer Friendly</h3>
                  <p className="text-white/70 text-sm">Comprehensive SDKs, APIs, and documentation make building on Loteraa simple and efficient.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to Build on Loteraa?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-loteraa-purple hover:bg-loteraa-blue">
                <Link to="/developer-docs">
                  <Code className="h-4 w-4 mr-2" />
                  Developer Documentation
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20">
                <Link to="/ecosystem">
                  <Globe className="h-4 w-4 mr-2" />
                  Explore Ecosystem
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
