import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, Wallet, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import ReportModal from './ReportModal';
import api from '@/utils/api';

export default function WalletTab() {
   const { user, lotBalance, ethBalance, refreshEthBalance, refreshBalance } =
      useAuth();
   const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
   const [withdrawAmount, setWithdrawAmount] = useState('');
   const [withdrawAddress, setWithdrawAddress] = useState('');
   const [isProcessing, setIsProcessing] = useState(false);

   // Report modal state
   const [isReportOpen, setIsReportOpen] = useState(false);

   const handleWithdraw = () => {
      if (lotBalance === 0) {
         toast({
            title: 'No balance to withdraw',
            description:
               'Start earning LOT tokens by submitting data and using IoT devices.',
            variant: 'destructive',
         });
         return;
      }
      setIsWithdrawOpen(true);
   };

   const handleViewExplorer = () => {
      console.log('Viewing on explorer...');
      window.open('https://explorer.example.com/address/0xabc123', '_blank');
   };

   const processWithdrawal = async () => {
      const amount = parseFloat(withdrawAmount);

      // Validation checks
      if (!withdrawAmount || isNaN(amount) || amount <= 0) {
         toast({
            title: 'Invalid amount',
            description: 'Please enter a valid withdrawal amount',
            variant: 'destructive',
         });
         return;
      }

      if (amount > lotBalance) {
         toast({
            title: 'Insufficient balance',
            description: "You don't have enough LOT tokens for this withdrawal",
            variant: 'destructive',
         });
         return;
      }

      if (!withdrawAddress || !/^(0x)?[0-9a-fA-F]{40}$/.test(withdrawAddress)) {
         toast({
            title: 'Invalid address',
            description: 'Please enter a valid blockchain address',
            variant: 'destructive',
         });
         return;
      }

      setIsProcessing(true);

      try {
         console.log(`Withdrawing ${amount} LOT to ${withdrawAddress}`);

         // Set a custom timeout for withdrawal requests (e.g., 60 seconds)
         const response = await api.post(
            '/onchain/send-tokens',
            {
               userId: user.id,
               amount: amount,
               address: withdrawAddress,
            },
            {
               timeout: 60000, // 60 seconds timeout
            }
         );

         // Success case
         setWithdrawAmount('');
         setWithdrawAddress('');
         setIsWithdrawOpen(false);

         // Refresh balances after successful withdrawal
         await refreshBalance();
         await refreshEthBalance();

         toast({
            title: 'Withdrawal successful',
            description: `${amount} LOT tokens have been sent to your wallet`,
         });
      } catch (error) {
         console.error('Withdrawal error:', error.response?.data?.message);
         const errorMessage =
            error.response?.data?.message ||
            'There was an error processing your withdrawal.';

         // Check for specific error messages from the backend
         if (errorMessage.includes('Insufficient ETH for gas')) {
            toast({
               title: 'Insufficient Gas Fee',
               description: 'The transaction failed due to insufficient gas.',
               variant: 'destructive',
            });
         } else if (errorMessage.includes('Insufficient balance')) {
            toast({
               title: 'Insufficient Balance',
               description:
                  "You don't have enough tokens to complete this transaction.",
               variant: 'destructive',
            });
         } else if (
            error.code === 'ECONNABORTED' ||
            error.message?.includes('timeout')
         ) {
            // Handle timeout error
            toast({
               title: 'Transaction Timeout',
               description:
                  'The transaction is taking longer than expected. Please check your balance in a few minutes.',
               variant: 'destructive',
            });

            // Refresh balance after a delay to check if the transaction went through
            setTimeout(async () => {
               await refreshBalance();
               await refreshEthBalance();

               toast({
                  title: 'Balance updated',
                  description:
                     'Your balance has been refreshed. Check if the withdrawal was processed.',
               });
            }, 10000); // Check after 10 seconds
         } else if (error.response?.status >= 500) {
            // Server error
            toast({
               title: 'Server Error',
               description:
                  'There was a server error. Please try again or check your balance shortly.',
               variant: 'destructive',
            });
         } else {
            // Handle all other generic errors
            toast({
               title: 'Withdrawal Failed',
               description: errorMessage,
               variant: 'destructive',
            });
         }
      } finally {
         setIsProcessing(false);
      }
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

            <CardContent className="py-6 flex flex-col sm:flex-row gap-8 sm:gap-20 items-start sm:items-center justify-between w-[200px] ">
               <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">
                     {lotBalance.toLocaleString()}
                  </span>
                  <span className="ml-2 text-loteraa-purple">LOT</span>
               </div>

               <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">
                     {ethBalance.toString().slice(0, 8)}
                  </span>
                  <span className="ml-2 text-loteraa-purple">ETH</span>
               </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-loteraa-black/20 px-4 py-3">
               <div className="flex gap-3 items-center">
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
               </div>
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
                  <DialogTitle className="text-xl text-white">
                     Withdraw LOT Tokens
                  </DialogTitle>
                  <DialogDescription className="text-loteraa-gray/80">
                     Enter the amount and destination address for your
                     withdrawal.
                  </DialogDescription>
               </DialogHeader>

               <div className="space-y-4 py-3">
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <Label htmlFor="amount">Amount</Label>
                        <Badge
                           variant="outline"
                           className="text-xs border-loteraa-gray/50"
                        >
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
                        disabled={isProcessing}
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
                        disabled={isProcessing}
                     />
                  </div>

                  <div className="mt-4 p-3 rounded-md bg-loteraa-purple/10 border border-loteraa-purple/20 text-sm">
                     <p className="flex items-center gap-1">
                        <span>Network Fee:</span>
                        <span className="font-medium">0.5 LOT</span>
                     </p>
                     <p className="text-xs text-loteraa-gray/80 mt-1">
                        This fee is used to cover transaction costs on the
                        blockchain network.
                     </p>
                  </div>
               </div>

               <DialogFooter className="flex sm:justify-between gap-3">
                  <DialogClose asChild>
                     <Button
                        variant="outline"
                        className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20 w-full sm:w-auto"
                        disabled={isProcessing}
                     >
                        Cancel
                     </Button>
                  </DialogClose>
                  <Button
                     className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto flex items-center gap-2"
                     onClick={processWithdrawal}
                     disabled={isProcessing}
                  >
                     {isProcessing ? 'Processing...' : 'Confirm Withdrawal'}
                     {!isProcessing && <ArrowRight className="h-4 w-4" />}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>

         {/* Report Modal */}
         <ReportModal
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
         />
      </div>
   );
}
