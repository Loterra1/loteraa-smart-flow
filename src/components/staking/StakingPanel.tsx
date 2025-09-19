import { useState, useEffect, useCallback } from 'react';
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
import { Copy, Check, Wallet, RefreshCw } from 'lucide-react';
import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   Tooltip,
   Legend,
} from 'recharts';

import { useAuth } from '@/contexts/AuthContext';
import EnhancedWalletModal from './WalletModal';
import Modal from '@/utils/Modal';
import api from '@/utils/api';

interface StakeEntry {
   id: string;
   amount: number;
   period: string;
   apy: string;
   unlockDate: string;
   daysRemaining: number;
   status: 'active' | 'completed' | 'pending';
   rewardsEarned: number;
   startDate: string;
   transactionHash?: string;
}

interface StakingStats {
   totalStaked: number;
   totalRewards: number;
   activeStakes: number;
   completedStakes: number;
   pendingRewards: number;
}

const stakingOptions = [
   { value: '4weeks', label: '4 Weeks', apy: '3%', days: 28 },
   { value: '8weeks', label: '8 Weeks', apy: '5%', days: 56 },
   { value: '12weeks', label: '12 Weeks', apy: '7%', days: 84 },
   { value: '4months', label: '4 Months', apy: '9%', days: 120 },
];

const COLORS = ['#8b5cf6', '#10b981', '#3b82f6'];

