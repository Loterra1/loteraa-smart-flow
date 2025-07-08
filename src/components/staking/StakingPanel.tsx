
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Wallet } from "lucide-react";

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
  { value: "4weeks", label: "4 Weeks", apy: "12.5%" },
  { value: "8weeks", label: "8 Weeks", apy: "16.8%" },
  { value: "12weeks", label: "12 Weeks", apy: "21.3%" },
  { value: "4months", label: "4 Months", apy: "27.5%" },
];

const StakingPanel = ({ walletConnected, setWalletConnected }: StakingPanelProps) => {
  const [amount, setAmount] = useState("");
  const [stakingPeriod, setStakingPeriod] = useState("4weeks");
  const [isStaking, setIsStaking] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [userStakes, setUserStakes] = useState<StakeEntry[]>([]);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  
  const selectedOption = stakingOptions.find(option => option.value === stakingPeriod);
  
  // Calculate total staked amount
  useEffect(() => {
    const total = userStakes.reduce((sum, stake) => sum + stake.amount, 0);
    setTotalStaked(total);
    
    // Calculate total rewards (simplified calculation)
    const rewards = userStakes.reduce((sum, stake) => {
      const apyNumber = parseFloat(stake.apy.replace('%', ''));
      return sum + (stake.amount * apyNumber / 100 / 12); // Monthly rewards approximation
    }, 0);
    setTotalRewards(rewards);
  }, [userStakes]);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (walletConnected) {
      const calculatedAmount = (walletBalance * value[0] / 100).toFixed(2);
      setAmount(calculatedAmount);
    }
  };
  
  const handleConnectWallet = () => {
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to your wallet",
    });
    setWalletConnected(true);
    setWalletBalance(1000); // Set balance when wallet connects
  };
  
  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive",
      });
      return;
    }
    
    const stakeAmount = parseFloat(amount);
    if (stakeAmount > walletBalance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough LOT tokens",
        variant: "destructive",
      });
      return;
    }
    
    setIsStaking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update wallet balance
      setWalletBalance(prev => prev - stakeAmount);
      
      // Add new stake entry
      const newStake: StakeEntry = {
        id: Date.now().toString(),
        amount: stakeAmount,
        period: selectedOption?.label || "",
        apy: selectedOption?.apy || "",
        unlockDate: new Date(Date.now() + (4 * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString(), // 4 weeks from now
        daysRemaining: 28 // Example days
      };
      
      setUserStakes(prev => [...prev, newStake]);
      
      toast({
        title: "Staked successfully",
        description: `You have staked ${amount} LOT for ${selectedOption?.label}`,
      });
      
      setAmount("");
      setSliderValue([0]);
    } catch (error) {
      toast({
        title: "Staking failed",
        description: "There was an error processing your staking request",
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Stake LOT</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="stake-amount">Stake Amount</Label>
                {walletConnected && (
                  <span className="text-sm text-white/70">
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
                        const halfAmount = (walletBalance / 2).toFixed(2);
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
                <div className="flex justify-between text-xs text-white/70">
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
                    <SelectItem key={option.value} value={option.value}>
                      {option.label} - APY: {option.apy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {!walletConnected ? (
            <Button 
              className="w-full mt-6 bg-loteraa-purple hover:bg-loteraa-purple/90"
              onClick={handleConnectWallet}
            >
              <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
            </Button>
          ) : (
            <Button 
              className="w-full mt-6 bg-loteraa-purple hover:bg-loteraa-purple/90" 
              disabled={!amount || parseFloat(amount) <= 0 || isStaking}
              onClick={handleStake}
            >
              {isStaking ? "Staking..." : "Stake LOT"}
            </Button>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Staking</h3>
        {!walletConnected ? (
          <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
              <Wallet className="h-12 w-12 text-white/50 mb-4" />
              <h4 className="text-lg font-medium mb-2">Wallet Not Connected</h4>
              <p className="text-white/70">Connect your wallet to view your staking details</p>
            </CardContent>
          </Card>
        ) : userStakes.length === 0 ? (
          <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
              <div className="w-12 h-12 rounded-full bg-loteraa-purple/20 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-loteraa-purple" />
              </div>
              <h4 className="text-lg font-medium mb-2">No Stakes Yet</h4>
              <p className="text-white/70 mb-4">You haven't staked any LOT tokens yet</p>
              <div className="text-sm text-white/50">
                <p>Your Balance: {walletBalance.toFixed(2)} LOT</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Total Staked</span>
                <span className="font-medium">{totalStaked.toFixed(2)} LOT</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Rewards Earned</span>
                <span className="font-medium text-green-500">+{totalRewards.toFixed(2)} LOT</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Available Balance</span>
                <span className="font-medium">{walletBalance.toFixed(2)} LOT</span>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-medium mb-3">Active Stakes</h4>
                
                <div className="space-y-3">
                  {userStakes.map((stake) => (
                    <div key={stake.id} className="p-3 bg-loteraa-purple/10 rounded-md border border-loteraa-purple/20">
                      <div className="flex justify-between">
                        <span>{stake.amount} LOT</span>
                        <span className="text-loteraa-purple">{stake.apy} APY</span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm text-white/70">
                        <span>{stake.period}</span>
                        <span>Unlocks in {stake.daysRemaining} days</span>
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
  );
};

export default StakingPanel;
