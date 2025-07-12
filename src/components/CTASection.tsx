
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function CTASection() {
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

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      {/* Background Images with Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Image 1 - Purple Planet on Left side */}
        <img 
          src="/lovable-uploads/9f81737e-d7bf-45b7-8ef8-18af4f2cb9ae.png" 
          alt="" 
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-96 h-auto opacity-60 z-0 filter brightness-200 drop-shadow-[0_0_80px_rgba(113,66,246,1.0)] animate-pulse-soft"
        />
        
        {/* Image 2 - Purple Crystal in Center */}
        <img 
          src="/lovable-uploads/294bd0c7-5b0d-45ec-b638-ad20f77ce0d8.png" 
          alt="" 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-auto opacity-70 z-0 filter brightness-200 drop-shadow-[0_0_100px_rgba(113,66,246,1.2)] animate-pulse-soft"
        />
        
        {/* Image 1 Duplicate - Purple Robot Head on Right side */}
        <img 
          src="/lovable-uploads/0c100085-a166-4401-ac09-ba6d2ff7225d.png" 
          alt="" 
          className="absolute right-8 top-1/2 transform -translate-y-1/2 w-96 h-auto opacity-60 z-0 filter brightness-200 drop-shadow-[0_0_80px_rgba(113,66,246,1.0)] animate-pulse-soft"
        />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-loteraa-purple">Future Built,</span> Real World Ready
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Loteraa is not just blockchain-enabled—it's built to be the backbone of the decentralized internet of everything.
          </p>
        </div>
      </div>
    </section>
  );
}
