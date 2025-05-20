
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'lucide-react';

export default function ProfileHeader() {
  const [user, setUser] = useState({
    name: "Alex Johnson",
    role: "Researcher",
    walletAddress: "",
    avatarUrl: "",
  });
  
  const connectWallet = () => {
    // This would connect to a wallet in a real implementation
    console.log("Connecting wallet...");
    setUser({...user, walletAddress: "0x1234...5678"});
  };
  
  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-loteraa-gray/20">
      <div className="flex-shrink-0">
        <Avatar className="h-24 w-24 border-2 border-loteraa-purple">
          <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
          <AvatarFallback className="bg-loteraa-purple/30 text-white text-xl">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex flex-col items-center md:items-start">
        <h2 className="text-xl font-semibold text-white">{user.name}</h2>
        <p className="text-loteraa-purple mb-2">{user.role}</p>
        
        <div className="flex items-center gap-2 mt-1 text-sm">
          <span className="text-white/70">Wallet:</span>
          {user.walletAddress ? (
            <span className="font-mono text-white/90">{user.walletAddress}</span>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 flex items-center gap-1"
              onClick={connectWallet}
            >
              <Link className="h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
