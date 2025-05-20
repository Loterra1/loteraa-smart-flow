
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tv } from "lucide-react";

interface DeviceDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  deviceData: {
    name: string;
    status: string;
    timestamp: string;
    deviceId?: string;
    details?: string;
  };
}

const DeviceDetailsDialog: React.FC<DeviceDetailsProps> = ({
  isOpen,
  onClose,
  deviceData
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-gray/90 border border-loteraa-gray/40 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 p-2 rounded-full">
              <Tv className="h-6 w-6 text-orange-500" />
            </div>
            <DialogTitle className="text-xl">Device Details</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Information about your IoT device
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-orange-500/10 p-3 rounded-md">
            <span className="text-white/80">Device Name</span>
            <span className="text-xl font-bold text-orange-500">{deviceData.name}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Status</h4>
            <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
              {deviceData.status}
            </div>
          </div>

          {deviceData.details && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Details</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
                {deviceData.details}
              </div>
            </div>
          )}
          
          {deviceData.deviceId && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Device ID</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md font-mono text-xs text-white/70 break-all">
                {deviceData.deviceId}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/50">Added on</span>
            <span className="text-sm text-white/70">{deviceData.timestamp}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDetailsDialog;