const StakingPanel = () => {
   const { walletAddress, user, lotBalance, refreshBalance } = useAuth();
   const [amount, setAmount] = useState('');
   const [stakingPeriod, setStakingPeriod] = useState('4weeks');
   const [isStaking, setIsStaking] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [sliderValue, setSliderValue] = useState([50]);
   const [userStakes, setUserStakes] = useState<StakeEntry[]>([]);
   const [stakingStats, setStakingStats] = useState<StakingStats>({
      totalStaked: 0,
      totalRewards: 0,
      activeStakes: 0,
      completedStakes: 0,
      pendingRewards: 0,
   });
   const [showWalletModal, setShowWalletModal] = useState(false);
   const [copiedAddress, setCopiedAddress] = useState(false);
   const [lastRefresh, setLastRefresh] = useState(Date.now());

   const walletConnected = !!walletAddress;
   const selectedOption = stakingOptions.find(
      (option) => option.value === stakingPeriod
   );

   // Fetch user staking data from backend
   const fetchStakingData = useCallback(async () => {
      if (!user?.id) return;

      try {
         setIsLoading(true);
         const response = await api.get(
            `/staking/user-stakes?userId=${user.id}`
         );

         if (response.data && response.data.success) {
            const { stakes, stats } = response.data.data;

            // Transform stakes data
            const transformedStakes: StakeEntry[] = stakes.map((stake) => ({
               id: stake.id,
               amount: Number(stake.amount),
               period: stake.period_label || stake.period,
               apy: stake.apy || '0%',
               unlockDate: new Date(stake.unlock_date).toLocaleDateString(),
               daysRemaining: Math.max(
                  0,
                  Math.ceil(
                     (new Date(stake.unlock_date).getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                  )
               ),
               status: stake.status,
               rewardsEarned: Number(stake.rewards_earned || 0),
               startDate: new Date(stake.created_at).toLocaleDateString(),
               transactionHash: stake.transaction_hash,
            }));

            setUserStakes(transformedStakes);
            setStakingStats({
               totalStaked: Number(stats.totalStaked || 0),
               totalRewards: Number(stats.totalRewards || 0),
               activeStakes: Number(stats.activeStakes || 0),
               completedStakes: Number(stats.completedStakes || 0),
               pendingRewards: Number(stats.pendingRewards || 0),
            });
         }
      } catch (error) {
         console.error('Error fetching staking data:', error);
         toast({
            title: 'Error loading data',
            description: 'Failed to load your staking information',
            variant: 'destructive',
         });
      } finally {
         setIsLoading(false);
         setLastRefresh(Date.now());
      }
   }, [user?.id]);

   // Claim rewards for completed stakes
   const claimRewards = useCallback(
      async (stakeId: string) => {
         if (!user?.id) return;

         try {
            const response = await api.post(`/staking/claim-rewards`, {
               userId: user.id,
               stakeId: stakeId,
            });

            if (response.data && response.data.success) {
               toast({
                  title: 'Rewards claimed!',
                  description: `Successfully claimed ${response.data.data.rewardsAmount} LOT tokens`,
               });

               // Refresh data
               await fetchStakingData();
               await refreshBalance();
            }
         } catch (error) {
            console.error('Error claiming rewards:', error);
            toast({
               title: 'Failed to claim rewards',
               description:
                  error.response?.data?.message ||
                  'An error occurred while claiming rewards',
               variant: 'destructive',
            });
         }
      },
      [user?.id, fetchStakingData, refreshBalance]
   );

   // Unstake tokens (for completed stakes)
   const unstakeTokens = useCallback(
      async (stakeId: string) => {
         if (!user?.id) return;

         try {
            const response = await api.post(`/staking/unstake`, {
               userId: user.id,
               stakeId: stakeId,
            });

            if (response.data && response.data.success) {
               toast({
                  title: 'Unstaked successfully!',
                  description: `Successfully unstaked ${response.data.data.amount} LOT tokens`,
               });

               // Refresh data
               await fetchStakingData();
               await refreshBalance();
            }
         } catch (error) {
            console.error('Error unstaking:', error);
            toast({
               title: 'Failed to unstake',
               description:
                  error.response?.data?.message ||
                  'An error occurred while unstaking',
               variant: 'destructive',
            });
         }
      },
      [user?.id, fetchStakingData, refreshBalance]
   );

   // Load staking data on mount and when user changes
   useEffect(() => {
      if (user?.id && walletConnected) {
         fetchStakingData();
      }
   }, [user?.id, walletConnected, fetchStakingData]);

   // Auto-refresh every 30 seconds for active stakes
   useEffect(() => {
      if (!user?.id || !walletConnected || userStakes.length === 0) return;

      const activeStakesExist = userStakes.some(
         (stake) => stake.status === 'active'
      );

      if (activeStakesExist) {
         const interval = setInterval(() => {
            fetchStakingData();
         }, 30000); // 30 seconds

         return () => clearInterval(interval);
      }
   }, [user?.id, walletConnected, userStakes, fetchStakingData]);

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

   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Allow only numbers and decimal points
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
         setAmount(value);
      }
   };

   const handleSliderChange = (value: number[]) => {
      setSliderValue(value);
      if (walletConnected && lotBalance > 0) {
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
         const response = await api.post('/onchain/stake-token', {
            userId: user.id,
            amount: stakeAmount,
            poolId: 1,
         });

         if (response.data && response.data.success) {
            toast({
               title: 'Staked successfully!',
               description: `You have staked ${amount} LOT for ${selectedOption?.label} at ${selectedOption?.apy} APY`,
            });

            // Reset form
            setAmount('');
            setSliderValue([0]);

            // Refresh data
            await fetchStakingData();
            await refreshBalance();
         }
      } catch (error) {
         console.error('Error staking tokens:', error);
         toast({
            title: 'Staking failed',
            description:
               error.response?.data?.message ||
               'There was an error processing your staking request',
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
         value: stakingStats.totalStaked,
         color: COLORS[0],
      },
      {
         name: 'Rewards Earned',
         value: stakingStats.totalRewards,
         color: COLORS[1],
      },
      {
         name: 'Available Balance',
         value: lotBalance,
         color: COLORS[2],
      },
   ].filter((item) => item.value > 0);

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
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Stake LOT</h3>
                  {walletConnected && (
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchStakingData}
                        disabled={isLoading}
                     >
                        <RefreshCw
                           className={`h-4 w-4 mr-2 ${
                              isLoading ? 'animate-spin' : ''
                           }`}
                        />
                        Refresh
                     </Button>
                  )}
               </div>

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
                        disabled={!walletConnected}
                     />
                  </div>

                  {walletConnected && lotBalance > 0 && (
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
                     <Wallet className="mr-2 h-4 w-4" /> Create Wallet
                  </Button>
               ) : (
                  <div className="mt-6 space-y-4">
                     <div className="bg-black text-white p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-sm font-medium">
                              Wallet Connected
                           </span>
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
                           !amount ||
                           parseFloat(amount) <= 0 ||
                           isStaking ||
                           lotBalance <= 0
                        }
                        onClick={handleStake}
                     >
                        {isStaking ? 'Staking...' : 'Stake LOT'}
                     </Button>
                  </div>
               )}
            </div>

            {/* Chart and Portfolio Section */}
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
               ) : isLoading ? (
                  <Card>
                     <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
                        <RefreshCw className="h-8 w-8 text-gray-400 mb-4 animate-spin" />
                        <h4 className="text-lg font-medium mb-2">Loading...</h4>
                        <p className="text-gray-600">
                           Fetching your staking information
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
                        {chartData.length > 0 && (
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
                        )}

                        {/* Stats */}
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
                                 {stakingStats.totalStaked.toFixed(2)} LOT
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                 <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[1] }}
                                 ></div>
                                 <span className="text-sm">Total Rewards</span>
                              </div>
                              <span className="font-medium text-green-600">
                                 +{stakingStats.totalRewards.toFixed(2)} LOT
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
                                    stakingStats.totalStaked +
                                    stakingStats.totalRewards +
                                    lotBalance
                                 ).toFixed(2)}{' '}
                                 LOT
                              </span>
                           </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-center">
                           <div>
                              <div className="text-2xl font-bold text-purple-600">
                                 {stakingStats.activeStakes}
                              </div>
                              <div className="text-sm text-gray-600">
                                 Active Stakes
                              </div>
                           </div>
                           <div>
                              <div className="text-2xl font-bold text-green-600">
                                 {stakingStats.pendingRewards.toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-600">
                                 Pending Rewards
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               )}
            </div>
         </div>

         {/* Active Stakes List */}
         {walletConnected && userStakes.length > 0 && (
            <div className="mt-8">
               <h3 className="text-xl font-semibold mb-4">Your Stakes</h3>
               <div className="grid gap-4">
                  {userStakes.map((stake) => (
                     <Card key={stake.id}>
                        <CardContent className="p-4">
                           <div className="flex justify-between items-start">
                              <div>
                                 <div className="font-medium">
                                    {stake.amount} LOT
                                 </div>
                                 <div className="text-sm text-gray-600">
                                    {stake.period} • {stake.apy} APY
                                 </div>
                                 <div className="text-xs text-gray-500">
                                    Started: {stake.startDate}
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div
                                    className={`text-sm font-medium ${
                                       stake.status === 'active'
                                          ? 'text-blue-600'
                                          : stake.status === 'completed'
                                          ? 'text-green-600'
                                          : 'text-yellow-600'
                                    }`}
                                 >
                                    {stake.status.charAt(0).toUpperCase() +
                                       stake.status.slice(1)}
                                 </div>
                                 <div className="text-xs text-gray-500">
                                    {stake.status === 'active'
                                       ? `${stake.daysRemaining} days left`
                                       : `Unlocked: ${stake.unlockDate}`}
                                 </div>
                                 {stake.rewardsEarned > 0 && (
                                    <div className="text-sm text-green-600 mt-1">
                                       +{stake.rewardsEarned.toFixed(2)} LOT
                                       earned
                                    </div>
                                 )}
                              </div>
                           </div>

                           {stake.status === 'completed' &&
                              stake.rewardsEarned > 0 && (
                                 <div className="mt-3 flex gap-2">
                                    <Button
                                       size="sm"
                                       variant="outline"
                                       onClick={() => claimRewards(stake.id)}
                                    >
                                       Claim Rewards
                                    </Button>
                                    <Button
                                       size="sm"
                                       variant="outline"
                                       onClick={() => unstakeTokens(stake.id)}
                                    >
                                       Unstake
                                    </Button>
                                 </div>
                              )}
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         )}

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
