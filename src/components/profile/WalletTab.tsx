
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Wallet } from 'lucide-react';

export default function WalletTab() {
  const terraBalance = 12450;
  
  const handleWithdraw = () => {
    console.log("Withdrawing tokens...");
  };
  
  const handleViewExplorer = () => {
    console.log("Viewing on explorer...");
    window.open("https://explorer.example.com/address/0xabc123", "_blank");
  };
  
  return (
    <div className="p-4 md:p-6">
      <Card className="bg-loteraa-gray/20 border-loteraa-gray/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-loteraa-purple/20 to-loteraa-black/20">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-loteraa-purple" />
            <span className="text-white">Terra Token Balance</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="py-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-white">{terraBalance.toLocaleString()}</span>
            <span className="ml-2 text-loteraa-purple">Terra</span>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 bg-loteraa-black/20 px-4 py-3">
          <Button 
            className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto"
            onClick={handleWithdraw}
          >
            Withdraw Token
          </Button>
          <Button 
            variant="outline" 
            className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20 w-full sm:w-auto"
            onClick={handleViewExplorer}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
