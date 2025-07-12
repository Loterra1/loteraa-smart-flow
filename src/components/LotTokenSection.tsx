import { Button } from "@/components/ui/button";

export default function LotTokenSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="/lovable-uploads/0267d442-8dd6-4fb9-b568-7dcd2ce92e59.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
        />
        <div className="absolute inset-0 bg-black/10 z-0"></div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center relative z-10">
        <img 
          src="/lovable-uploads/4981a0b9-fddb-457f-98bf-938f71ee27de.png" 
          alt="LOT Coin" 
          className="mx-auto w-48 h-48 object-contain mb-8 drop-shadow-[0_0_30px_rgba(113,66,246,0.5)]"
        />
        <Button size="lg" className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-6 text-lg">
          Buy $LOT Token
        </Button>
      </div>
    </section>
  );
}