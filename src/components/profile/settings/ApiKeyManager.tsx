
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Key } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export default function ApiKeyManager() {
  const [apiKey, setApiKey] = useState("sk_test_loteraa_1234567890abcdef");
  
  const generateNewApiKey = () => {
    const newKey = "sk_test_loteraa_" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "API Key Generated",
      description: "Your new API key has been generated. Make sure to save it."
    });
  };
  
  return (
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
  );
}
