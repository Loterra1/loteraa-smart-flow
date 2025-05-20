
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ExternalLink, Download } from "lucide-react";
import { Dataset } from '@/types/dataset';
import { useToast } from '@/hooks/use-toast';

interface VerificationSummaryProps {
  dataset: Dataset;
  onClose: () => void;
}

export default function VerificationSummary({ dataset, onClose }: VerificationSummaryProps) {
  const details = dataset.verificationDetails || {};
  const { toast } = useToast();
  
  // Truncate wallet address and transaction hash for mobile display
  const truncateAddress = (address: string = '') => {
    if (!address) return '';
    return address.length > 10 ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : address;
  };
  
  const handleDownloadReport = () => {
    // Create a simple payment report
    const reportData = {
      datasetName: dataset.name,
      paymentStatus: details.paymentStatus || 'Paid',
      paymentAmount: details.paymentAmount || 1950,
      walletAddress: details.walletAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      txHash: details.txHash || '0x29a5b41b62c30b9de8c5d3fea17aca5ed888bdebc941a4ea6370e9d3c5cb6e4',
      timestamp: details.timeOfVerification || new Date().toISOString(),
    };
    
    // Convert to JSON
    const reportBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const reportUrl = URL.createObjectURL(reportBlob);
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = reportUrl;
    downloadLink.download = `payment-report-${dataset.id}.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Show success toast
    toast({
      title: "Payment Report Downloaded",
      description: "Your payment report has been downloaded successfully.",
    });
  };
  
  return (
    <Card className="bg-loteraa-gray/20 border-loteraa-gray/30 mb-8">
      <CardHeader className="bg-green-900/20 border-b border-green-800/30">
        <div className="flex items-center gap-2 text-white">
          <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
          <CardTitle className="text-lg sm:text-xl">Dataset verified by smart contract</CardTitle>
        </div>
        <p className="text-white/70 mt-1 text-sm sm:text-base">
          Your uploaded IoT Data have been successfully verified
        </p>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <div>
            <h3 className="text-white text-base sm:text-lg font-medium mb-3 sm:mb-4">Verification Summary</h3>
            <div className="space-y-2 sm:space-y-3 text-white/80 text-sm sm:text-base">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Dataset Title:</span>
                <span className="font-medium text-white truncate max-w-[180px] sm:max-w-none">{dataset.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Smart Contract:</span>
                <span className="font-medium text-white truncate max-w-[180px] sm:max-w-none">{dataset.smartContract}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Status:</span>
                <span className="font-medium text-green-400">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Time of verification:</span>
                <span className="font-medium text-white">{details.timeOfVerification || 'May 20, 2025 14:32:15'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Data Hash Match:</span>
                <span className="font-medium text-green-400">Matched</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Timestamp Match:</span>
                <span className="font-medium text-green-400">Matched</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Region Match:</span>
                <span className="font-medium text-green-400">Matched</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-base sm:text-lg font-medium mb-3 sm:mb-4">Dataset Stats & Payment</h3>
            
            <div className="space-y-2 sm:space-y-3 text-white/80 text-sm sm:text-base mb-4 sm:mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/70">File size:</span>
                <span className="font-medium text-white">{dataset.size}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Access set:</span>
                <span className="font-medium text-white">
                  {dataset.accessType === 'Paid Access' 
                    ? `Paid (${dataset.accessPrice} $Terra per query)` 
                    : dataset.accessType}
                </span>
              </div>
            </div>
            
            <div className="bg-loteraa-gray/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">Payment Released Automatically</h4>
              <div className="space-y-2 sm:space-y-3 text-white/80 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Payment status:</span>
                  <span className="font-medium text-green-400">{details.paymentStatus || 'Paid'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Amount:</span>
                  <span className="font-medium text-white">{details.paymentAmount || '1950'} $Terra</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Wallet Address:</span>
                  <span className="font-medium text-white">{truncateAddress(details.walletAddress)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Tx Hash:</span>
                  <span className="font-medium text-white">{truncateAddress(details.txHash)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 text-sm h-9 px-3"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Explorer
              </Button>
              <Button 
                variant="outline"
                className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20 text-sm h-9 px-3"
                onClick={handleDownloadReport}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6 flex justify-end">
          <Button 
            onClick={onClose}
            className="bg-loteraa-purple hover:bg-loteraa-purple/90"
          >
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
