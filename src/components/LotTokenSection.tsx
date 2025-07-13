import { Button } from "@/components/ui/button";

export default function LotTokenSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-black">
      {/* Subtle lavender purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-loteraa-purple/10 to-transparent pointer-events-none"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center relative z-10">
        <img 
          src="/lovable-uploads/4981a0b9-fddb-457f-98bf-938f71ee27de.png" 
          alt="LOT Coin" 
          className="mx-auto w-80 h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] object-contain drop-shadow-[0_0_30px_rgba(113,66,246,0.5)]"
        />
      </div>
    </section>
  );
}