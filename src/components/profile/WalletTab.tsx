import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Wallet, ArrowRight, Upload, X, FileImage } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export default function WalletTab() {
  const { user } = useAuth();
  const [lotBalance, setLotBalance] = useState(0);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Report modal state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchBalance();
      
      // Set up real-time subscription for profile updates
      const channel = supabase
        .channel('profile-changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            if (payload.new.lot_token_balance !== undefined) {
              setLotBalance(Number(payload.new.lot_token_balance));
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchBalance = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('lot_token_balance')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      const balance = data?.lot_token_balance || 0;
      setLotBalance(Number(balance));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleWithdraw = () => {
    if (lotBalance === 0) {
      toast({
        title: "No balance to withdraw",
        description: "Start earning LOT tokens by submitting data and using IoT devices.",
        variant: "destructive"
      });
      return;
    }
    setIsWithdrawOpen(true);
  };
  
  const handleViewExplorer = () => {
    console.log("Viewing on explorer...");
    window.open("https://explorer.example.com/address/0xabc123", "_blank");
  };
  
  const processWithdrawal = () => {
    const amount = Number(withdrawAmount);
    
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive"
      });
      return;
    }
    
    if (amount > lotBalance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough LOT tokens for this withdrawal",
        variant: "destructive"
      });
      return;
    }
    
    if (!withdrawAddress || !/^(0x)?[0-9a-fA-F]{40}$/.test(withdrawAddress)) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid blockchain address",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsProcessing(false);
      setIsWithdrawOpen(false);
      
      // Reset form
      setWithdrawAmount('');
      setWithdrawAddress('');
      
      // Show success message
      toast({
        title: "Withdrawal initiated",
        description: `${amount} LOT tokens are being sent to your wallet`,
      });
    }, 2000);
  };

  const handleReportSubmit = async () => {
    if (!reportType || !reportDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (reportDescription.length < 10) {
      toast({
        title: "Description too short",
        description: "Please provide at least 10 characters in your description",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('reportType', reportType);
      formData.append('description', reportDescription);
      formData.append('userId', user?.id || '');
      formData.append('timestamp', new Date().toISOString());
      
      screenshots.forEach((file, index) => {
        formData.append(`screenshots`, file);
      });

      // TODO: Replace with actual backend endpoint
      const BACKEND_ENDPOINT = ''; // Leave empty for user to provide
      
      if (!BACKEND_ENDPOINT) {
        throw new Error('Backend endpoint not configured');
      }

      const response = await fetch(BACKEND_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      toast({
        title: "Report submitted",
        description: "Your report has been submitted successfully. We'll review it shortly.",
      });

      // Reset form
      setReportType('');
      setReportDescription('');
      setScreenshots([]);
      setIsReportOpen(false);

    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid image file`,
          variant: "destructive"
        });
      }
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 5MB`,
          variant: "destructive"
        });
      }
      
      return isValidType && isValidSize;
    });

    setScreenshots(prev => [...prev, ...validFiles]);
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="p-4 md:p-6">
      <Card className="bg-loteraa-gray/20 border-loteraa-gray/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-loteraa-purple/20 to-loteraa-black/20">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-loteraa-purple" />
            <span className="text-white">LOT Token Balance</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="py-6">
          <div className=" flex items-baseline">
            <span className="text-3xl font-bold text-white">{lotBalance.toLocaleString()}</span>
            <span className="ml-2 text-loteraa-purple">LOT</span>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-loteraa-black/20 px-4 py-3">
          <CardContent className='flex gap-3 items-center' >
          <Button 
            className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto"
            onClick={handleWithdraw}
          >
            Withdraw Token
          </Button>
          <Button 
            variant="outline" 
            className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20 w-full sm:w-auto"
            onClick={handleViewExplorer}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </Button>
            
          </CardContent>
          <Button 
            className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto"
            onClick={() => setIsReportOpen(true)}
          >
            Report
          </Button>
        </CardFooter>
      </Card>
      
      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="bg-loteraa-black border-loteraa-gray/30 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Withdraw LOT Tokens</DialogTitle>
            <DialogDescription className="text-loteraa-gray/80">
              Enter the amount and destination address for your withdrawal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">Amount</Label>
                <Badge variant="outline" className="text-xs border-loteraa-gray/50">
                  Available: {lotBalance.toLocaleString()} LOT
                </Badge>
              </div>
              <Input
                id="amount"
                placeholder="Enter amount to withdraw"
                type="number"
                min="0.01"
                step="0.01"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Destination Address</Label>
              <Input
                id="address"
                placeholder="0x..."
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
              />
            </div>
            
            <div className="mt-4 p-3 rounded-md bg-loteraa-purple/10 border border-loteraa-purple/20 text-sm">
              <p className="flex items-center gap-1">
                <span>Network Fee:</span>
                <span className="font-medium">0.5 LOT</span>
              </p>
              <p className="text-xs text-loteraa-gray/80 mt-1">
                This fee is used to cover transaction costs on the blockchain network.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex sm:justify-between gap-3">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20 w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button 
              className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto flex items-center gap-2"
              onClick={processWithdrawal}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm Withdrawal"}
              {!isProcessing && <ArrowRight className="h-4 w-4" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="bg-loteraa-black border-loteraa-gray/30 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Submit Report</DialogTitle>
            <DialogDescription className="text-loteraa-gray/80">
              Help us improve by reporting issues or providing feedback.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type *</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                  <SelectItem value="bug-report" className="text-white">Bug Report</SelectItem>
                  <SelectItem value="feature-request" className="text-white">Feature Request</SelectItem>
                  <SelectItem value="payment-issue" className="text-white">Payment Issue</SelectItem>
                  <SelectItem value="performance-issue" className="text-white">Performance Issue</SelectItem>
                  <SelectItem value="other" className="text-white">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="screenshots">Screenshots (Optional)</Label>
              <div className="space-y-3">
                <div
                  className="border-2 border-dashed border-loteraa-gray/40 rounded-lg p-4 text-center cursor-pointer hover:border-loteraa-purple/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <Upload className="mx-auto h-8 w-8 text-loteraa-gray/60 mb-2" />
                  <p className="text-sm text-white/70 mb-1">
                    Click to upload screenshots
                  </p>
                  <p className="text-xs text-loteraa-gray/60">
                    PNG, JPG, GIF up to 5MB each
                  </p>
                </div>

                {screenshots.length > 0 && (
                  <div className="space-y-2">
                    {screenshots.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-loteraa-gray/10 rounded-md">
                        <FileImage className="h-4 w-4 text-loteraa-purple" />
                        <span className="text-sm text-white/80 flex-1">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeScreenshot(index)}
                          className="h-6 w-6 p-0 text-loteraa-gray/60 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue or provide feedback..."
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white min-h-[100px]"
                maxLength={1000}
              />
              <div className="text-xs text-loteraa-gray/60 text-right">
                {reportDescription.length}/1000 characters
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex sm:justify-between gap-3">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20 w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button 
              className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto"
              onClick={handleReportSubmit}
              disabled={isSubmitting || !reportType || !reportDescription.trim()}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}