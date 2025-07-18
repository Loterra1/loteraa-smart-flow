
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, Upload } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileHeader() {
  const { user, profile } = useAuth();
  const [userRole, setUserRole] = useState("Researcher");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const connectWallet = () => {
    // This would connect to a wallet in a real implementation
    console.log("Connecting wallet...");
    toast({
      title: "Connect Wallet",
      description: "This would connect to a wallet in a real implementation."
    });
  };
  
  const handleRoleChange = (value: string) => {
    setUserRole(value);
    toast({
      title: "Role Updated",
      description: `Your role has been updated to ${value}.`
    });
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload this to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully."
      });
    }
  };

  const displayName = profile?.name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-loteraa-gray/20">
      <div className="flex-shrink-0 relative group">
        <Avatar className="h-24 w-24 border-2 border-loteraa-purple">
          <AvatarImage src={avatarUrl || ""} alt={displayName} />
          <AvatarFallback className="bg-loteraa-purple/30 text-white text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <div 
          onClick={triggerFileInput}
          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <Upload className="h-6 w-6 text-white" />
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      
      <div className="flex flex-col items-center md:items-start">
        <h2 className="text-xl font-semibold text-white">{displayName}</h2>
        <p className="text-white/60 text-sm">{user?.email}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 mt-2">
          <span className="text-white/70">Role:</span>
          <Select value={userRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px] bg-loteraa-black/40 border-loteraa-purple/70 text-white">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className="bg-loteraa-gray border-loteraa-purple/70 text-white">
              <SelectItem value="Researcher">Researcher</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 mt-1 text-sm">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 flex items-center gap-1"
            onClick={connectWallet}
          >
            <Link className="h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
