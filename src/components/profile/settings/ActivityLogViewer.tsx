
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Activity, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface ActivityLog {
  id: string;
  timestamp: string;
  contractName: string;
  action: string;
  txHash: string;
  gasUsed: number;
  status: 'Success' | 'Failed';
  details: string;
}

export default function ActivityLogViewer() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Sample activity logs for demonstration
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      contractName: 'Temperature Data Processor',
      action: 'Function Call: processData',
      txHash: '0x8f2e73a1d456b90c3214fd9e3d4f',
      gasUsed: 45000,
      status: 'Success',
      details: 'Processed 150 temperature readings from IoT sensors'
    },
    {
      id: '2',
      timestamp: '2024-01-15 13:15:10',
      contractName: 'Air Quality Monitor',
      action: 'Contract Deployment',
      txHash: '0x7a1c98e2b4f6d8e9c3a5b2d1f4e6',
      gasUsed: 120000,
      status: 'Success',
      details: 'Smart contract successfully deployed to Ethereum mainnet'
    },
    {
      id: '3',
      timestamp: '2024-01-15 12:45:33',
      contractName: 'Data Verification System',
      action: 'Function Call: verifyDataset',
      txHash: '0x3c8b7a9e2f5d1c4b8a6e9f2d5c8b',
      gasUsed: 67000,
      status: 'Success',
      details: 'Verified dataset integrity for Urban Air Quality Dataset'
    },
    {
      id: '4',
      timestamp: '2024-01-15 11:20:15',
      contractName: 'Reward Distribution',
      action: 'Function Call: distributeRewards',
      txHash: '0x9d4e2f8a1c6b5e3a7f9c2d6e4b8a',
      gasUsed: 89000,
      status: 'Failed',
      details: 'Transaction reverted due to insufficient balance'
    }
  ];
  
  const viewLogs = () => {
    setIsOpen(true);
    toast({
      title: "Activity Logs Loaded",
      description: "Displaying recent smart contract activity logs."
    });
  };

  const openTransactionDetails = (txHash: string) => {
    window.open(`https://etherscan.io/tx/${txHash}`, '_blank');
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-loteraa-purple" />
          Smart Contract Logs
        </Label>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              size="sm"
              variant="outline" 
              className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
              onClick={viewLogs}
            >
              View Activity Logs
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-loteraa-gray border-loteraa-gray/30 text-white max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-loteraa-purple" />
                Smart Contract Activity Logs
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="bg-loteraa-black/40 border border-loteraa-gray/30 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white">{log.contractName}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            log.status === 'Success' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {log.status}
                          </span>
                        </div>
                        <p className="text-sm text-white/70 mb-2">{log.action}</p>
                        <p className="text-xs text-white/50">{log.details}</p>
                      </div>
                      <div className="text-right text-xs text-white/50">
                        <p>{log.timestamp}</p>
                        <p>Gas: {log.gasUsed.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-loteraa-gray/20">
                      <div className="font-mono text-xs text-white/60">
                        {log.txHash}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-loteraa-purple hover:bg-loteraa-purple/10 h-6 px-2"
                        onClick={() => openTransactionDetails(log.txHash)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on Etherscan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
