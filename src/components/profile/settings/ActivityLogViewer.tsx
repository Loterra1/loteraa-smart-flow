
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Activity, ExternalLink, FileCode } from 'lucide-react';
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
  
  // Empty activity logs for new users
  const activityLogs: ActivityLog[] = [];
  
  const viewLogs = () => {
    setIsOpen(true);
    if (activityLogs.length === 0) {
      toast({
        title: "No Activity Logs",
        description: "Deploy smart contracts to see activity logs here."
      });
    } else {
      toast({
        title: "Activity Logs Loaded",
        description: "Displaying recent smart contract activity logs."
      });
    }
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
              {activityLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-loteraa-purple/10 flex items-center justify-center">
                    <FileCode className="h-8 w-8 text-loteraa-purple/50" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No smart contract activity yet</h3>
                  <p className="text-white/50 text-center max-w-md">
                    When you deploy and interact with smart contracts, their activity logs will appear here.
                  </p>
                </div>
              ) : (
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
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
