
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Images with Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Image 1 - Left side */}
        <img 
          src="/lovable-uploads/1af8bb21-e405-4ca8-9195-8c2467659bf2.png" 
          alt="" 
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-80 h-auto opacity-50 z-0 filter brightness-150 drop-shadow-[0_0_60px_rgba(113,66,246,0.9)] animate-pulse-soft"
        />
        
        {/* Image 2 - Center */}
        <img 
          src="/lovable-uploads/e84154a3-b53d-415a-8915-18a1ecc5b505.png" 
          alt="" 
          className="absolute left-1/2 top-1/4 transform -translate-x-1/2 w-96 h-auto opacity-40 z-0 filter brightness-150 drop-shadow-[0_0_80px_rgba(113,66,246,1.0)] animate-pulse-soft"
        />
        
        {/* Image 3 - Right side */}
        <img 
          src="/lovable-uploads/e71c8a60-3341-4ed2-aa64-b8fe751414a5.png" 
          alt="" 
          className="absolute right-8 bottom-1/4 w-80 h-auto opacity-50 z-0 filter brightness-150 drop-shadow-[0_0_60px_rgba(113,66,246,0.9)] animate-pulse-soft"
        />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Future Built,</span> Real World Ready
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Loteraa is not just blockchain-enabled—it's built to be the backbone of the decentralized internet of everything.
          </p>
        </div>
      </div>
    </section>
  );
}
