import { useState } from 'react';
import { ArrowDown, Wallet, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import EnhancedWalletModal from './WalletModal';
import Modal from '@/utils/Modal';
import { useAuth } from '@/contexts/AuthContext';

const tokens = [
   { symbol: 'LOT', name: 'Loteraa Token', balance: '1000.00', price: 2.47 },
   { symbol: 'POL', name: 'Polygon', balance: '5.25', price: 0.75 },
   { symbol: 'ETH', name: 'Ethereum', balance: '0.12', price: 3500.0 },
   { symbol: 'USDT', name: 'Tether', balance: '400.00', price: 1.0 },
   { symbol: 'USDC', name: 'USD Coin', balance: '350.00', price: 1.0 },
];

const SwapPanel = () => {
   const { walletAddress, setWalletAddress } = useAuth();

   const [fromToken, setFromToken] = useState('LOT');
   const [toToken, setToToken] = useState('USDC');
   const [fromAmount, setFromAmount] = useState('');
   const [toAmount, setToAmount] = useState('');
   const [isSwapping, setIsSwapping] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [copiedAddress, setCopiedAddress] = useState(false);

   const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFromAmount(value);

      if (value && !isNaN(parseFloat(value))) {
         const from = tokens.find((t) => t.symbol === fromToken);
         const to = tokens.find((t) => t.symbol === toToken);

         if (from && to) {
            const rate = to.price / from.price;
            setToAmount((parseFloat(value) * rate).toFixed(6));
         }
      } else {
         setToAmount('');
      }
   };

   const handleFromTokenChange = (value: string) => {
      if (value === toToken) {
         setToToken(fromToken);
      }
      setFromToken(value);

      if (fromAmount && !isNaN(parseFloat(fromAmount))) {
         const from = tokens.find((t) => t.symbol === value);
         const to = tokens.find(
            (t) => t.symbol === (value === toToken ? fromToken : toToken)
         );

         if (from && to) {
            const rate = to.price / from.price;
            setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
         }
      }
   };

   const handleToTokenChange = (value: string) => {
      if (value === fromToken) {
         setFromToken(toToken);
      }
      setToToken(value);

      if (fromAmount && !isNaN(parseFloat(fromAmount))) {
         const from = tokens.find(
            (t) => t.symbol === (value === fromToken ? toToken : fromToken)
         );
         const to = tokens.find((t) => t.symbol === value);

         if (from && to) {
            const rate = to.price / from.price;
            setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
         }
      }
   };

   const handleSwapTokens = () => {
      const tempToken = fromToken;
      setFromToken(toToken);
      setToToken(tempToken);

      const tempAmount = fromAmount;
      setFromAmount(toAmount);
      setToAmount(tempAmount);
   };

   const copyAddress = async () => {
      if (walletAddress) {
         await navigator.clipboard.writeText(walletAddress);
         setCopiedAddress(true);
         setTimeout(() => setCopiedAddress(false), 2000);
      }
   };

   const handleSwap = async () => {
      if (!fromAmount || parseFloat(fromAmount) <= 0) {
         toast({
            title: 'Invalid amount',
            description: 'Please enter a valid amount to swap',
            variant: 'destructive',
         });
         return;
      }

      setIsSwapping(true);

      try {
         await new Promise((resolve) => setTimeout(resolve, 2000));

         toast({
            title: 'Swap successful',
            description: `You swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
         });

         setFromAmount('');
         setToAmount('');
      } catch (error) {
         toast({
            title: 'Swap failed',
            description: 'There was an error processing your swap request',
            variant: 'destructive',
         });
      } finally {
         setIsSwapping(false);
      }
   };

   const disconnectWallet = () => {
      setWalletAddress('');
      toast({
         title: 'Wallet Disconnected',
         description: 'Your wallet has been disconnected',
      });
   };

   const currentFromToken = tokens.find((t) => t.symbol === fromToken);
   const currentToToken = tokens.find((t) => t.symbol === toToken);

   return (
      <div className="max-w-md mx-auto">
         <div className="space-y-6">
            {/* From Section */}
            <div className="p-4 rounded-lg bg-loteraa-gray/20 border border-loteraa-gray/30 backdrop-blur-sm">
               <div className="mb-2">
                  <span className="text-sm text-white/70">From</span>
               </div>

               <div className="flex space-x-2">
                  <Select
                     value={fromToken}
                     onValueChange={handleFromTokenChange}
                  >
                     <SelectTrigger className="w-1/3">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        {tokens.map((token) => (
                           <SelectItem key={token.symbol} value={token.symbol}>
                              <span>{token.symbol}</span>
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>

                  <Input
                     value={fromAmount}
                     onChange={handleFromAmountChange}
                     placeholder="0.0"
                     className="flex-1"
                  />
               </div>
               {walletAddress && (
                  <div className="mt-2 text-right">
                     <span className="text-sm text-white/70">
                        Balance: {currentFromToken?.balance} {fromToken}
                     </span>
                  </div>
               )}
            </div>

            {/* Swap Arrow */}
            <div className="flex justify-center">
               <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8 bg-loteraa-purple/20 border-loteraa-purple/30 hover:bg-loteraa-purple/30"
                  onClick={handleSwapTokens}
               >
                  <ArrowDown className="h-4 w-4" />
               </Button>
            </div>

            {/* To Section */}
            <div className="p-4 rounded-lg bg-loteraa-gray/20 border border-loteraa-gray/30 backdrop-blur-sm">
               <div className="mb-2">
                  <span className="text-sm text-white/70">To</span>
               </div>

               <div className="flex space-x-2">
                  <Select value={toToken} onValueChange={handleToTokenChange}>
                     <SelectTrigger className="w-1/3">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        {tokens.map((token) => (
                           <SelectItem key={token.symbol} value={token.symbol}>
                              <span>{token.symbol}</span>
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>

                  <Input
                     value={toAmount}
                     readOnly
                     placeholder="0.0"
                     className="flex-1 bg-loteraa-gray/10"
                  />
               </div>
               {walletAddress && (
                  <div className="mt-2 text-right">
                     <span className="text-sm text-white/70">
                        Balance: {currentToToken?.balance} {toToken}
                     </span>
                  </div>
               )}
            </div>

            {/* Action Button */}
            {!walletAddress ? (
               <Button
                  className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
                  onClick={() => setOpenModal(true)}
               >
                  <Wallet className="w-5 h-5 mr-2" />
                  Create Wallet
               </Button>
            ) : (
               <Button
                  className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
                  // disabled={
                  //    !fromAmount || parseFloat(fromAmount) <= 0 || isSwapping
                  // }
                  onClick={handleSwap}
               >
                  {isSwapping ? 'Swapping...' : 'Swap'}
               </Button>
            )}
         </div>

         {/* Connected Wallet Display */}
         {walletAddress && (
            <div className="mt-4 bg-black text-white rounded-lg shadow-md p-4 border">
               <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                     Wallet Connected
                  </h3>
                  {/* <button
                     onClick={disconnectWallet}
                     className="text-red-500 hover:text-red-700 text-xs"
                  >
                     Disconnect
                  </button> */}
               </div>

               <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Address:</span>
                  <span className="font-mono text-xs  px-2 py-1 rounded">
                     {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                  </span>
                  <button
                     onClick={copyAddress}
                     className="p-1 hover:bg-gray-200 rounded"
                     title="Copy address"
                  >
                     {copiedAddress ? (
                        <Check className="w-3 h-3 text-green-500" />
                     ) : (
                        <Copy className="w-3 h-3 text-gray-500" />
                     )}
                  </button>
               </div>
            </div>
         )}

         {/* Modal */}
         <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <EnhancedWalletModal onClose={() => setOpenModal(false)} />
         </Modal>
      </div>
   );
};

export default SwapPanel;
