
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Building, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function AudienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const audiences = [
    {
      icon: <Code className="h-10 w-10 text-loteraa-blue" />,
      title: "For Developers",
      description: "Build IoT-connected dApps with our comprehensive SDK and API. Integrate real-world data into your blockchain projects seamlessly.",
      cta: "View Documentation",
      link: "/developer-docs"
    },
    {
      icon: <Building className="h-10 w-10 text-loteraa-purple" />,
      title: "For Businesses",
      description: "Automate processes and reduce operational costs. Create new revenue streams through tokenized data and machine-to-machine transactions.",
      cta: "Book a Demo",
      link: "/business"
    },
    {
      icon: <FileText className="h-10 w-10 text-loteraa-teal" />,
      title: "For Researchers",
      description: "Access trustworthy sensor data on a global scale. Leverage verified IoT data sources for your research and development initiatives.",
      cta: "Explore Data",
      link: "/researchers"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 uppercase ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-loteraa-purple">Who Is It For?</span>
          </h2>
          <p className={`text-xl text-white/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Our infrastructure serves multiple stakeholders in the IoT-blockchain ecosystem
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const backgroundImages = [
              '/lovable-uploads/07ee704a-5fe3-4bd9-bd9e-3250a3b2458d.png',
              '/lovable-uploads/a4ab4d2b-fc0b-402f-a078-886f9a7d59c7.png', 
              '/lovable-uploads/410d68c1-ec95-4914-bd57-bf9e5b6c966e.png'
            ];
            
            return (
              <div 
                key={index}
                className="bg-gray-500/10 backdrop-blur-md rounded-xl p-8 border border-gray-400/20 flex flex-col h-full relative overflow-hidden"
                style={{
                  backgroundImage: `url(${backgroundImages[index]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                <div className="bg-loteraa-gray/30 rounded-lg w-20 h-20 flex items-center justify-center mb-6 relative z-10">
                  {audience.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{audience.title}</h3>
                <p className="text-white/70 mb-6 flex-grow relative z-10">{audience.description}</p>
                <Button asChild variant="ghost" className="text-white hover:bg-loteraa-gray/30 hover:text-white justify-start p-0 group relative z-10">
                  <Link to={audience.link}>
                    <span>{audience.cta}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg">
            <Link to="/signup">Start Building <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
