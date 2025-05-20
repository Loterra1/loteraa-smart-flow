
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Key, Plus, ActivityLog } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsTab() {
  const [profileSettings, setProfileSettings] = useState({
    displayName: "Alex Johnson",
    password: "************",
    email: "alex.johnson@example.com"
  });
  
  const [apiKey, setApiKey] = useState("sk_test_loteraa_1234567890abcdef");
  const [webhookUrls, setWebhookUrls] = useState([
    "https://myapi.example.com/webhook/loteraa"
  ]);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  
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
  
  const generateNewApiKey = () => {
    const newKey = "sk_test_loteraa_" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "API Key Generated",
      description: "Your new API key has been generated. Make sure to save it."
    });
  };
  
  const addWebhook = () => {
    if (!newWebhookUrl) return;
    
    setWebhookUrls([...webhookUrls, newWebhookUrl]);
    setNewWebhookUrl("");
    toast({
      title: "Webhook Added",
      description: "Your new webhook URL has been added."
    });
  };
  
  const removeWebhook = (index: number) => {
    const newUrls = [...webhookUrls];
    newUrls.splice(index, 1);
    setWebhookUrls(newUrls);
  };
  
  const viewLogs = () => {
    console.log("Viewing activity logs...");
    toast({
      title: "Smart Contract Logs",
      description: "Opening activity logs in a new window."
    });
    // This would open the logs in a real implementation
  };
  
  const saveDeveloperSettings = () => {
    console.log("Saving developer settings");
    toast({
      title: "Settings Saved",
      description: "Your developer settings have been saved."
    });
  };
  
  return (
    <div className="p-4 md:p-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-loteraa-gray/30">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
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
        </TabsContent>
        
        <TabsContent value="developer" className="space-y-6 mt-4">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-loteraa-purple" /> 
                      API Access Key
                    </Label>
                    <Button 
                      size="sm"
                      variant="outline" 
                      className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                      onClick={generateNewApiKey}
                    >
                      Generate New Key
                    </Button>
                  </div>
                  <div className="p-3 bg-loteraa-black/40 rounded-md font-mono text-sm overflow-x-auto whitespace-nowrap text-white/80">
                    {apiKey}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Webhook URLs</Label>
                    <Button 
                      size="sm"
                      variant="outline" 
                      className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 flex items-center gap-1"
                      onClick={addWebhook}
                      disabled={!newWebhookUrl}
                    >
                      <Plus className="h-4 w-4" />
                      Add New Endpoint
                    </Button>
                  </div>
                  
                  <div className="mb-2">
                    <Input
                      value={newWebhookUrl}
                      onChange={(e) => setNewWebhookUrl(e.target.value)}
                      placeholder="https://your-api.com/webhook"
                      className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {webhookUrls.map((url, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="p-2 bg-loteraa-black/40 rounded-md font-mono text-sm flex-1 overflow-x-auto whitespace-nowrap text-white/80">
                          {url}
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-loteraa-purple hover:text-red-500 hover:bg-red-500/10"
                          onClick={() => removeWebhook(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center gap-2">
                      <ActivityLog className="h-4 w-4 text-loteraa-purple" />
                      Smart Contract Logs
                    </Label>
                    <Button 
                      size="sm"
                      variant="outline" 
                      className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                      onClick={viewLogs}
                    >
                      View Activity Logs
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full md:w-auto mt-2"
                  onClick={saveDeveloperSettings}
                >
                  Save Developer Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
