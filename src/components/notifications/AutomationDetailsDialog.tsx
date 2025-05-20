
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Zap } from "lucide-react";

interface AutomationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  automationData: {
    name: string;
    status: string;
    timestamp: string;
    triggers?: string[];
    details?: string;
  };
}

const AutomationDetailsDialog: React.FC<AutomationDetailsProps> = ({
  isOpen,
  onClose,
  automationData
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-gray/90 border border-loteraa-gray/40 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-full">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <DialogTitle className="text-xl">Automation Details</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Information about your automation workflow
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-blue-500/10 p-3 rounded-md">
            <span className="text-white/80">Automation Name</span>
            <span className="text-xl font-bold text-blue-500">{automationData.name}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Status</h4>
            <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
              {automationData.status}
            </div>
          </div>

          {automationData.triggers && automationData.triggers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Triggers</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
                <ul className="list-disc pl-4 space-y-1">
                  {automationData.triggers.map((trigger, index) => (
                    <li key={index}>{trigger}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {automationData.details && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Details</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
                {automationData.details}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/50">{automationData.status === "Activated" ? "Activated on" : "Created on"}</span>
            <span className="text-sm text-white/70">{automationData.timestamp}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutomationDetailsDialog;
