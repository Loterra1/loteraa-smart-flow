import { useState } from 'react';
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
import { Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const networks = [
   { id: 'loteraa', name: 'Loteraa Mainnet', icon: '🔷' },
   { id: 'polygon', name: 'Polygon Mainnet', icon: '💜' },
];

const tokens = [
   { symbol: 'LOT', name: 'Loteraa Token', balance: '1000.00' },
   { symbol: 'USDT', name: 'Tether USD', balance: '400.00' },
   { symbol: 'USDC', name: 'USD Coin', balance: '350.00' },
];

interface BridgePanelProps {
   walletConnected: boolean;
   setWalletConnected: (connected: boolean) => void;
}

const BridgePanel = ({ setWalletConnected }: BridgePanelProps) => {
   const { walletAddress } = useAuth();
   const [fromNetwork, setFromNetwork] = useState('loteraa');
   const [toNetwork, setToNetwork] = useState('polygon');
   const [token, setToken] = useState('LOT');
   const [amount, setAmount] = useState('');
   const [isBridging, setIsBridging] = useState(false);

   const handleFromNetworkChange = (value: string) => {
      if (value === toNetwork) {
         // Swap networks if user selects the same one
         setToNetwork(fromNetwork);
      }
      setFromNetwork(value);
   };

   const handleToNetworkChange = (value: string) => {
      if (value === fromNetwork) {
         // Swap networks if user selects the same one
         setFromNetwork(toNetwork);
      }
      setToNetwork(value);
   };

   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value);
   };

   const handleMax = () => {
      const selectedToken = tokens.find((t) => t.symbol === token);
      if (selectedToken && walletAddress) {
         setAmount(selectedToken.balance);
      }
   };

   const handleConnectWallet = () => {
      toast({
         title: 'Connect Wallet',
         description: 'Wallet connection feature will be implemented soon',
      });
      // For UI demonstration only
      setWalletConnected(true);
   };

   const handleBridge = async () => {
      if (!amount || parseFloat(amount) <= 0) {
         toast({
            title: 'Invalid amount',
            description: 'Please enter a valid amount to bridge',
            variant: 'destructive',
         });
         return;
      }

      setIsBridging(true);

      // Simulate bridge operation
      try {
         await new Promise((resolve) => setTimeout(resolve, 3000));

         const fromNetworkName =
            networks.find((n) => n.id === fromNetwork)?.name || fromNetwork;
         const toNetworkName =
            networks.find((n) => n.id === toNetwork)?.name || toNetwork;

         toast({
            title: 'Bridge initiated',
            description: `Your bridge of ${amount} ${token} from ${fromNetworkName} to ${toNetworkName} has been initiated. This may take 50 seconds to 1 minute to complete.`,
         });

         setAmount('');
      } catch (error) {
         toast({
            title: 'Bridge failed',
            description: 'There was an error processing your bridge request',
            variant: 'destructive',
         });
      } finally {
         setIsBridging(false);
      }
   };

   const selectedToken = tokens.find((t) => t.symbol === token);

   return (
      <div className="max-w-md mx-auto">
         <div className="space-y-6">
            <div>
               <div className="mb-4 p-4 rounded-lg bg-loteraa-purple/20 border border-loteraa-purple/30 text-sm">
                  <p className="text-white/90">
                     Bridge your tokens between Loteraa and Polygon networks.
                     The bridging process typically takes 50 seconds to 1 minute
                     to complete.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                     <label className="block text-sm text-white/70 mb-2">
                        From
                     </label>
                     <Select
                        value={fromNetwork}
                        onValueChange={handleFromNetworkChange}
                     >
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           {networks.map((network) => (
                              <SelectItem key={network.id} value={network.id}>
                                 <div className="flex items-center">
                                    <span className="mr-2">{network.icon}</span>
                                    <span>{network.name}</span>
                                 </div>
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  <div>
                     <label className="block text-sm text-white/70 mb-2">
                        To
                     </label>
                     <Select
                        value={toNetwork}
                        onValueChange={handleToNetworkChange}
                     >
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           {networks.map((network) => (
                              <SelectItem key={network.id} value={network.id}>
                                 <div className="flex items-center">
                                    <span className="mr-2">{network.icon}</span>
                                    <span>{network.name}</span>
                                 </div>
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <div className="mb-6">
                  <label className="block text-sm text-white/70 mb-2">
                     Token
                  </label>
                  <Select value={token} onValueChange={setToken}>
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        {tokens.map((t) => (
                           <SelectItem key={t.symbol} value={t.symbol}>
                              {t.symbol} - {t.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>

               <div className="mb-6">
                  <div>
                     <label className="block text-sm text-white/70 mb-2">
                        Amount
                     </label>
                  </div>
                  <div className="relative">
                     <Input
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0.0"
                     />
                     {walletAddress && (
                        <Button
                           variant="outline"
                           size="sm"
                           className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 text-xs"
                           onClick={handleMax}
                        >
                           MAX
                        </Button>
                     )}
                  </div>
                  {walletAddress && (
                     <div className="mt-2">
                        <span className="text-xs text-white/70">
                           Balance: {selectedToken?.balance || '0'} {token}
                        </span>
                     </div>
                  )}
               </div>

               <div className="p-4 rounded-lg bg-loteraa-gray/10 border border-loteraa-gray/20 mb-6">
                  <div className="space-y-2">
                     <div className="flex justify-between">
                        <span className="text-sm text-white/70">
                           Bridge Fee
                        </span>
                        <span className="text-sm">0.1% + 0.001 {token}</span>
                     </div>

                     <div className="flex justify-between">
                        <span className="text-sm text-white/70">
                           Estimated Time
                        </span>
                        <span className="text-sm">50 seconds - 1 minute</span>
                     </div>

                     <div className="flex justify-between">
                        <span className="text-sm text-white/70">
                           You will receive
                        </span>
                        <span className="text-sm">
                           {amount && !isNaN(parseFloat(amount))
                              ? (parseFloat(amount) * 0.999 - 0.001).toFixed(6)
                              : '0'}{' '}
                           {token}
                        </span>
                     </div>
                  </div>
               </div>

               {!walletAddress ? (
                  <Button
                     className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
                     onClick={handleConnectWallet}
                  >
                     <Wallet className="mr-2 h-4 w-4" /> Create Wallet
                  </Button>
               ) : (
                  <Button
                     className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
                     disabled={!amount || parseFloat(amount) <= 0 || isBridging}
                     onClick={handleBridge}
                  >
                     {isBridging ? 'Bridging...' : 'Bridge Tokens'}
                  </Button>
               )}
            </div>
         </div>
      </div>
   );
};

export default BridgePanel;
