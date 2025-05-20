
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Activity } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export default function ActivityLogViewer() {
  const viewLogs = () => {
    console.log("Viewing activity logs...");
    toast({
      title: "Smart Contract Logs",
      description: "Opening activity logs in a new window."
    });
    // This would open the logs in a real implementation
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-loteraa-purple" />
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
  );
}
