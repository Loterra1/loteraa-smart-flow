
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Wallet, BarChart } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import { useToast } from "@/hooks/use-toast";

interface DatasetEntry {
  id: string;
  name: string;
  accessCount: number;
  earnings: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
}

interface DeviceEarning {
  id: string;
  name: string;
  type: string;
  dataPoints: number;
  earnings: string;
  activeHours: number;
}

export default function EarningsPage() {
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState("terra1s9pkd...m8xrpa7");
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("0");
  
  const datasets: DatasetEntry[] = [
    { id: "1", name: "Air Quality Dataset", accessCount: 421, earnings: "$420.21", trend: "up", changePercentage: 12 },
    { id: "2", name: "Smart Traffic Logs", accessCount: 128, earnings: "$220.50", trend: "down", changePercentage: 5 },
    { id: "3", name: "Urban Weather Feed", accessCount: 392, earnings: "$335.78", trend: "up", changePercentage: 8 },
    { id: "4", name: "Smart Home Energy Data", accessCount: 215, earnings: "$189.30", trend: "stable", changePercentage: 0 },
  ];

  const deviceEarnings: DeviceEarning[] = [
    { id: "1", name: "Temperature Sensor #1", type: "Environmental", dataPoints: 45200, earnings: "$310.45", activeHours: 720 },
    { id: "2", name: "Motion Detector", type: "Security", dataPoints: 12800, earnings: "$156.70", activeHours: 744 },
    { id: "3", name: "Smart Plug", type: "Energy", dataPoints: 31500, earnings: "$285.12", activeHours: 700 },
    { id: "4", name: "Air Quality Monitor", type: "Health", dataPoints: 28900, earnings: "$215.23", activeHours: 710 },
  ];

  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Initiated",
      description: `$${withdrawAmount} TERRA has been sent to your wallet.`,
    });
    setIsWithdrawDialogOpen(false);
  };

  const handleViewInsights = () => {
    toast({
      title: "Data Insights",
      description: "Opening data insights dashboard...",
    });
  };

  const handleUploadDataset = () => {
    toast({
      title: "Upload New Dataset",
      description: "Opening dataset upload form...",
    });
  };

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Earnings Dashboard</h1>
          <p className="text-white/70">Earn rewards from your data & devices</p>
        </div>

        {/* Earnings Summary Card */}
        <div className="mb-8">
          <Card className="bg-loteraa-gray/20 border border-loteraa-gray/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Earnings Summary</CardTitle>
              <CardDescription className="text-white/70">
                Overview of your current earnings and statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-loteraa-gray/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Total Earned</span>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">$12,500 TERRA</div>
                  <div className="text-green-500 text-sm">+8.2% from last month</div>
                </div>
                
                <div className="bg-loteraa-gray/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Wallet Address</span>
                    <Wallet className="h-5 w-5 text-loteraa-purple" />
                  </div>
                  <div className="text-lg font-medium text-white mb-1 truncate">{walletAddress}</div>
                  <div className="text-white/50 text-sm">Terra Blockchain</div>
                </div>
                
                <div className="bg-loteraa-gray/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Monthly Target</span>
                    <BarChart className="h-5 w-5 text-loteraa-purple" />
                  </div>
                  <div className="text-lg font-medium text-white mb-1">$2,000 / $3,000</div>
                  <Progress value={66} className="h-2 mb-1" />
                  <div className="text-white/50 text-sm">66% of monthly goal reached</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                    <Wallet className="mr-2 h-4 w-4" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-loteraa-gray border-loteraa-gray/50 text-white sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Withdraw Earnings</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Enter the amount you want to withdraw to your wallet
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4 py-4">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="amount" className="text-sm font-medium text-white">
                        Amount (TERRA)
                      </label>
                      <input
                        id="amount"
                        type="number"
                        className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="wallet" className="text-sm font-medium text-white">
                        Destination Wallet
                      </label>
                      <input
                        id="wallet"
                        type="text"
                        className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2"
                        value={walletAddress}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90" onClick={handleWithdraw}>
                      Confirm Withdrawal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                View Earnings Breakdown
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Earnings Tabs */}
        <div>
          <Tabs defaultValue="researchers" className="w-full">
            <TabsList className="bg-loteraa-gray/30 border border-loteraa-gray/30 mb-4">
              <TabsTrigger value="researchers" className="text-white data-[state=active]:bg-loteraa-purple">For Researchers</TabsTrigger>
              <TabsTrigger value="devices" className="text-white data-[state=active]:bg-loteraa-purple">From Devices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="researchers">
              <Card className="bg-loteraa-gray/20 border border-loteraa-gray/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">IoT Data Uploaded</CardTitle>
                  <CardDescription className="text-white/70">
                    Data purchased by researchers and organizations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                          <TableHead className="text-white">Dataset Name</TableHead>
                          <TableHead className="text-white">Total Accessed</TableHead>
                          <TableHead className="text-white">Trend</TableHead>
                          <TableHead className="text-white">Earnings</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {datasets.map((dataset) => (
                          <TableRow key={dataset.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                            <TableCell className="font-medium text-white">
                              {dataset.name}
                            </TableCell>
                            <TableCell className="text-white/80">{dataset.accessCount} times</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {dataset.trend === 'up' ? (
                                  <div className="text-green-500 flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    <span>+{dataset.changePercentage}%</span>
                                  </div>
                                ) : dataset.trend === 'down' ? (
                                  <div className="text-red-500 flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
                                    <span>-{dataset.changePercentage}%</span>
                                  </div>
                                ) : (
                                  <div className="text-gray-500 flex items-center">
                                    <span className="mx-1">—</span>
                                    <span>0%</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-loteraa-purple">
                              {dataset.earnings} TERRA
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                    onClick={handleViewInsights}
                  >
                    View Data Insights
                  </Button>
                  <Button 
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                    onClick={handleUploadDataset}
                  >
                    Upload New Dataset
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="devices">
              <Card className="bg-loteraa-gray/20 border border-loteraa-gray/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Device Earnings</CardTitle>
                  <CardDescription className="text-white/70">
                    Revenue generated by your connected IoT devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                          <TableHead className="text-white">Device Name</TableHead>
                          <TableHead className="text-white">Type</TableHead>
                          <TableHead className="text-white">Data Points</TableHead>
                          <TableHead className="text-white">Active Hours</TableHead>
                          <TableHead className="text-white">Earnings</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deviceEarnings.map((device) => (
                          <TableRow key={device.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                            <TableCell className="font-medium text-white">
                              {device.name}
                            </TableCell>
                            <TableCell className="text-white/80">{device.type}</TableCell>
                            <TableCell className="text-white/80">{device.dataPoints.toLocaleString()}</TableCell>
                            <TableCell className="text-white/80">{device.activeHours}</TableCell>
                            <TableCell className="font-medium text-loteraa-purple">
                              {device.earnings} TERRA
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                  >
                    Device Performance
                  </Button>
                  <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                    Connect New Device
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
