import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
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
import WalletModal from './WalletModal';
import Modal from '@/utils/Modal';
import { X, Wallet, ExternalLink, Copy, Check } from 'lucide-react';
import { ethers } from 'ethers';

const tokens = [
   { symbol: 'LOT', name: 'Loteraa Token', balance: '1000.00', price: 2.47 },
   { symbol: 'POL', name: 'Polygon', balance: '5.25', price: 0.75 },
   { symbol: 'ETH', name: 'Ethereum', balance: '0.12', price: 3500.0 },
   { symbol: 'USDT', name: 'Tether', balance: '400.00', price: 1.0 },
   { symbol: 'USDC', name: 'USD Coin', balance: '350.00', price: 1.0 },
];

interface SwapPanelProps {
   walletConnected: boolean;
   setWalletConnected: (connected: boolean) => void;
}

const SwapPanel = ({ walletConnected, setWalletConnected }: SwapPanelProps) => {
   const [fromToken, setFromToken] = useState('LOT');
   const [toToken, setToToken] = useState('USDC');
   const [fromAmount, setFromAmount] = useState('');
   const [toAmount, setToAmount] = useState('');
   const [isSwapping, setIsSwapping] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [address, setAddress] = useState('');
   const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
      null
   );
   const [copiedAddress, setCopiedAddress] = useState(false);

   const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFromAmount(value);

      if (value && !isNaN(parseFloat(value))) {
         // Calculate equivalent amount based on simple price ratio
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
         // Swap the tokens if user selects the same token
         setToToken(fromToken);
      }
      setFromToken(value);

      // Recalculate amounts
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
         // Swap the tokens if user selects the same token
         setFromToken(toToken);
      }
      setToToken(value);

      // Recalculate amounts
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
      if (address) {
         await navigator.clipboard.writeText(address);
         setCopiedAddress(true);
         setTimeout(() => setCopiedAddress(false), 2000);
      }
   };

   const handleConnectWallet = () => {
      setOpenModal(true);
   };

   const handleWalletConnect = (
      walletAddress: string,
      walletProvider?: ethers.BrowserProvider
   ) => {
      setAddress(walletAddress);
      setProvider(walletProvider);
      setWalletConnected(true);

      toast({
         title: 'Wallet Connected',
         description: `Connected to ${walletAddress.slice(
            0,
            6
         )}...${walletAddress.slice(-4)}`,
      });
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

      // Simulate swap operation
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

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   const disconnectWallet = () => {
      setAddress('');
      setProvider(null);
      setWalletConnected(false);

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
                              <div className="flex items-center">
                                 <span>{token.symbol}</span>
                              </div>
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
               {walletConnected && (
                  <div className="mt-2 text-right">
                     <span className="text-sm text-white/70">
                        Balance: {currentFromToken?.balance} {fromToken}
                     </span>
                  </div>
               )}
            </div>

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
                              <div className="flex items-center">
                                 <span>{token.symbol}</span>
                              </div>
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
               {walletConnected && (
                  <div className="mt-2 text-right">
                     <span className="text-sm text-white/70">
                        Balance: {currentToToken?.balance} {toToken}
                     </span>
                  </div>
               )}
            </div>

            <div className="p-4 rounded-lg bg-loteraa-gray/10 border border-loteraa-gray/20">
               <div className="space-y-2">
                  <div className="flex justify-between">
                     <span className="text-sm text-white/70">
                        Exchange Rate
                     </span>
                     <span className="text-sm">
                        1 {fromToken} ≈{' '}
                        {currentFromToken && currentToToken
                           ? (
                                currentToToken.price / currentFromToken.price
                             ).toFixed(6)
                           : '0'}{' '}
                        {toToken}
                     </span>
                  </div>

                  <div className="flex justify-between">
                     <span className="text-sm text-white/70">
                        Slippage Tolerance
                     </span>
                     <span className="text-sm">0.5%</span>
                  </div>

                  <div className="flex justify-between">
                     <span className="text-sm text-white/70">Network Fee</span>
                     <span className="text-sm">0.001 LOT</span>
                  </div>
               </div>
            </div>

            {!walletConnected ? (
               <Button
                  className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
                  onClick={handleConnectWallet}
               >
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
               </Button>
            ) : (
               <Button
                  className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
                  disabled={
                     !fromAmount || parseFloat(fromAmount) <= 0 || isSwapping
                  }
                  onClick={handleSwap}
               >
                  {isSwapping ? 'Swapping...' : 'Swap'}
               </Button>
            )}
         </div>

         {/* Connected Wallet Display */}
         {address && (
            <div className="mt-4 bg-white rounded-lg shadow-md p-4 border">
               <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                     Connected Wallet
                  </h3>
                  <button
                     onClick={disconnectWallet}
                     className="text-red-500 hover:text-red-700 text-xs"
                  >
                     Disconnect
                  </button>
               </div>

               <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Address:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                     {address.slice(0, 8)}...{address.slice(-6)}
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
         <Modal open={openModal} onClose={handleCloseModal}>
            <WalletModal
               onClose={handleCloseModal}
               onConnect={handleWalletConnect}
            />
         </Modal>
      </div>
   );
};

export default SwapPanel;
