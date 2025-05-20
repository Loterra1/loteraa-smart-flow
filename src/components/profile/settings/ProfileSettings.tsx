
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function ProfileSettings() {
  const [profileSettings, setProfileSettings] = useState({
    displayName: "Alex Johnson",
    password: "************",
    email: "alex.johnson@example.com"
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileSettings({
      ...profileSettings,
      [e.target.name]: e.target.value
    });
  };
  
  const saveProfileSettings = () => {
    console.log("Saving profile settings:", profileSettings);
    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved successfully."
    });
  };
  
  const changePassword = () => {
    console.log("Changing password...");
    // This would open a password change dialog in a real implementation
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          name="displayName"
          value={profileSettings.displayName}
          onChange={handleProfileChange}
          className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button 
            variant="link" 
            className="text-loteraa-purple p-0 h-auto"
            onClick={changePassword}
          >
            Change Password
          </Button>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value={profileSettings.password}
          readOnly
          className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Recovery Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={profileSettings.email}
          onChange={handleProfileChange}
          className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
        />
      </div>
      
      <Button 
        className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full md:w-auto mt-2"
        onClick={saveProfileSettings}
      >
        Save Settings
      </Button>
    </div>
  );
}
