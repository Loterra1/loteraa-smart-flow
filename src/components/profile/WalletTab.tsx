import React, { useState, useEffect } from 'react';
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
import { ExternalLink, Wallet, ArrowRight } from 'lucide-react';
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
          <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto" >
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
    </div>
  );
}