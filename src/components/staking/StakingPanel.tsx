import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { X, Wallet, ExternalLink, Copy, Check } from 'lucide-react';
import { ethers } from 'ethers';

interface StakeEntry {
   id: string;
   amount: number;
   period: string;
   apy: string;
   unlockDate: string;
   daysRemaining: number;
}

interface StakingPanelProps {
   walletConnected: boolean;
   setWalletConnected: (connected: boolean) => void;
}

const stakingOptions = [
   { value: '4weeks', label: '4 Weeks', apy: '12.5%' },
   { value: '8weeks', label: '8 Weeks', apy: '16.8%' },
   { value: '12weeks', label: '12 Weeks', apy: '21.3%' },
   { value: '4months', label: '4 Months', apy: '27.5%' },
];

const WALLETS = [
   {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      provider: 'ethereum',
      downloadUrl: 'https://metamask.io/',
   },
   {
      id: 'phantom',
      name: 'Phantom',
      icon: '👻',
      provider: 'solana',
      downloadUrl: 'https://phantom.app/',
   },
   {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '🔗',
      provider: 'walletconnect',
      downloadUrl: 'https://walletconnect.com/',
   },
   {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔵',
      provider: 'coinbaseWallet',
      downloadUrl: 'https://www.coinbase.com/wallet',
   },
];

// Network configurations
const NETWORKS = {
   ethereum: [
      {
         id: '1',
         name: 'Ethereum Mainnet',
         rpc: 'https://mainnet.infura.io/v3/',
      },
      {
         id: '11155111',
         name: 'Sepolia Testnet',
         rpc: 'https://sepolia.infura.io/v3/',
      },
      { id: '137', name: 'Polygon', rpc: 'https://polygon-rpc.com/' },
      { id: '56', name: 'BSC', rpc: 'https://bsc-dataseed.binance.org/' },
   ],
   solana: [
      {
         id: 'mainnet-beta',
         name: 'Solana Mainnet',
         rpc: 'https://api.mainnet-beta.solana.com',
      },
      {
         id: 'devnet',
         name: 'Solana Devnet',
         rpc: 'https://api.devnet.solana.com',
      },
   ],
};

