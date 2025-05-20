
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ApiKeyManager from './ApiKeyManager';
import WebhookManager from './WebhookManager';
import ActivityLogViewer from './ActivityLogViewer';

export default function DeveloperSettings() {
  const saveDeveloperSettings = () => {
    console.log("Saving developer settings");
    toast({
      title: "Settings Saved",
      description: "Your developer settings have been saved."
    });
  };
  
  return (
    <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <ApiKeyManager />
          <WebhookManager />
          <ActivityLogViewer />
          
          <Button 
            className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full md:w-auto mt-2"
            onClick={saveDeveloperSettings}
          >
            Save Developer Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
