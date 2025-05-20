
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export default function WebhookManager() {
  const [webhookUrls, setWebhookUrls] = useState([
    "https://myapi.example.com/webhook/loteraa"
  ]);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  
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
  
  return (
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
  );
}
