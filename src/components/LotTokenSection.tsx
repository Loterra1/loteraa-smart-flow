import { Button } from "@/components/ui/button";

export default function LotTokenSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-loteraa-black to-loteraa-gray/20 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
        <img 
          src="/lovable-uploads/4e6bf546-c118-4c87-a5cb-89d4241b0830.png" 
          alt="LOT Coin" 
          className="mx-auto w-48 h-48 object-contain mb-8 drop-shadow-[0_0_30px_rgba(113,66,246,0.5)]"
        />
        <Button size="lg" className="bg-loteraa-teal hover:bg-loteraa-teal/90 text-white px-8 py-6 text-lg">
          Buy $LOT Token
        </Button>
      </div>
    </section>
  );
}