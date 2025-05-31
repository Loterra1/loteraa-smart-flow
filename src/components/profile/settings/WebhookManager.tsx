
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export default function WebhookManager() {
  const [webhookUrls, setWebhookUrls] = useState([
    "https://myapi.example.com/webhook/loteraa"
  ]);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  
  const addWebhook = () => {
    if (!newWebhookUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL.",
        variant: "destructive"
      });
      return;
    }
    
    // Basic URL validation
    try {
      new URL(newWebhookUrl);
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL.",
        variant: "destructive"
      });
      return;
    }
    
    if (webhookUrls.includes(newWebhookUrl)) {
      toast({
        title: "Error",
        description: "This webhook URL already exists.",
        variant: "destructive"
      });
      return;
    }
    
    setWebhookUrls([...webhookUrls, newWebhookUrl]);
    setNewWebhookUrl("");
    toast({
      title: "Webhook Added",
      description: "Your new webhook URL has been added successfully."
    });
  };
  
  const removeWebhook = (index: number) => {
    const newUrls = [...webhookUrls];
    const removedUrl = newUrls.splice(index, 1)[0];
    setWebhookUrls(newUrls);
    toast({
      title: "Webhook Removed",
      description: `Webhook URL ${removedUrl} has been removed.`
    });
  };

  const testWebhook = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          message: 'Test webhook from Loteraa platform'
        })
      });

      toast({
        title: "Test Sent",
        description: "Test webhook has been sent. Check your endpoint to verify receipt."
      });
    } catch (error) {
      toast({
        title: "Test Failed",
        description: "Failed to send test webhook. Please check the URL.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Label className="text-white">Webhook URLs</Label>
        <span className="text-sm text-white/60">
          {webhookUrls.length} endpoint{webhookUrls.length !== 1 ? 's' : ''} configured
        </span>
      </div>
      
      <div className="mb-4 space-y-2">
        <Input
          value={newWebhookUrl}
          onChange={(e) => setNewWebhookUrl(e.target.value)}
          placeholder="https://your-api.com/webhook"
          className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
          onKeyPress={(e) => e.key === 'Enter' && addWebhook()}
        />
        <Button 
          onClick={addWebhook}
          disabled={!newWebhookUrl.trim()}
          className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Endpoint
        </Button>
      </div>
      
      <div className="space-y-3">
        {webhookUrls.map((url, index) => (
          <div key={index} className="bg-loteraa-black/40 border border-loteraa-gray/30 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-sm text-white/80 break-all">
                {url}
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 ml-2 flex-shrink-0"
                onClick={() => removeWebhook(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent border-loteraa-gray/40 text-white/70 hover:bg-loteraa-gray/20 text-xs"
                onClick={() => testWebhook(url)}
              >
                Test Endpoint
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {webhookUrls.length === 0 && (
        <div className="text-center py-6 text-white/50">
          <p>No webhook endpoints configured</p>
          <p className="text-sm mt-1">Add your first endpoint above</p>
        </div>
      )}
    </div>
  );
}
