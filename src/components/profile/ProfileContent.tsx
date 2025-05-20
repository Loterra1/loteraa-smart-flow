
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from './ProfileHeader';
import ActivityTab from './ActivityTab';
import WalletTab from './WalletTab';
import SettingsTab from './SettingsTab';

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState("activity");
  
  return (
    <Card className="bg-loteraa-black/40 border-loteraa-gray/20 text-white backdrop-blur-md">
      <ProfileHeader />
      
      <Tabs defaultValue="activity" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-loteraa-gray/30">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity">
          <ActivityTab />
        </TabsContent>
        
        <TabsContent value="wallet">
          <WalletTab />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
