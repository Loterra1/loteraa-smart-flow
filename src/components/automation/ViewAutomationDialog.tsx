
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Zap, Calendar, Activity, ArrowUpRight } from "lucide-react";

interface AutomationType {
  id: string;
  name: string;
  triggerSource: string;
  actionType: string;
  status: "Active" | "Paused";
  lastTrigger: string;
}

interface ViewAutomationDialogProps {
  automation: AutomationType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewAutomationDialog: React.FC<ViewAutomationDialogProps> = ({
  automation,
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-loteraa-gray/90 border border-loteraa-gray/40 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-full">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <DialogTitle className="text-xl">{automation.name}</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Automation details and configuration
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-loteraa-gray/30 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1 text-white/60 text-sm">
                <Activity className="h-4 w-4" />
                <span>Status</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${automation.status === "Active" ? "bg-green-500" : "bg-yellow-500"} mr-2`} />
                <span className="text-white font-medium">{automation.status}</span>
              </div>
            </div>
            
            <div className="bg-loteraa-gray/30 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1 text-white/60 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Last Trigger</span>
              </div>
              <span className="text-white font-medium">{automation.lastTrigger}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Trigger Source</h4>
            <div className="bg-loteraa-gray/30 p-3 rounded-md flex items-center justify-between">
              <span className="text-white">{automation.triggerSource}</span>
              <ArrowUpRight className="h-4 w-4 text-white/50" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Action Type</h4>
            <div className="bg-loteraa-gray/30 p-3 rounded-md flex items-center justify-between">
              <span className="text-white">{automation.actionType}</span>
              <ArrowUpRight className="h-4 w-4 text-white/50" />
            </div>
          </div>
                    
          <div className="pt-2 text-sm text-white/50 border-t border-loteraa-gray/30">
            Automation ID: {automation.id}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAutomationDialog;
