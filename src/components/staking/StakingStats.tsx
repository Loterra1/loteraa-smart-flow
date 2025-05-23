
import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const StakingStats = () => {
  const handleConnectWallet = () => {
    // This is just a placeholder for the wallet connection functionality
    console.log("Connect wallet clicked");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-loteraa-gray/20 backdrop-blur-md border-loteraa-gray/20">
        <CardContent className="p-6">
          <div className="text-sm text-white/70 mb-1">Total Value Locked</div>
          <div className="text-2xl font-bold gradient-text">$15,642,389</div>
          <div className="text-sm text-green-500 mt-2">+5.2% (24h)</div>
        </CardContent>
      </Card>
      
      <Card className="bg-loteraa-gray/20 backdrop-blur-md border-loteraa-gray/20">
        <CardContent className="p-6">
          <div className="text-sm text-white/70 mb-1">TERRA Price</div>
          <div className="text-2xl font-bold gradient-text">$2.47</div>
          <div className="text-sm text-green-500 mt-2">+3.8% (24h)</div>
        </CardContent>
      </Card>
      
      <Card className="bg-loteraa-gray/20 backdrop-blur-md border-loteraa-gray/20">
        <CardContent className="p-6">
          <div className="text-sm text-white/70 mb-1">Total Stakers</div>
          <div className="text-2xl font-bold gradient-text">14,728</div>
          <div className="text-sm text-green-500 mt-2">+420 (24h)</div>
        </CardContent>
      </Card>
      
      <Card className="bg-loteraa-gray/20 backdrop-blur-md border-loteraa-gray/20">
        <CardContent className="p-6">
          <div className="text-sm text-white/70 mb-1">Average APY</div>
          <div className="text-2xl font-bold gradient-text">18.3%</div>
          <div className="text-sm text-white/70 mt-2">Across all periods</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StakingStats;
