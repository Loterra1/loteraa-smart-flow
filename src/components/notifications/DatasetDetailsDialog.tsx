
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileCheck } from "lucide-react";

interface DatasetDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  datasetData: {
    name: string;
    verificationStatus: string;
    timestamp: string;
    transactionId?: string;
    details?: string;
  };
}

const DatasetDetailsDialog: React.FC<DatasetDetailsProps> = ({
  isOpen,
  onClose,
  datasetData
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-gray/90 border border-loteraa-gray/40 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-full">
              <FileCheck className="h-6 w-6 text-green-500" />
            </div>
            <DialogTitle className="text-xl">Dataset Details</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Information about your dataset
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-green-500/10 p-3 rounded-md">
            <span className="text-white/80">Dataset Name</span>
            <span className="text-xl font-bold text-green-500">{datasetData.name}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Verification Status</h4>
            <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
              {datasetData.verificationStatus}
            </div>
          </div>

          {datasetData.details && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Details</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
                {datasetData.details}
              </div>
            </div>
          )}
          
          {datasetData.transactionId && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Transaction ID</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md font-mono text-xs text-white/70 break-all">
                {datasetData.transactionId}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/50">Processed on</span>
            <span className="text-sm text-white/70">{datasetData.timestamp}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DatasetDetailsDialog;
