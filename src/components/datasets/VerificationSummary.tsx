
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ExternalLink } from "lucide-react";
import { Dataset } from '@/types/dataset';

interface VerificationSummaryProps {
  dataset: Dataset;
  onClose: () => void;
}

export default function VerificationSummary({ dataset, onClose }: VerificationSummaryProps) {
  const details = dataset.verificationDetails || {};
  
  return (
    <Card className="bg-loteraa-gray/20 border-loteraa-gray/30 mb-8">
      <CardHeader className="bg-green-900/20 border-b border-green-800/30">
        <div className="flex items-center gap-2 text-white">
          <Check className="h-6 w-6 text-green-400" />
          <CardTitle className="text-xl">Dataset verified by smart contract</CardTitle>
        </div>
        <p className="text-white/70 mt-1">
          Your uploaded IoT Data have been successfully verified
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Verification Summary</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Dataset Title:</span>
                <span className="font-medium text-white">{dataset.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Smart Contract:</span>
                <span className="font-medium text-white">{dataset.smartContract}</span>
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
            <h3 className="text-white text-lg font-medium mb-4">Dataset Stats & Payment</h3>
            
            <div className="space-y-3 text-white/80 mb-6">
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
            
            <div className="bg-loteraa-gray/30 rounded-lg p-4 mb-6">
              <h4 className="text-white font-medium mb-3">Payment Released Automatically</h4>
              <div className="space-y-3 text-white/80">
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
                  <span className="font-medium text-white">{details.walletAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Tx Hash:</span>
                  <span className="font-medium text-white truncate">{details.txHash || '0x29a5b41...b6e4'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Explorer
              </Button>
              <Button 
                variant="outline"
                className="flex-1 bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20"
              >
                Download Payment Report
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
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