const StakingPanel = ({
   walletConnected,
   setWalletConnected,
}: StakingPanelProps) => {
   const [amount, setAmount] = useState('');
   const [stakingPeriod, setStakingPeriod] = useState('4weeks');
   const [isStaking, setIsStaking] = useState(false);
   const [sliderValue, setSliderValue] = useState([50]);
   const [walletBalance, setWalletBalance] = useState(0);
   const [userStakes, setUserStakes] = useState<StakeEntry[]>([]);
   const [totalStaked, setTotalStaked] = useState(0);
   const [totalRewards, setTotalRewards] = useState(0);

   // Wallet connection states
   const [showWalletModal, setShowWalletModal] = useState(false);
   const [connectionMethod, setConnectionMethod] = useState<
      'wallet' | 'manual'
   >('wallet');
   const [walletAvailability, setWalletAvailability] = useState<
      Record<string, boolean>
   >({});
   const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
   const [selectedNetwork, setSelectedNetwork] = useState('1');
   const [manualAddress, setManualAddress] = useState('');
   const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
      null
   );
   const [address, setAddress] = useState('');
   const [isConnecting, setIsConnecting] = useState(false);
   const [copiedAddress, setCopiedAddress] = useState(false);

   const selectedOption = stakingOptions.find(
      (option) => option.value === stakingPeriod
   );

   // Check wallet availability
   const getWalletAvailability = () => {
      const availability: Record<string, boolean> = {};
      WALLETS.forEach((wallet) => {
         switch (wallet.id) {
            case 'metamask':
               availability[wallet.id] = !!(window as any).ethereum?.isMetaMask;
               break;
            case 'phantom':
               availability[wallet.id] = !!(window as any).phantom?.solana;
               break;
            case 'coinbase':
               availability[wallet.id] = !!(window as any).ethereum
                  ?.isCoinbaseWallet;
               break;
            default:
               availability[wallet.id] = false;
         }
      });
      return availability;
   };

   const getNetworkOptions = () => {
      if (!selectedWallet) return [];

      const wallet = WALLETS.find((w) => w.id === selectedWallet);
      if (wallet?.provider === 'solana') {
         return NETWORKS.solana;
      }
      return NETWORKS.ethereum;
   };

   const connectToWallet = async (walletId: string, networkId: string) => {
      setIsConnecting(true);
      try {
         let walletProvider: ethers.BrowserProvider | null = null;
         let userAddress: string;

         switch (walletId) {
            case 'metamask':
               if (!(window as any).ethereum?.isMetaMask) {
                  throw new Error('MetaMask is not installed');
               }

               // Switch to selected network first
               try {
                  await (window as any).ethereum.request({
                     method: 'wallet_switchEthereumChain',
                     params: [
                        { chainId: `0x${parseInt(networkId).toString(16)}` },
                     ],
                  });
               } catch (switchError: any) {
                  if (switchError.code === 4902) {
                     console.log('Network not found in wallet');
                  }
               }

               const accounts = await (window as any).ethereum.request({
                  method: 'eth_requestAccounts',
               });

               if (accounts.length === 0) throw new Error('No accounts found');

               walletProvider = new ethers.BrowserProvider(
                  (window as any).ethereum
               );
               const signer = await walletProvider.getSigner();
               userAddress = await signer.getAddress();
               break;

            case 'phantom':
               if (!(window as any).phantom?.solana) {
                  throw new Error('Phantom wallet is not installed');
               }

               const response = await (window as any).phantom.solana.connect();
               userAddress = response.publicKey.toString();
               break;

            case 'coinbase':
               if (!(window as any).ethereum?.isCoinbaseWallet) {
                  throw new Error('Coinbase Wallet is not installed');
               }

               const cbAccounts = await (window as any).ethereum.request({
                  method: 'eth_requestAccounts',
               });

               if (cbAccounts.length === 0)
                  throw new Error('No accounts found');

               walletProvider = new ethers.BrowserProvider(
                  (window as any).ethereum
               );
               const cbSigner = await walletProvider.getSigner();
               userAddress = await cbSigner.getAddress();
               break;

            default:
               throw new Error('Wallet not supported yet');
         }

         setProvider(walletProvider);
         setAddress(userAddress);
         setWalletConnected(true);
         setWalletBalance(1000); // Set mock balance
         setShowWalletModal(false);

         toast({
            title: 'Wallet Connected',
            description: `Successfully connected to ${
               WALLETS.find((w) => w.id === walletId)?.name
            }`,
         });
      } catch (error: any) {
         console.error('Wallet connection error:', error);

         if (error.code === 4001) {
            toast({
               title: 'Connection Rejected',
               description: 'User rejected the connection request',
               variant: 'destructive',
            });
         } else if (error.message.includes('not installed')) {
            toast({
               title: 'Wallet Not Found',
               description: error.message,
               variant: 'destructive',
            });
         } else {
            toast({
               title: 'Connection Failed',
               description: error.message,
               variant: 'destructive',
            });
         }
      } finally {
         setIsConnecting(false);
      }
   };

   const connectManually = () => {
      if (!manualAddress.trim()) {
         toast({
            title: 'Invalid Address',
            description: 'Please enter a wallet address',
            variant: 'destructive',
         });
         return;
      }

      // Basic validation
      if (selectedNetwork === 'mainnet-beta' || selectedNetwork === 'devnet') {
         // Solana address validation (basic)
         if (manualAddress.length < 32 || manualAddress.length > 44) {
            toast({
               title: 'Invalid Address',
               description: 'Invalid Solana address format',
               variant: 'destructive',
            });
            return;
         }
      } else {
         // Ethereum address validation
         if (!ethers.isAddress(manualAddress)) {
            toast({
               title: 'Invalid Address',
               description: 'Invalid Ethereum address format',
               variant: 'destructive',
            });
            return;
         }
      }

      setAddress(manualAddress);
      setWalletConnected(true);
      setWalletBalance(1000); // Set mock balance
      setShowWalletModal(false);
      setManualAddress('');

      toast({
         title: 'Address Connected',
         description: 'Wallet address added successfully (read-only mode)',
      });
   };

   const disconnectWallet = () => {
      setProvider(null);
      setAddress('');
      setWalletConnected(false);
      setWalletBalance(0);
      setUserStakes([]);

      toast({
         title: 'Wallet Disconnected',
         description: 'Successfully disconnected from wallet',
      });
   };

   const copyAddress = async () => {
      if (address) {
         await navigator.clipboard.writeText(address);
         setCopiedAddress(true);
         setTimeout(() => setCopiedAddress(false), 2000);

         toast({
            title: 'Address Copied',
            description: 'Wallet address copied to clipboard',
         });
      }
   };

   // Initialize wallet availability
   useEffect(() => {
      setWalletAvailability(getWalletAvailability());
   }, []);

   // Calculate total staked amount
   useEffect(() => {
      const total = userStakes.reduce((sum, stake) => sum + stake.amount, 0);
      setTotalStaked(total);

      // Calculate total rewards (simplified calculation)
      const rewards = userStakes.reduce((sum, stake) => {
         const apyNumber = parseFloat(stake.apy.replace('%', ''));
         return sum + (stake.amount * apyNumber) / 100 / 12; // Monthly rewards approximation
      }, 0);
      setTotalRewards(rewards);
   }, [userStakes]);

   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value);
   };

   const handleSliderChange = (value: number[]) => {
      setSliderValue(value);
      if (walletConnected) {
         const calculatedAmount = ((walletBalance * value[0]) / 100).toFixed(2);
         setAmount(calculatedAmount);
      }
   };

   const handleConnectWallet = () => {
      setShowWalletModal(true);
   };

   const handleStake = async () => {
      if (!amount || parseFloat(amount) <= 0) {
         toast({
            title: 'Invalid amount',
            description: 'Please enter a valid amount to stake',
            variant: 'destructive',
         });
         return;
      }

      const stakeAmount = parseFloat(amount);
      if (stakeAmount > walletBalance) {
         toast({
            title: 'Insufficient balance',
            description: "You don't have enough LOT tokens",
            variant: 'destructive',
         });
         return;
      }

      setIsStaking(true);

      try {
         await new Promise((resolve) => setTimeout(resolve, 2000));

         // Update wallet balance
         setWalletBalance((prev) => prev - stakeAmount);

         // Add new stake entry
         const newStake: StakeEntry = {
            id: Date.now().toString(),
            amount: stakeAmount,
            period: selectedOption?.label || '',
            apy: selectedOption?.apy || '',
            unlockDate: new Date(
               Date.now() + 4 * 7 * 24 * 60 * 60 * 1000
            ).toLocaleDateString(),
            daysRemaining: 28,
         };

         setUserStakes((prev) => [...prev, newStake]);

         toast({
            title: 'Staked successfully',
            description: `You have staked ${amount} LOT for ${selectedOption?.label}`,
         });

         setAmount('');
         setSliderValue([0]);
      } catch (error) {
         toast({
            title: 'Staking failed',
            description: 'There was an error processing your staking request',
            variant: 'destructive',
         });
      } finally {
         setIsStaking(false);
      }
   };

   // Listen for account changes
   useEffect(() => {
      if ((window as any).ethereum) {
         const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
               setAddress('');
               setProvider(null);
               setWalletConnected(false);
               setWalletBalance(0);
            } else {
               setAddress(accounts[0]);
            }
         };

         (window as any).ethereum.on('accountsChanged', handleAccountsChanged);

         return () => {
            (window as any).ethereum.removeListener(
               'accountsChanged',
               handleAccountsChanged
            );
         };
      }
   }, [setWalletConnected]);

   return (
      <>
         <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div>
                  <h3 className="text-xl font-semibold mb-4">Stake LOT</h3>
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between items-center mb-1">
                           <Label htmlFor="stake-amount">Stake Amount</Label>
                           {walletConnected && (
                              <span className="text-sm text-gray-600">
                                 Balance: {walletBalance.toFixed(2)} LOT
                              </span>
                           )}
                        </div>
                        <div className="relative">
                           <Input
                              id="stake-amount"
                              placeholder="0.00"
                              value={amount}
                              onChange={handleAmountChange}
                              className="pr-20"
                           />
                           {walletConnected && (
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={() => {
                                       const halfAmount = (
                                          walletBalance / 2
                                       ).toFixed(2);
                                       setAmount(halfAmount);
                                       setSliderValue([50]);
                                    }}
                                 >
                                    Half
                                 </Button>
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={() => {
                                       setAmount(walletBalance.toFixed(2));
                                       setSliderValue([100]);
                                    }}
                                 >
                                    Max
                                 </Button>
                              </div>
                           )}
                        </div>
                     </div>

                     {walletConnected && (
                        <div className="space-y-2">
                           <Slider
                              value={sliderValue}
                              onValueChange={handleSliderChange}
                              max={100}
                              step={1}
                              className="py-4"
                           />
                           <div className="flex justify-between text-xs text-gray-600">
                              <span>0%</span>
                              <span>25%</span>
                              <span>50%</span>
                              <span>75%</span>
                              <span>100%</span>
                           </div>
                        </div>
                     )}

                     <div>
                        <Label htmlFor="period" className="mb-2 block">
                           Staking Period
                        </Label>
                        <Select
                           value={stakingPeriod}
                           onValueChange={setStakingPeriod}
                        >
                           <SelectTrigger id="period">
                              <SelectValue placeholder="Select staking period" />
                           </SelectTrigger>
                           <SelectContent>
                              {stakingOptions.map((option) => (
                                 <SelectItem
                                    key={option.value}
                                    value={option.value}
                                 >
                                    {option.label} - APY: {option.apy}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  {!walletConnected ? (
                     <Button
                        className="w-full mt-6 bg-black hover:bg-black/90 text-white"
                        onClick={handleConnectWallet}
                     >
                        <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                     </Button>
                  ) : (
                     <div className="mt-6 space-y-4">
                        {/* Connected wallet info */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                 Connected Wallet
                              </span>
                              <button
                                 onClick={disconnectWallet}
                                 className="text-red-500 hover:text-red-700 text-sm"
                              >
                                 Disconnect
                              </button>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                                 {address.slice(0, 8)}...{address.slice(-6)}
                              </span>
                              <button
                                 onClick={copyAddress}
                                 className="p-1 hover:bg-gray-200 rounded"
                                 title="Copy address"
                              >
                                 {copiedAddress ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                 ) : (
                                    <Copy className="w-4 h-4 text-gray-500" />
                                 )}
                              </button>
                           </div>
                        </div>

                        <Button
                           className="w-full bg-black hover:bg-black/90 text-white"
                           disabled={
                              !amount || parseFloat(amount) <= 0 || isStaking
                           }
                           onClick={handleStake}
                        >
                           {isStaking ? 'Staking...' : 'Stake LOT'}
                        </Button>
                     </div>
                  )}
               </div>
            </div>

            <div>
               <h3 className="text-xl font-semibold mb-4">Your Staking</h3>
               {!walletConnected ? (
                  <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
                     <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
                        <Wallet className="h-12 w-12 text-gray-400 mb-4" />
                        <h4 className="text-lg font-medium mb-2">
                           Wallet Not Connected
                        </h4>
                        <p className="text-gray-600">
                           Connect your wallet to view your staking details
                        </p>
                     </CardContent>
                  </Card>
               ) : userStakes.length === 0 ? (
                  <Card className="bg-gray-50 border-gray-200">
                     <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                           <Wallet className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-medium mb-2">
                           No Stakes Yet
                        </h4>
                        <p className="text-gray-600 mb-4">
                           You haven't staked any LOT tokens yet
                        </p>
                        <div className="text-sm text-gray-500">
                           <p>Your Balance: {walletBalance.toFixed(2)} LOT</p>
                        </div>
                     </CardContent>
                  </Card>
               ) : (
                  <Card className="bg-gray-50 border-gray-200">
                     <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-600">
                              Total Staked
                           </span>
                           <span className="font-medium">
                              {totalStaked.toFixed(2)} LOT
                           </span>
                        </div>

                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-600">
                              Rewards Earned
                           </span>
                           <span className="font-medium text-green-600">
                              +{totalRewards.toFixed(2)} LOT
                           </span>
                        </div>

                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-600">
                              Available Balance
                           </span>
                           <span className="font-medium">
                              {walletBalance.toFixed(2)} LOT
                           </span>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                           <h4 className="font-medium mb-3">Active Stakes</h4>

                           <div className="space-y-3">
                              {userStakes.map((stake) => (
                                 <div
                                    key={stake.id}
                                    className="p-3 bg-blue-50 rounded-md border border-blue-200"
                                 >
                                    <div className="flex justify-between">
                                       <span>{stake.amount} LOT</span>
                                       <span className="text-blue-600">
                                          {stake.apy} APY
                                       </span>
                                    </div>
                                    <div className="mt-2 flex justify-between text-sm text-gray-600">
                                       <span>{stake.period}</span>
                                       <span>
                                          Unlocks in {stake.daysRemaining} days
                                       </span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               )}
            </div>
         </div>

         {/* Wallet Connection Modal */}
         {showWalletModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ">
               <div className="bg-white rounded-xl shadow-2xl w-full max-w-md h-full overflow-auto ">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                     <h2 className="text-xl font-semibold text-gray-800">
                        Connect Wallet
                     </h2>
                     <button
                        onClick={() => setShowWalletModal(false)}
                        className="p-1 hover:bg-gray-100 rounded"
                     >
                        <X className="w-5 h-5 text-gray-500" />
                     </button>
                  </div>

                  <div className="p-6">
                     {/* Connection Method Tabs */}
                     <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button
                           onClick={() => setConnectionMethod('wallet')}
                           className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                              connectionMethod === 'wallet'
                                 ? 'bg-white text-blue-600 shadow-sm'
                                 : 'text-gray-600 hover:text-gray-800'
                           }`}
                        >
                           Wallet Apps
                        </button>
                        <button
                           onClick={() => setConnectionMethod('manual')}
                           className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                              connectionMethod === 'manual'
                                 ? 'bg-white text-blue-600 shadow-sm'
                                 : 'text-gray-600 hover:text-gray-800'
                           }`}
                        >
                           Manual Entry
                        </button>
                     </div>

                     {connectionMethod === 'wallet' ? (
                        <>
                           {/* Wallet Selection */}
                           <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                 Choose Wallet
                              </label>
                              <div className="grid gap-2">
                                 {WALLETS.map((wallet) => {
                                    const isAvailable =
                                       walletAvailability[wallet.id];
                                    return (
                                       <button
                                          key={wallet.id}
                                          onClick={() =>
                                             setSelectedWallet(wallet.id)
                                          }
                                          className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                                             selectedWallet === wallet.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                          } ${
                                             !isAvailable ? 'opacity-60' : ''
                                          }`}
                                       >
                                          <div className="flex items-center gap-3">
                                             <span className="text-2xl">
                                                {wallet.icon}
                                             </span>
                                             <span className="font-medium text-gray-800">
                                                {wallet.name}
                                             </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                             {isAvailable ? (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                   Installed
                                                </span>
                                             ) : (
                                                <a
                                                   href={wallet.downloadUrl}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                   onClick={(e) =>
                                                      e.stopPropagation()
                                                   }
                                                >
                                                   Install{' '}
                                                   <ExternalLink className="w-3 h-3" />
                                                </a>
                                             )}
                                          </div>
                                       </button>
                                    );
                                 })}
                              </div>
                           </div>

                           {/* Network Selection */}
                           {selectedWallet && (
                              <div className="mb-6">
                                 <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Choose Network
                                 </label>
                                 <select
                                    value={selectedNetwork}
                                    onChange={(e) =>
                                       setSelectedNetwork(e.target.value)
                                    }
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 >
                                    {getNetworkOptions().map((network) => (
                                       <option
                                          key={network.id}
                                          value={network.id}
                                       >
                                          {network.name}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                           )}

                           {/* Connect Button */}
                           <button
                              onClick={() =>
                                 selectedWallet &&
                                 connectToWallet(
                                    selectedWallet,
                                    selectedNetwork
                                 )
                              }
                              disabled={
                                 !selectedWallet ||
                                 isConnecting ||
                                 !walletAvailability[selectedWallet || '']
                              }
                              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                           >
                              {isConnecting ? (
                                 <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Connecting...
                                 </div>
                              ) : (
                                 'Connect Wallet'
                              )}
                           </button>
                        </>
                     ) : (
                        <>
                           {/* Manual Address Entry */}
                           <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                 Choose Network
                              </label>
                              <select
                                 value={selectedNetwork}
                                 onChange={(e) =>
                                    setSelectedNetwork(e.target.value)
                                 }
                                 className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                 {[
                                    ...NETWORKS.ethereum,
                                    ...NETWORKS.solana,
                                 ].map((network) => (
                                    <option key={network.id} value={network.id}>
                                       {network.name}
                                    </option>
                                 ))}
                              </select>
                           </div>

                           <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                 Wallet Address
                              </label>
                              <input
                                 type="text"
                                 value={manualAddress}
                                 onChange={(e) =>
                                    setManualAddress(e.target.value)
                                 }
                                 placeholder="Enter your wallet address..."
                                 className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                              />
                              <p className="text-xs text-gray-500 mt-2">
                                 Enter your wallet address to connect in
                                 read-only mode. This allows you to view your
                                 portfolio without signing transactions.
                              </p>
                           </div>

                           {/* Manual Connect Button */}
                           <button
                              onClick={connectManually}
                              disabled={!manualAddress.trim()}
                              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                           >
                              Connect Address
                           </button>
                        </>
                     )}

                     {/* Footer with security notice */}
                     <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                           <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                           <span>
                              Secure connection with industry-standard
                              encryption
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default StakingPanel;
