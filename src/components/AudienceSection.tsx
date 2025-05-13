
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Building, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function AudienceSection() {
  const audiences = [
    {
      icon: <Code className="h-10 w-10 text-loteraa-blue" />,
      title: "For Developers",
      description: "Build IoT-connected dApps with our comprehensive SDK and API. Integrate real-world data into your blockchain projects seamlessly.",
      cta: "View Documentation"
    },
    {
      icon: <Building className="h-10 w-10 text-loteraa-purple" />,
      title: "For Businesses",
      description: "Automate processes and reduce operational costs. Create new revenue streams through tokenized data and machine-to-machine transactions.",
      cta: "Book a Demo"
    },
    {
      icon: <FileText className="h-10 w-10 text-loteraa-teal" />,
      title: "For Researchers",
      description: "Access trustworthy sensor data on a global scale. Leverage verified IoT data sources for your research and development initiatives.",
      cta: "Explore Data"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="mesh-bg">
        <div className="mesh-grid"></div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Who is it for?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Our infrastructure serves multiple stakeholders in the IoT-blockchain ecosystem
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-loteraa-gray/30 to-transparent backdrop-blur-sm rounded-xl p-8 border border-loteraa-gray/20 flex flex-col h-full"
            >
              <div className="bg-loteraa-gray/30 rounded-lg w-20 h-20 flex items-center justify-center mb-6">
                {audience.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{audience.title}</h3>
              <p className="text-white/70 mb-6 flex-grow">{audience.description}</p>
              <Button variant="ghost" className="text-white hover:bg-loteraa-gray/30 hover:text-white justify-start p-0 group">
                <span>{audience.cta}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg">
            <Link to="/signup">Get Started Today <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
