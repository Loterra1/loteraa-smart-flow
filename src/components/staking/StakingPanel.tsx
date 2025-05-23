
import { useState } from "react";
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

const stakingOptions = [
  { value: "4weeks", label: "4 Weeks", apy: "12.5%" },
  { value: "8weeks", label: "8 Weeks", apy: "16.8%" },
  { value: "12weeks", label: "12 Weeks", apy: "21.3%" },
  { value: "4months", label: "4 Months", apy: "27.5%" },
];

const StakingPanel = () => {
  const [amount, setAmount] = useState("");
  const [stakingPeriod, setStakingPeriod] = useState("4weeks");
  const [isStaking, setIsStaking] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  
  const currentBalance = 1000; // Mocked balance
  const selectedOption = stakingOptions.find(option => option.value === stakingPeriod);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setAmount(((value[0] / 100) * currentBalance).toFixed(2));
  };
  
  const handleMax = () => {
    setAmount(currentBalance.toString());
    setSliderValue([100]);
  };
  
  const handleHalf = () => {
    setAmount((currentBalance / 2).toString());
    setSliderValue([50]);
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
    
    setIsStaking(true);
    
    // Simulate staking operation
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Staked successfully",
        description: `You have staked ${amount} TERRA for ${selectedOption?.label}`,
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
          <h3 className="text-xl font-semibold mb-4">Stake TERRA</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="stake-amount">Stake Amount</Label>
                <span className="text-sm text-white/70">
                  Balance: {currentBalance} TERRA
                </span>
              </div>
              <div className="relative">
                <Input
                  id="stake-amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-6 text-xs"
                    onClick={handleHalf}
                  >
                    Half
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-6 text-xs"
                    onClick={handleMax}
                  >
                    Max
                  </Button>
                </div>
              </div>
            </div>
            
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
          
          <Button 
            className="w-full mt-6 bg-loteraa-purple hover:bg-loteraa-purple/90" 
            disabled={!amount || parseFloat(amount) <= 0 || isStaking}
            onClick={handleStake}
          >
            {isStaking ? "Staking..." : "Stake TERRA"}
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Staking</h3>
        <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Total Staked</span>
              <span className="font-medium">250 TERRA</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Rewards Earned</span>
              <span className="font-medium text-green-500">+12.35 TERRA</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Current APY</span>
              <span className="font-medium text-loteraa-purple">18.5%</span>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <h4 className="font-medium mb-3">Active Stakes</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-loteraa-purple/10 rounded-md border border-loteraa-purple/20">
                  <div className="flex justify-between">
                    <span>150 TERRA</span>
                    <span className="text-loteraa-purple">16.8% APY</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-white/70">
                    <span>8 Weeks</span>
                    <span>Unlocks in 32 days</span>
                  </div>
                </div>
                
                <div className="p-3 bg-loteraa-purple/10 rounded-md border border-loteraa-purple/20">
                  <div className="flex justify-between">
                    <span>100 TERRA</span>
                    <span className="text-loteraa-purple">21.3% APY</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-white/70">
                    <span>12 Weeks</span>
                    <span>Unlocks in 68 days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StakingPanel;
