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
import { Copy, Check, Wallet } from 'lucide-react';
import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   Tooltip,
   Legend,
} from 'recharts';

import { ethers } from 'ethers';
import { useAuth } from '@/contexts/AuthContext';
import EnhancedWalletModal from './WalletModal';
import Modal from '@/utils/Modal';

// Mock toast function
const mockToast = ({ title, description, variant }) => {
   console.log(`${title}: ${description}`);
};

interface StakeEntry {
   id: string;
   amount: number;
   period: string;
   apy: string;
   unlockDate: string;
   daysRemaining: number;
}

const stakingOptions = [
   { value: '4weeks', label: '4 Weeks', apy: '3%' },
   { value: '8weeks', label: '8 Weeks', apy: '5%' },
   { value: '12weeks', label: '12 Weeks', apy: '7%' },
   { value: '4months', label: '4 Months', apy: '9%' },
];

const COLORS = ['#8b5cf6', '#10b981', '#3b82f6'];

const StakingPanel = () => {
   const { walletAddress, setWalletAddress, lotBalance } = useAuth();
   const [amount, setAmount] = useState('');
   const [stakingPeriod, setStakingPeriod] = useState('4weeks');
   const [isStaking, setIsStaking] = useState(false);
   const [sliderValue, setSliderValue] = useState([50]);
   const [userStakes, setUserStakes] = useState<StakeEntry[]>([
      // Sample data for demonstration
      // {
      //    id: '1',
      //    amount: 500,
      //    period: '4 Weeks',
      //    apy: '3%',
      //    unlockDate: '2025-10-15',
      //    daysRemaining: 20,
      // },
      // {
      //    id: '2',
      //    amount: 300,
      //    period: '8 Weeks',
      //    apy: '5%',
      //    unlockDate: '2025-11-20',
      //    daysRemaining: 55,
      // },
   ]);
   const [totalStaked, setTotalStaked] = useState(0);
   const [totalRewards, setTotalRewards] = useState(0);
   const [showWalletModal, setShowWalletModal] = useState(false);
   const [copiedAddress, setCopiedAddress] = useState(false);

   const walletConnected = !!walletAddress;
   const selectedOption = stakingOptions.find(
      (option) => option.value === stakingPeriod
   );

   const disconnectWallet = () => {
      // setWalletAddress('');
      setUserStakes([]);
      toast({
         title: 'Wallet Disconnected',
         description: 'Successfully disconnected from wallet',
      });
   };

   const copyAddress = async () => {
      if (walletAddress) {
         await navigator.clipboard.writeText(walletAddress);
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

   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value);
   };

   const handleSliderChange = (value: number[]) => {
      setSliderValue(value);
      if (walletConnected) {
         const calculatedAmount = ((lotBalance * value[0]) / 100).toFixed(2);
         setAmount(calculatedAmount);
      }
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
      if (stakeAmount > lotBalance) {
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

   // Prepare chart data
   const chartData = [
      {
         name: 'Total Staked',
         value: totalStaked,
         color: COLORS[0],
      },
      {
         name: 'Rewards Earned',
         value: totalRewards,
         color: COLORS[1],
      },
      {
         name: 'Available Balance',
         value: lotBalance,
         color: COLORS[2],
      },
   ];

   const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
         return (
            <div className="bg-white p-3 border rounded-lg shadow-lg">
               <p className="font-medium">{payload[0].name}</p>
               <p
                  className="text-lg font-bold"
                  style={{ color: payload[0].payload.color }}
               >
                  {payload[0].value.toFixed(2)} LOT
               </p>
            </div>
         );
      }
      return null;
   };

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
                              Balance: {lotBalance.toFixed(2)} LOT
                           </span>
                        )}
                     </div>
                     <Input
                        id="stake-amount"
                        placeholder="0.00"
                        value={amount}
                        onChange={handleAmountChange}
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
                     onClick={() => setShowWalletModal(true)}
                  >
                     <Wallet className="mr-2 h-4 w-4" /> Create Wallet
                  </Button>
               ) : (
                  <div className="mt-6 space-y-4">
                     <div className="bg-black text-white p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-sm font-medium">
                              Wallet Connected
                           </span>
                           {/* <button
                              onClick={disconnectWallet}
                              className="text-red-500 hover:text-red-700 text-sm"
                           >
                              Disconnect
                           </button> */}
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="font-mono text-sm bg-gray-800 text-white px-2 py-1 rounded">
                              {walletAddress.slice(0, 8)}...
                              {walletAddress.slice(-6)}
                           </span>
                           <button
                              onClick={copyAddress}
                              className="p-1 hover:bg-gray-700 rounded"
                              title="Copy address"
                           >
                              {copiedAddress ? (
                                 <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                 <Copy className="w-4 h-4 text-gray-300" />
                              )}
                           </button>
                        </div>
                     </div>

                     <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
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

            {/* Chart Section - Updated */}
            <div>
               <h3 className="text-xl font-semibold mb-4">
                  Your Staking Portfolio
               </h3>
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
                  <Card>
                     <CardContent className="p-6">
                        {/* Chart */}
                        <div className="h-[12.5rem] mb-6">
                           <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                 <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                 >
                                    {chartData.map((entry, index) => (
                                       <Cell
                                          key={`cell-${index}`}
                                          fill={entry.color}
                                       />
                                    ))}
                                 </Pie>
                                 <Tooltip
                                    content={
                                       <CustomTooltip
                                          active={undefined}
                                          payload={undefined}
                                       />
                                    }
                                 />
                              </PieChart>
                           </ResponsiveContainer>
                        </div>

                        {/* Legend with Values */}
                        <div className="space-y-3">
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                 <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[0] }}
                                 ></div>
                                 <span className="text-sm">Total Staked</span>
                              </div>
                              <span className="font-medium">
                                 {totalStaked.toFixed(2)} LOT
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                 <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[1] }}
                                 ></div>
                                 <span className="text-sm">Rewards Earned</span>
                              </div>
                              <span className="font-medium text-green-600">
                                 +{totalRewards.toFixed(2)} LOT
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                 <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[2] }}
                                 ></div>
                                 <span className="text-sm">
                                    Available Balance
                                 </span>
                              </div>
                              <span className="font-medium">
                                 {lotBalance.toFixed(2)} LOT
                              </span>
                           </div>
                        </div>

                        {/* Total Portfolio Value */}
                        <div className="mt-4 pt-4 border-t">
                           <div className="flex justify-between items-center">
                              <span className="font-semibold">
                                 Total Portfolio Value
                              </span>
                              <span className="font-bold text-lg">
                                 {(
                                    totalStaked +
                                    totalRewards +
                                    lotBalance
                                 ).toFixed(2)}{' '}
                                 LOT
                              </span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               )}
            </div>
         </div>

         {/* Wallet Modal */}
         <Modal
            open={showWalletModal}
            onClose={() => setShowWalletModal(false)}
         >
            <EnhancedWalletModal onClose={() => setShowWalletModal(false)} />
         </Modal>
      </>
   );
};

export default StakingPanel;
