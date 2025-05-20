
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollText } from "lucide-react";

interface ContractDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  contractData: {
    name: string;
    status: string;
    timestamp: string;
    address?: string;
    details?: string;
  };
}

const ContractDetailsDialog: React.FC<ContractDetailsProps> = ({
  isOpen,
  onClose,
  contractData
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-gray/90 border border-loteraa-gray/40 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-loteraa-purple/20 p-2 rounded-full">
              <ScrollText className="h-6 w-6 text-loteraa-purple" />
            </div>
            <DialogTitle className="text-xl">Smart Contract Details</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Information about your smart contract
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-loteraa-purple/10 p-3 rounded-md">
            <span className="text-white/80">Contract Name</span>
            <span className="text-xl font-bold text-loteraa-purple">{contractData.name}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Status</h4>
            <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
              {contractData.status}
            </div>
          </div>

          {contractData.details && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Details</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
                {contractData.details}
              </div>
            </div>
          )}
          
          {contractData.address && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Contract Address</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md font-mono text-xs text-white/70 break-all">
                {contractData.address}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/50">Deployed on</span>
            <span className="text-sm text-white/70">{contractData.timestamp}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDetailsDialog;
