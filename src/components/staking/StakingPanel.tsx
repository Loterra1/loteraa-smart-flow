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
import { Copy, Check, Wallet, Loader2 } from 'lucide-react';
import EnhancedWalletModal from './WalletModal';
import Modal from '@/utils/Modal';
import { ethers } from 'ethers';
import { useAuth } from '@/contexts/AuthContext';
import { useLoteraaDePINContext } from '@/contexts/LoteraaDePINContext';

interface StakeEntry {
   id: string;
   amount: number;
   period: string;
   apy: string;
   unlockDate: string;
   daysRemaining: number;
}

const stakingOptions = [
   { value: '4weeks', label: '4 Weeks', apy: '12.5%', poolId: 0 },
   { value: '8weeks', label: '8 Weeks', apy: '16.8%', poolId: 1 },
   { value: '12weeks', label: '12 Weeks', apy: '21.3%', poolId: 2 },
   { value: '4months', label: '4 Months', apy: '27.5%', poolId: 3 },
];

const StakingPanel = () => {
   // Hooks
   const {
      account,
      balances,
      connectWallet,
      stakeTokens,
      getUserStakes,
      STAKING_POOLS,
   } = useLoteraaDePINContext();

   // State
   const { setWalletAddress, walletAddress } = useAuth();
   const [amount, setAmount] = useState('');
   const [stakingPeriod, setStakingPeriod] = useState('4weeks');
   const [isStaking, setIsStaking] = useState(false);
   const [sliderValue, setSliderValue] = useState([50]);
   const [userStakes, setUserStakes] = useState<StakeEntry[]>([]);
   const [totalStaked, setTotalStaked] = useState(0);
   const [totalRewards, setTotalRewards] = useState(0);
   const [showWalletModal, setShowWalletModal] = useState(false);
   const [copiedAddress, setCopiedAddress] = useState(false);
   const [loading, setLoading] = useState(false);

   // Get wallet balance from context
   const walletBalance = parseFloat(balances.lot) || 0;
   const walletConnected = !!account;

   const selectedOption = stakingOptions.find(
      (option) => option.value === stakingPeriod
   );

   // Load user stakes
   const loadUserStakes = async () => {
      if (!walletConnected) return;

      setLoading(true);
      try {
         const userStakes = await getUserStakes();
         setUserStakes(userStakes as []);
      } catch (error) {
         console.error('Error loading user stakes:', error);
         toast({
            title: 'Error',
            description: 'Failed to load staking data',
            variant: 'destructive',
         });
      } finally {
         setLoading(false);
      }
   };

   // Connect wallet handler
   const handleConnectWallet = async () => {
      try {
         const result = await connectWallet();
         if (result.success && result.address) {
            toast({
               title: 'Wallet Connected',
               description: `Connected to ${result.address.slice(
                  0,
                  8
               )}...${result.address.slice(-6)}`,
            });
            setShowWalletModal(false);
         } else {
            toast({
               title: 'Connection Failed',
               description: result.error || 'Failed to connect wallet',
               variant: 'destructive',
            });
         }
      } catch (error) {
         console.error('Wallet connection error:', error);
         toast({
            title: 'Connection Error',
            description: 'An error occurred while connecting wallet',
            variant: 'destructive',
         });
      }
   };

   // Disconnect wallet
   const disconnectWallet = () => {
      setWalletAddress('');
      setUserStakes([]);
      toast({
         title: 'Wallet Disconnected',
         description: 'Successfully disconnected from wallet',
      });
   };

   // Copy wallet address
   const copyAddress = async () => {
      if (account) {
         await navigator.clipboard.writeText(account);
         setCopiedAddress(true);
         setTimeout(() => setCopiedAddress(false), 2000);

         toast({
            title: 'Address Copied',
            description: 'Wallet address copied to clipboard',
         });
      }
   };

   // Calculate totals
   useEffect(() => {
      const total = userStakes.reduce((sum, stake) => sum + stake.amount, 0);
      setTotalStaked(total);

      const rewards = userStakes.reduce((sum, stake) => {
         const apyNumber = parseFloat(stake.apy.replace('%', ''));
         return sum + (stake.amount * apyNumber) / 100 / 12;
      }, 0);
      setTotalRewards(rewards);
   }, [userStakes]);

   // Handle amount input change
   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Only allow numbers and decimals
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
         setAmount(value);

         // Update slider based on amount
         if (walletBalance > 0 && value) {
            const percentage = (parseFloat(value) / walletBalance) * 100;
            setSliderValue([Math.min(100, Math.max(0, percentage))]);
         }
      }
   };

   // Handle slider change
   const handleSliderChange = (value: number[]) => {
      setSliderValue(value);
      if (walletConnected && walletBalance > 0) {
         const calculatedAmount = ((walletBalance * value[0]) / 100).toFixed(6);
         setAmount(calculatedAmount);
      }
   };

   // Handle staking
   const handleStake = async () => {
      if (!amount || parseFloat(amount) <= 0) {
         toast({
            title: 'Invalid Amount',
            description: 'Please enter a valid amount to stake',
            variant: 'destructive',
         });
         return;
      }

      const stakeAmount = parseFloat(amount);
      if (stakeAmount > walletBalance) {
         toast({
            title: 'Insufficient Balance',
            description: "You don't have enough LOT tokens",
            variant: 'destructive',
         });
         return;
      }

      if (!selectedOption) {
         toast({
            title: 'Invalid Selection',
            description: 'Please select a staking period',
            variant: 'destructive',
         });
         return;
      }

      setIsStaking(true);

      try {
         // Convert amount to wei and handle bigint properly
         const amountWei = ethers.parseEther(amount.toString());

         // Convert bigint to number for the stakeTokens function
         const result = await stakeTokens(amountWei, selectedOption.poolId);

         if (result.success) {
            toast({
               title: 'Staking Successful',
               description: `Successfully staked ${amount} LOT for ${selectedOption.label}`,
            });

            // Reset form
            setAmount('');
            setSliderValue([0]);

            // Reload user stakes
            await loadUserStakes();
         } else {
            toast({
               title: 'Staking Failed',
               description: result.error || 'Failed to stake tokens',
               variant: 'destructive',
            });
         }
      } catch (error) {
         console.error('Staking error:', error);
         toast({
            title: 'Staking Error',
            description: 'An error occurred while staking',
            variant: 'destructive',
         });
      } finally {
         setIsStaking(false);
      }
   };

   // Load user stakes when wallet connects
   useEffect(() => {
      if (account) {
         loadUserStakes();
      }
   }, [account]);

   console.log('wallet address', walletAddress);

   return (
      <>
         <div className="grid md:grid-cols-2 gap-8">
            {/* Staking Section */}
            <div className="space-y-6">
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
                     <Input
                        id="stake-amount"
                        placeholder="0.00"
                        value={amount}
                        onChange={handleAmountChange}
                        disabled={!walletConnected}
                        className="pr-20"
                     />
                  </div>

                  {walletConnected && (
                     <div className="space-y-2">
                        <Slider
                           value={sliderValue}
                           onValueChange={handleSliderChange}
                           max={100}
                           step={1}
                           className="py-4"
                           disabled={walletBalance === 0}
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
                        disabled={!walletConnected}
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
                     onClick={() => setShowWalletModal(true)}
                  >
                     <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                  </Button>
               ) : (
                  <div className="mt-6 space-y-4">
                     <div className="bg-black text-white p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-sm font-medium">
                              Connected Wallet
                           </span>
                           <button
                              onClick={disconnectWallet}
                              className="text-red-400 hover:text-red-300 text-sm"
                           >
                              Disconnect
                           </button>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="font-mono text-sm bg-gray-800 text-white px-2 py-1 rounded">
                              {account.slice(0, 8)}...{account.slice(-6)}
                           </span>
                           <button
                              onClick={copyAddress}
                              className="p-1 hover:bg-gray-700 rounded"
                              title="Copy address"
                           >
                              {copiedAddress ? (
                                 <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                 <Copy className="w-4 h-4 text-gray-400" />
                              )}
                           </button>
                        </div>
                     </div>

                     <Button
                        className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
                        disabled={
                           !amount ||
                           parseFloat(amount) <= 0 ||
                           isStaking ||
                           parseFloat(amount) > walletBalance
                        }
                        onClick={handleStake}
                     >
                        {isStaking ? (
                           <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Staking...
                           </>
                        ) : (
                           'Stake LOT'
                        )}
                     </Button>
                  </div>
               )}
            </div>

            {/* User Stakes */}
            <div>
               <h3 className="text-xl font-semibold mb-4">Your Staking</h3>
               {!walletConnected ? (
                  <Card>
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
               ) : loading ? (
                  <Card>
                     <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-4" />
                        <p className="text-gray-600">Loading staking data...</p>
                     </CardContent>
                  </Card>
               ) : userStakes.length === 0 ? (
                  <Card>
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
                     </CardContent>
                  </Card>
               ) : (
                  <div className="space-y-4">
                     <Card>
                        <CardContent className="p-6 space-y-4">
                           <div className="flex justify-between items-center">
                              <span>Total Staked</span>
                              <span className="font-medium">
                                 {totalStaked.toFixed(2)} LOT
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span>Rewards Earned</span>
                              <span className="font-medium text-green-600">
                                 +{totalRewards.toFixed(2)} LOT
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span>Available Balance</span>
                              <span className="font-medium">
                                 {walletBalance.toFixed(2)} LOT
                              </span>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Individual Stakes */}
                     <div className="space-y-2">
                        {userStakes.map((stake) => (
                           <Card key={stake.id}>
                              <CardContent className="p-4">
                                 <div className="flex justify-between items-start">
                                    <div>
                                       <div className="font-medium">
                                          {stake.amount.toFixed(2)} LOT
                                       </div>
                                       <div className="text-sm text-gray-600">
                                          {stake.period} • APY: {stake.apy}
                                       </div>
                                       <div className="text-xs text-gray-500">
                                          Unlock: {stake.unlockDate}
                                       </div>
                                    </div>
                                    <div className="text-right">
                                       <div className="text-sm font-medium text-green-600">
                                          {stake.daysRemaining} days left
                                       </div>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* Wallet Modal */}
         <Modal
            open={showWalletModal}
            onClose={() => setShowWalletModal(false)}
         >
            <EnhancedWalletModal
               onClose={() => setShowWalletModal(false)}
               onConnect={handleConnectWallet}
            />
         </Modal>
      </>
   );
};

export default StakingPanel;
