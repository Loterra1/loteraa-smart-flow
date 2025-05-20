
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileSettings from './settings/ProfileSettings';
import DeveloperSettings from './settings/DeveloperSettings';

export default function SettingsTab() {
  return (
    <div className="p-4 md:p-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-loteraa-gray/30">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <ProfileSettings />
        </TabsContent>
        
        <TabsContent value="developer" className="space-y-6 mt-4">
          <DeveloperSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
