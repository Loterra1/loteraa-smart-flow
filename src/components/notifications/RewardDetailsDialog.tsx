
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Award } from "lucide-react";

interface RewardDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  rewardData: {
    amount: number;
    source: string;
    timestamp: string;
    transactionId: string;
    details?: string;
  };
}

const RewardDetailsDialog: React.FC<RewardDetailsProps> = ({
  isOpen,
  onClose,
  rewardData
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-gray/90 border border-loteraa-gray/40 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-2 rounded-full">
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
            <DialogTitle className="text-xl">Reward Details</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Details about your earned tokens
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-loteraa-purple/10 p-3 rounded-md">
            <span className="text-white/80">Amount Earned</span>
            <span className="text-xl font-bold text-loteraa-purple">{rewardData.amount} Terra</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Source</h4>
            <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
              {rewardData.source}
            </div>
          </div>

          {rewardData.details && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Details</h4>
              <div className="bg-loteraa-gray/30 p-3 rounded-md text-white">
                {rewardData.details}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Transaction ID</h4>
            <div className="bg-loteraa-gray/30 p-3 rounded-md font-mono text-xs text-white/70 break-all">
              {rewardData.transactionId}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/50">Processed on</span>
            <span className="text-sm text-white/70">{rewardData.timestamp}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardDetailsDialog;
