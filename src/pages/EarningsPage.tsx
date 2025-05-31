import React, { useState, useEffect } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Plus, BarChart, TrendingUp, Wallet, Database, Smartphone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function EarningsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEarningsBreakdownOpen, setIsEarningsBreakdownOpen] = useState(false);
  const [isDatasetVerifiedOpen, setIsDatasetVerifiedOpen] = useState(false);
  const [isDevicePerformanceOpen, setIsDevicePerformanceOpen] = useState(false);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isUsageAnalyticsOpen, setIsUsageAnalyticsOpen] = useState(false);
  const [isAddDatasetOpen, setIsAddDatasetOpen] = useState(false);
  const [isOptimizeEarningsOpen, setIsOptimizeEarningsOpen] = useState(false);
  const [isWithdrawFundsOpen, setIsWithdrawFundsOpen] = useState(false);
  const [isContractDetailsOpen, setIsContractDetailsOpen] = useState(false);
  const [selectedDeviceForPerformance, setSelectedDeviceForPerformance] = useState<DeviceData | null>(null);
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [timeFilter, setTimeFilter] = useState("7d");

  useEffect(() => {
    // Check if user has any earnings data
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      // Check if user has devices, datasets, contracts, or automations that could generate earnings
      const hasActivity = (parsedData.devices && parsedData.devices.length > 0) ||
                         (parsedData.datasets && parsedData.datasets.length > 0) ||
                         (parsedData.contracts && parsedData.contracts.length > 0) ||
                         (parsedData.automations && parsedData.automations.length > 0);
      setIsNewAccount(!hasActivity);
    }
  }, []);

  const handleStartEarning = () => {
    navigate('/devices');
  };

  const handleSubmitDataset = () => {
    navigate('/dataset-entry');
  };

  const handleViewDevicePerformance = (device: DeviceData) => {
    setSelectedDeviceForPerformance(device);
    setIsDevicePerformanceOpen(true);
  };

  const handleAddDevice = () => {
    if (!deviceName || !deviceType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Device added",
      description: `${deviceName} has been successfully added to your devices`,
    });

    setDeviceName("");
    setDeviceType("");
    setIsAddDeviceOpen(false);
  };

  const handleAddDataset = () => {
    if (!datasetTitle || !datasetType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Dataset added",
      description: "Your dataset has been submitted for research",
    });

    setDatasetTitle("");
    setDatasetType("");
    setDatasetDescription("");
    setIsAddDatasetOpen(false);
  };

  const handleWithdrawFunds = () => {
    if (!withdrawAmount || !withdrawAddress) {
      toast({
        title: "Error",
        description: "Please provide both amount and destination address",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Withdrawal initiated",
      description: `${withdrawAmount} Terra will be sent to your wallet shortly`,
    });

    setWithdrawAmount("");
    setWithdrawAddress("");
    setIsWithdrawFundsOpen(false);
  };

  const handleOptimizeEarnings = () => {
    toast({
      title: "Optimization initiated",
      description: "Your earnings are being analyzed for optimization opportunities",
    });
    
    setTimeout(() => {
      toast({
        title: "Optimization complete",
        description: "We've identified 3 opportunities to increase your earnings",
      });
    }, 2000);
    
    setIsOptimizeEarningsOpen(false);
  };

  const handleViewContractDetails = () => {
    setIsContractDetailsOpen(true);
  };

  // Form states
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [datasetTitle, setDatasetTitle] = useState("");
  const [datasetType, setDatasetType] = useState("");
  const [datasetDescription, setDatasetDescription] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  // Sample data
  const earningsData: EarningsData = {
    totalEarnings: "$12,500.00 Terra",
    monthlyChange: "+15.3%",
    pendingPayments: "$2,300.00 Terra",
    lastPayment: "May 15, 2025",
    earningsHistory: [
      { date: "May 15, 2025", amount: "$1,200.00", source: "Data Access", status: "Completed" },
      { date: "May 10, 2025", amount: "$850.00", source: "Device Usage", status: "Completed" },
      { date: "May 5, 2025", amount: "$1,500.00", source: "Smart Contract", status: "Completed" },
      { date: "Apr 28, 2025", amount: "$950.00", source: "Data Access", status: "Completed" },
      { date: "Apr 22, 2025", amount: "$1,100.00", source: "Device Usage", status: "Completed" },
    ]
  };

  const devices: DeviceData[] = [
    { id: "dev-001", name: "Urban Air Quality Sensor", type: "Environmental", status: "active", earnings: "$2,300.00", dataPoints: 125000 },
    { id: "dev-002", name: "Smart Water Meter", type: "Utility", status: "active", earnings: "$1,800.00", dataPoints: 98000 },
    { id: "dev-003", name: "Traffic Flow Sensor", type: "Transportation", status: "inactive", earnings: "$1,200.00", dataPoints: 76000 },
    { id: "dev-004", name: "Weather Station", type: "Environmental", status: "active", earnings: "$2,100.00", dataPoints: 115000 },
  ];

  const datasets = [
    { id: "ds-001", title: "Urban Air Quality Dataset", type: "Environmental", status: "verified", earnings: "$1,500.00" },
    { id: "ds-002", title: "Water Consumption Patterns", type: "Utility", status: "pending", earnings: "$0.00" },
    { id: "ds-003", title: "Traffic Patterns Q2 2025", type: "Transportation", status: "verified", earnings: "$1,200.00" },
  ];

  const verifiedDataset: DatasetData = {
    id: "ds-001",
    title: "Urban Air Quality Dataset",
    type: "Environmental",
    status: "verified",
    earnings: "$1,500.00",
    verificationData: {
      contractId: "0x7a12...f8e9",
      status: "Verified",
      timestamp: "May 15, 2025 14:32:45 UTC",
      fileSize: "2.4 GB",
      totalRecords: "1,250,000",
      coverage: "Jan 2025 - Apr 2025",
      accessType: "Query-based",
      accessPrice: "$0.05 Terra",
      paymentAmount: "$1,500.00 Terra",
      walletAddress: "terra1...9x4z",
      txHash: "0x8b72...3e1f"
    }
  };

  const devicePerformance: DevicePerformanceData = {
    deviceId: "dev-001",
    deviceName: "Urban Air Quality Sensor",
    status: "online",
    uptime: "99.7%",
    lastSync: "10 minutes ago",
    batteryLevel: 78,
    dataPoints: 125000,
    storageUsed: "225 MB / 1 GB",
    cpuUsage: 32,
    memoryUsage: 45
  };

  const contractDetails = {
    name: "Data Access Control",
    type: "Access Management",
    status: "Active",
    earnings: "$3,200.00 Terra",
    contractAddress: "terra1abc...xyz789",
    deployedDate: "March 15, 2025",
    totalTransactions: 1847,
    gasUsed: "2.45 Terra",
    lastActivity: "2 hours ago",
    description: "Smart contract managing access control for IoT data streams with automated payment processing.",
    recentTransactions: [
      { hash: "0x7a8b...3e2f", amount: "$125.00", type: "Data Access", timestamp: "2 hours ago" },
      { hash: "0x9c4d...1a5b", amount: "$89.50", type: "Access Grant", timestamp: "4 hours ago" },
      { hash: "0x6f2e...8d9c", amount: "$156.75", type: "Data Query", timestamp: "6 hours ago" },
    ]
  };

  if (isNewAccount) {
    return (
      <div className="min-h-screen bg-loteraa-black">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Earnings Overview</h1>
            <p className="text-white/70">Track your rewards from IoT data contributions and smart contract interactions</p>
          </div>

          <div className="bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-loteraa-teal/10 flex items-center justify-center">
              <Coins className="h-8 w-8 text-loteraa-teal/50" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Start earning $TERRA rewards</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Connect devices, submit datasets, and create automations to start earning rewards through our decentralized ecosystem.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button 
                onClick={handleStartEarning}
                className="bg-loteraa-purple hover:bg-loteraa-purple/90"
              >
                Connect Devices
              </Button>
              <Button 
                onClick={handleSubmitDataset}
                variant="outline"
                className="border-loteraa-teal text-loteraa-teal hover:bg-loteraa-teal/10"
              >
                Submit Dataset
              </Button>
            </div>

            <div className="mt-8 text-left max-w-lg mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">How to earn rewards:</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-loteraa-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-loteraa-purple text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Connect IoT Devices</p>
                    <p className="text-white/60 text-sm">Earn rewards for providing real-time sensor data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-loteraa-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-loteraa-blue text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Submit Datasets</p>
                    <p className="text-white/60 text-sm">Get verified and earn from dataset contributions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-loteraa-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-loteraa-teal text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Create Automations</p>
                    <p className="text-white/60 text-sm">Earn from smart contract interactions and triggers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Earnings</h1>
          <p className="text-white/70">Track your earnings from IoT data and device usage</p>
        </div>

        <Card className="bg-loteraa-gray/20 border-loteraa-gray/30 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium text-white">Earnings Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-white/70 text-sm">Total Earnings</p>
                <p className="text-xl font-semibold text-white">{earningsData.totalEarnings}</p>
                <p className="text-xs text-green-500">{earningsData.monthlyChange} from last month</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/70 text-sm">Pending Payments</p>
                <p className="text-xl font-semibold text-white">{earningsData.pendingPayments}</p>
                <p className="text-xs text-white/50">Expected in 3 days</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/70 text-sm">Last Payment</p>
                <p className="text-xl font-semibold text-white">{earningsData.lastPayment}</p>
                <p className="text-xs text-white/50">$1,200.00 Terra</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/70 text-sm">Actions</p>
                <div className="flex space-x-2 mt-1">
                  <Button 
                    size="sm" 
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                    onClick={() => setIsEarningsBreakdownOpen(true)}
                  >
                    View Breakdown
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-loteraa-purple">Overview</TabsTrigger>
            <TabsTrigger value="devices" className="data-[state=active]:bg-loteraa-purple">Devices</TabsTrigger>
            <TabsTrigger value="datasets" className="data-[state=active]:bg-loteraa-purple">Datasets</TabsTrigger>
            <TabsTrigger value="contracts" className="data-[state=active]:bg-loteraa-purple">Contracts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-white">Recent Earnings</h2>
                <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-loteraa-gray/30">
                <Table>
                  <TableHeader>
                    <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Amount</TableHead>
                      <TableHead className="text-white">Source</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {earningsData.earningsHistory.map((item, index) => (
                      <TableRow key={index} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="text-loteraa-purple">{item.amount} Terra</TableCell>
                        <TableCell>{item.source}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-600 hover:bg-green-700">{item.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-white">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 bg-loteraa-gray/20 border-loteraa-gray/30 hover:bg-loteraa-gray/30 flex flex-col items-center justify-center gap-2"
                  onClick={() => setIsAddDeviceOpen(true)}
                >
                  <Smartphone className="h-6 w-6 text-loteraa-purple" />
                  <span>Add Device/DApp</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 bg-loteraa-gray/20 border-loteraa-gray/30 hover:bg-loteraa-gray/30 flex flex-col items-center justify-center gap-2"
                  onClick={() => setIsAddDatasetOpen(true)}
                >
                  <Database className="h-6 w-6 text-loteraa-purple" />
                  <span>Add Dataset for Research</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 bg-loteraa-gray/20 border-loteraa-gray/30 hover:bg-loteraa-gray/30 flex flex-col items-center justify-center gap-2"
                  onClick={() => setIsUsageAnalyticsOpen(true)}
                >
                  <BarChart className="h-6 w-6 text-loteraa-purple" />
                  <span>Usage Analytics</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 bg-loteraa-gray/20 border-loteraa-gray/30 hover:bg-loteraa-gray/30 flex flex-col items-center justify-center gap-2"
                  onClick={() => setIsOptimizeEarningsOpen(true)}
                >
                  <TrendingUp className="h-6 w-6 text-loteraa-purple" />
                  <span>Optimize Earnings</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 bg-loteraa-gray/20 border-loteraa-gray/30 hover:bg-loteraa-gray/30 flex flex-col items-center justify-center gap-2"
                  onClick={() => setIsWithdrawFundsOpen(true)}
                >
                  <Wallet className="h-6 w-6 text-loteraa-purple" />
                  <span>Withdraw Funds</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="devices" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-white">Device Earnings</h2>
                <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-loteraa-gray/30">
                <Table>
                  <TableHeader>
                    <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                      <TableHead className="text-white">Device Name</TableHead>
                      <TableHead className="text-white">Type</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Earnings</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devices.map((device) => (
                      <TableRow key={device.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                        <TableCell>{device.name}</TableCell>
                        <TableCell>{device.type}</TableCell>
                        <TableCell>
                          <Badge className={`${device.status === 'active' ? 'bg-green-600' : 'bg-gray-600'} hover:${device.status === 'active' ? 'bg-green-700' : 'bg-gray-700'}`}>
                            {device.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-loteraa-purple">{device.earnings} Terra</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-loteraa-purple hover:bg-loteraa-gray/30"
                            onClick={() => handleViewDevicePerformance(device)}
                          >
                            View Performance
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Earnings by Device Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-loteraa-gray/30 rounded-lg flex items-center justify-center">
                      <p className="text-white/50">Earnings by device type chart visualization</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Device Performance vs Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-loteraa-gray/30 rounded-lg flex items-center justify-center">
                      <p className="text-white/50">Device performance vs earnings chart visualization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="datasets" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-white">Dataset Earnings</h2>
                <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-loteraa-gray/30">
                <Table>
                  <TableHeader>
                    <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                      <TableHead className="text-white">Dataset Name</TableHead>
                      <TableHead className="text-white">Type</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Earnings</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {datasets.map((dataset) => (
                      <TableRow key={dataset.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                        <TableCell>{dataset.title}</TableCell>
                        <TableCell>{dataset.type}</TableCell>
                        <TableCell>
                          <Badge className={`${dataset.status === 'verified' ? 'bg-green-600' : 'bg-yellow-600'} hover:${dataset.status === 'verified' ? 'bg-green-700' : 'bg-yellow-700'}`}>
                            {dataset.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-loteraa-purple">{dataset.earnings} Terra</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-loteraa-purple hover:bg-loteraa-gray/30"
                            onClick={() => dataset.status === 'verified' && setIsDatasetVerifiedOpen(true)}
                          >
                            {dataset.status === 'verified' ? 'View Verification' : 'Pending Verification'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Dataset Usage Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-loteraa-gray/30 rounded-lg flex items-center justify-center">
                      <p className="text-white/50">Dataset usage analytics chart visualization</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Dataset Earnings Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-loteraa-gray/30 rounded-lg flex items-center justify-center">
                      <p className="text-white/50">Dataset earnings trend chart visualization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contracts" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-white">Smart Contract Earnings</h2>
                <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-loteraa-gray/30">
                <Table>
                  <TableHeader>
                    <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                      <TableHead className="text-white">Contract Name</TableHead>
                      <TableHead className="text-white">Type</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Earnings</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                      <TableCell className="font-medium text-white">Data Access Control</TableCell>
                      <TableCell>Access Management</TableCell>
                      <TableCell>
                        <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
                      </TableCell>
                      <TableCell className="text-loteraa-purple">$3,200.00 Terra</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-loteraa-purple hover:bg-loteraa-gray/30"
                          onClick={handleViewContractDetails}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Earnings Breakdown Dialog - Mobile Responsive */}
        <Dialog open={isEarningsBreakdownOpen} onOpenChange={setIsEarningsBreakdownOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[700px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl">Earnings Breakdown</DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                Detailed analysis of your platform earnings
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base">
                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-2">Monthly Earnings (2025)</h3>
                  <div className="h-32 sm:h-48 bg-loteraa-gray/30 rounded-lg flex items-center justify-center">
                    <p className="text-white/50 text-xs sm:text-sm">Monthly earnings chart</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-2">Earnings by Category</h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
                    <div className="bg-loteraa-gray/30 p-2 sm:p-4 rounded-lg">
                      <h4 className="text-xs text-white/70 mb-1">IoT Data</h4>
                      <p className="text-base sm:text-lg font-medium">$4,600</p>
                      <p className="text-xs text-white/50">36% of total</p>
                    </div>
                    <div className="bg-loteraa-gray/30 p-2 sm:p-4 rounded-lg">
                      <h4 className="text-xs text-white/70 mb-1">Devices</h4>
                      <p className="text-base sm:text-lg font-medium">$2,900</p>
                      <p className="text-xs text-white/50">23% of total</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-2">Top Earning Assets</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Urban Air Node', type: 'DApp', earnings: '$1,876.00' },
                      { name: 'Weather Feed', type: 'Dataset', earnings: '$1,335.78' }
                    ].map((asset, i) => (
                      <div key={i} className="flex justify-between items-center p-2 sm:p-3 bg-loteraa-gray/30 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{asset.name}</p>
                          <p className="text-xs text-white/70">{asset.type}</p>
                        </div>
                        <p className="text-sm text-loteraa-purple">{asset.earnings}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
              <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 text-xs sm:text-sm">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Download Report
              </Button>
              <DialogClose asChild>
                <Button size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-xs sm:text-sm">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dataset Verified Dialog - Mobile Responsive */}
        <Dialog open={isDatasetVerifiedOpen} onOpenChange={setIsDatasetVerifiedOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[700px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl text-green-500 flex items-center gap-1 sm:gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-base sm:text-2xl">Dataset Verified</span>
              </DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                Your IoT Data has been successfully verified
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
              <div className="space-y-3 sm:space-y-5 text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-loteraa-gray/30 pb-2 gap-1">
                    <span className="text-white/70">Dataset Title:</span>
                    <span className="text-right">{verifiedDataset.title}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-loteraa-gray/30 pb-2 gap-1">
                    <span className="text-white/70">Smart Contract:</span>
                    <span className="text-right">{verifiedDataset.verificationData.contractId}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-loteraa-gray/30 pb-2 gap-1">
                    <span className="text-white/70">Status:</span>
                    <Badge className="bg-green-600 text-xs w-fit">
                      {verifiedDataset.verificationData.status}
                    </Badge>
                  </div>
                </div>

                <div className="bg-loteraa-gray/30 p-3 rounded-lg space-y-2">
                  <h3 className="text-base font-medium">Verification Results</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center p-2 bg-loteraa-gray/20 rounded-lg">
                      <span className="text-xs text-white/70 mb-1">Hash Match</span>
                      <Badge className="bg-green-600 text-xs">✓ Match</Badge>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-loteraa-gray/20 rounded-lg">
                      <span className="text-xs text-white/70 mb-1">Time Match</span>
                      <Badge className="bg-green-600 text-xs">✓ Match</Badge>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-loteraa-gray/20 rounded-lg">
                      <span className="text-xs text-white/70 mb-1">Region Match</span>
                      <Badge className="bg-green-600 text-xs">✓ Match</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-medium">Dataset Stats</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div className="bg-loteraa-gray/30 p-2 rounded-lg">
                      <p className="text-xs text-white/70">Size</p>
                      <p className="text-sm font-medium">{verifiedDataset.verificationData.fileSize}</p>
                    </div>
                    <div className="bg-loteraa-gray/30 p-2 rounded-lg">
                      <p className="text-xs text-white/70">Records</p>
                      <p className="text-sm font-medium">{verifiedDataset.verificationData.totalRecords}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-loteraa-gray/30 p-3 rounded-lg space-y-2">
                  <h3 className="text-base font-medium">Payment Released</h3>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                      <span className="text-white/70">Status:</span>
                      <Badge className="bg-green-600 text-xs w-fit">Paid</Badge>
                    </div>
                    <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                      <span className="text-white/70">Amount:</span>
                      <span className="text-loteraa-purple font-medium">{verifiedDataset.verificationData.paymentAmount}</span>
                    </div>
                    <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                      <span className="text-white/70">TX Hash:</span>
                      <Button variant="ghost" size="sm" className="text-loteraa-purple hover:bg-loteraa-gray/30 p-0 h-auto flex items-center gap-1 justify-start sm:justify-center w-fit text-xs">
                        {verifiedDataset.verificationData.txHash}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex-col gap-2 mt-4">
              <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 text-xs sm:text-sm w-full sm:w-auto">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Payment Report
              </Button>
              <DialogClose asChild>
                <Button size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-xs sm:text-sm w-full sm:w-auto">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Device Performance Dialog - Mobile Responsive */}
        <Dialog open={isDevicePerformanceOpen} onOpenChange={setIsDevicePerformanceOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[700px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl">Device Performance</DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                {selectedDeviceForPerformance?.name || 'Device'} performance metrics
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
              <div className="space-y-3 sm:space-y-5 text-xs sm:text-sm">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between p-3 bg-loteraa-gray/30 rounded-lg gap-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">{devicePerformance.deviceName}</h3>
                    <p className="text-xs text-white/70">ID: {devicePerformance.deviceId}</p>
                  </div>
                  <Badge className="bg-green-600 text-xs w-fit">
                    Online
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="bg-loteraa-gray/30 p-2 rounded-lg">
                    <p className="text-xs text-white/70">Uptime</p>
                    <p className="text-sm font-medium">{devicePerformance.uptime}</p>
                  </div>
                  <div className="bg-loteraa-gray/30 p-2 rounded-lg">
                    <p className="text-xs text-white/70">Battery</p>
                    <p className="text-sm font-medium">{devicePerformance.batteryLevel}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-medium">Resource Usage</h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <div className="bg-loteraa-gray/30 p-2 rounded-lg space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Storage</span>
                        <span>{devicePerformance.storageUsed}</span>
                      </div>
                      <div className="w-full bg-loteraa-gray/60 rounded-full h-1.5">
                        <div className="bg-loteraa-purple h-1.5 rounded-full" style={{ width: '22.5%' }}></div>
                      </div>
                    </div>
                    <div className="bg-loteraa-gray/30 p-2 rounded-lg space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>CPU</span>
                        <span>{devicePerformance.cpuUsage}%</span>
                      </div>
                      <div className="w-full bg-loteraa-gray/60 rounded-full h-1.5">
                        <div className="bg-loteraa-purple h-1.5 rounded-full" style={{ width: `${devicePerformance.cpuUsage}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-loteraa-gray/30 p-2 rounded-lg space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Memory</span>
                        <span>{devicePerformance.memoryUsage}%</span>
                      </div>
                      <div className="w-full bg-loteraa-gray/60 rounded-full h-1.5">
                        <div className="bg-loteraa-purple h-1.5 rounded-full" style={{ width: `${devicePerformance.memoryUsage}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">Error Log</h3>
                  <div className="space-y-2">
                    <div className="p-2 bg-loteraa-gray/30 rounded-lg">
                      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                        <Badge className="bg-yellow-600 text-xs w-fit">Warning</Badge>
                        <span className="text-xs text-white/70">May 15, 2025</span>
                      </div>
                      <p className="mt-1 text-xs">Connection timeout - retry successful after 3 attempts</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex-col gap-2 mt-4">
              <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 text-xs sm:text-sm w-full sm:w-auto">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Diagnostics
              </Button>
              <DialogClose asChild>
                <Button size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-xs sm:text-sm w-full sm:w-auto">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Device Dialog */}
        <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[500px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl">Add Device/DApp</DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                Connect a new IoT device or decentralized application
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="device-name">Device Name</Label>
                <Input 
                  id="device-name" 
                  placeholder="Enter device name" 
                  value={deviceName} 
                  onChange={(e) => setDeviceName(e.target.value)} 
                  className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="device-type">Device Type</Label>
                <Select value={deviceType} onValueChange={setDeviceType}>
                  <SelectTrigger className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white">
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-gray/90 border-loteraa-gray/50 text-white">
                    <SelectItem value="environmental">Environmental Sensor</SelectItem>
                    <SelectItem value="utility">Utility Monitor</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="smart-home">Smart Home</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleAddDevice} size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                Add Device
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Dataset for Research Dialog */}
        <Dialog open={isAddDatasetOpen} onOpenChange={setIsAddDatasetOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[500px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl">Add Dataset for Research</DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                Submit your IoT data for research and earn rewards
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="dataset-title">Dataset Title</Label>
                  <Input 
                    id="dataset-title" 
                    placeholder="Enter dataset title" 
                    value={datasetTitle} 
                    onChange={(e) => setDatasetTitle(e.target.value)} 
                    className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dataset-type">Dataset Type</Label>
                  <Select value={datasetType} onValueChange={setDatasetType}>
                    <SelectTrigger className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white">
                      <SelectValue placeholder="Select dataset type" />
                    </SelectTrigger>
                    <SelectContent className="bg-loteraa-gray/90 border-loteraa-gray/50 text-white">
                      <SelectItem value="environmental">Environmental Data</SelectItem>
                      <SelectItem value="utility">Utility Usage</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="smart-city">Smart City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dataset-description">Description</Label>
                  <Textarea 
                    id="dataset-description" 
                    placeholder="Describe your dataset" 
                    value={datasetDescription} 
                    onChange={(e) => setDatasetDescription(e.target.value)} 
                    className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white min-h-[100px]" 
                  />
                </div>
                
                <div className="p-3 bg-loteraa-gray/30 rounded-lg text-xs sm:text-sm">
                  <p className="font-medium mb-2">Dataset Guidelines:</p>
                  <ul className="list-disc pl-5 space-y-1 text-white/80">
                    <li>Data must be anonymized and comply with privacy regulations</li>
                    <li>Minimum of 10,000 data points required</li>
                    <li>Include timestamp and location metadata when applicable</li>
                    <li>CSV, JSON, or Parquet formats preferred</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between mt-4">
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleAddDataset} size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                Submit Dataset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Usage Analytics Dialog */}
        <Dialog open={isUsageAnalyticsOpen} onOpenChange={setIsUsageAnalyticsOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[700px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl">Usage Analytics</DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                Detailed analytics on how your data is being used
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-3">Data Usage Overview</h3>
                  <div className="h-40 sm:h-64 bg-loteraa-gray/30 rounded-lg flex items-center justify-center">
                    <p className="text-white/50 text-xs sm:text-sm">Usage overview chart visualization</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-medium">Usage by Sector</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-loteraa-gray/30 p-2 sm:p-3 rounded-lg">
                      <h4 className="text-xs text-white/70">Research</h4>
                      <p className="text-sm sm:text-base font-medium">42%</p>
                    </div>
                    <div className="bg-loteraa-gray/30 p-2 sm:p-3 rounded-lg">
                      <h4 className="text-xs text-white/70">Commercial</h4>
                      <p className="text-sm sm:text-base font-medium">28%</p>
                    </div>
                    <div className="bg-loteraa-gray/30 p-2 sm:p-3 rounded-lg">
                      <h4 className="text-xs text-white/70">Government</h4>
                      <p className="text-sm sm:text-base font-medium">18%</p>
                    </div>
                    <div className="bg-loteraa-gray/30 p-2 sm:p-3 rounded-lg">
                      <h4 className="text-xs text-white/70">Other</h4>
                      <p className="text-sm sm:text-base font-medium">12%</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-medium">Consumer Applications</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Smart City Planning", usagePercentage: 35 },
                      { name: "Environmental Research", usagePercentage: 28 },
                      { name: "Traffic Optimization", usagePercentage: 21 }
                    ].map((app, i) => (
                      <div key={i} className="bg-loteraa-gray/30 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{app.name}</span>
                          <span className="text-xs text-white/80">{app.usagePercentage}%</span>
                        </div>
                        <div className="w-full bg-loteraa-gray/60 rounded-full h-1.5">
                          <div 
                            className="bg-loteraa-purple h-1.5 rounded-full" 
                            style={{ width: `${app.usagePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between mt-4">
              <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 text-xs sm:text-sm">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Download Report
              </Button>
              <DialogClose asChild>
                <Button size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-xs sm:text-sm">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Optimize Earnings Dialog */}
        <Dialog open={isOptimizeEarningsOpen} onOpenChange={setIsOptimizeEarningsOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[600px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl">Optimize Earnings</DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                AI-powered suggestions to maximize your earnings
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
              <div className="space-y-4">
                <div className="p-3 bg-loteraa-purple/20 border border-loteraa-purple/40 rounded-lg">
                  <p className="text-sm text-white/90 mb-1">Our AI has analyzed your data and identified the following opportunities:</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    {
                      title: "Add Environmental Context Data",
                      description: "Adding weather correlation data to your environmental sensors could increase data value by up to 24%.",
                      impact: "High",
                      effort: "Medium",
                      incrementalEarnings: "$540/month"
                    },
                    {
                      title: "Increase Sampling Frequency",
                      description: "Increasing data collection frequency from 5 min to 1 min intervals would make your data more valuable for real-time applications.",
                      impact: "Medium",
                      effort: "Low",
                      incrementalEarnings: "$320/month"
                    },
                    {
                      title: "Add New Sensor Types",
                      description: "Adding PM2.5 particulate sensors to your existing air quality nodes would significantly enhance dataset value.",
                      impact: "High",
                      effort: "High",
                      incrementalEarnings: "$780/month"
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-loteraa-gray/30 rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <Badge className="bg-green-600 hover:bg-green-700 text-xs">
                          +{item.incrementalEarnings}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/80">{item.description}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-xs px-2 py-0.5 bg-loteraa-gray/40 rounded">
                          Impact: {item.impact}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-loteraa-gray/40 rounded">
                          Effort: {item.effort}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between mt-4">
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                  Review Later
                </Button>
              </DialogClose>
              <Button onClick={handleOptimizeEarnings} size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                Apply Optimizations
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Withdraw Funds Dialog */}
        <Dialog open={isWithdrawFundsOpen} onOpenChange={setIsWithdrawFundsOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[500px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl">Withdraw Funds</DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                Transfer your earnings to your wallet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex justify-between items-center p-3 bg-loteraa-gray/30 rounded-lg">
                <span className="text-sm">Available Balance:</span>
                <span className="text-lg font-medium text-loteraa-purple">12,500.00 Terra</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount (Terra)</Label>
                <Input 
                  id="withdraw-amount" 
                  placeholder="Enter amount to withdraw" 
                  value={withdrawAmount} 
                  onChange={(e) => setWithdrawAmount(e.target.value)} 
                  className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wallet-address">Destination Address</Label>
                <Input 
                  id="wallet-address" 
                  placeholder="Enter wallet address" 
                  value={withdrawAddress} 
                  onChange={(e) => setWithdrawAddress(e.target.value)} 
                  className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white" 
                />
              </div>
              
              <div className="p-3 bg-loteraa-gray/30 rounded-lg">
                <p className="text-xs text-white/80 mb-2">Transaction Details:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <span className="text-white/70">Network Fee:</span>
                  <span className="text-right">0.25 Terra</span>
                  <span className="text-white/70">Estimated Time:</span>
                  <span className="text-right">~2 minutes</span>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between mt-4">
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleWithdrawFunds} size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                Withdraw Funds
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Smart Contract Details Dialog */}
        <Dialog open={isContractDetailsOpen} onOpenChange={setIsContractDetailsOpen}>
          <DialogContent className="bg-loteraa-gray/90 border-loteraa-gray/30 text-white sm:max-w-[700px] max-h-[90vh] w-[95vw] overflow-hidden p-4 sm:p-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg sm:text-2xl">Smart Contract Details</DialogTitle>
              <DialogDescription className="text-white/70 text-xs sm:text-sm">
                Detailed information about your smart contract
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-loteraa-gray/30 rounded-lg gap-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">{contractDetails.name}</h3>
                    <p className="text-xs text-white/70">{contractDetails.type}</p>
                  </div>
                  <Badge className="bg-green-600 text-xs w-fit">
                    {contractDetails.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="bg-loteraa-gray/30 p-2 rounded-lg">
                    <p className="text-xs text-white/70">Total Earnings</p>
                    <p className="text-sm font-medium text-loteraa-purple">{contractDetails.earnings}</p>
                  </div>
                  <div className="bg-loteraa-gray/30 p-2 rounded-lg">
                    <p className="text-xs text-white/70">Transactions</p>
                    <p className="text-sm font-medium">{contractDetails.totalTransactions.toLocaleString()}</p>
                  </div>
                  <div className="bg-loteraa-gray/30 p-2 rounded-lg">
                    <p className="text-xs text-white/70">Gas Used</p>
                    <p className="text-sm font-medium">{contractDetails.gasUsed}</p>
                  </div>
                  <div className="bg-loteraa-gray/30 p-2 rounded-lg">
                    <p className="text-xs text-white/70">Last Activity</p>
                    <p className="text-sm font-medium">{contractDetails.lastActivity}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-medium">Contract Information</h3>
                  <div className="bg-loteraa-gray/30 p-3 rounded-lg space-y-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-loteraa-gray/30 pb-2 gap-1">
                      <span className="text-white/70">Contract Address:</span>
                      <span className="text-xs font-mono break-all">{contractDetails.contractAddress}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-loteraa-gray/30 pb-2 gap-1">
                      <span className="text-white/70">Deployed:</span>
                      <span>{contractDetails.deployedDate}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-white/70">Description:</span>
                      <p className="text-xs text-white/90 mt-1">{contractDetails.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-medium">Recent Transactions</h3>
                  <div className="space-y-2">
                    {contractDetails.recentTransactions.map((tx, index) => (
                      <div key={index} className="bg-loteraa-gray/30 p-2 rounded-lg">
                        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-1">
                          <div>
                            <p className="text-xs font-mono text-white/80">{tx.hash}</p>
                            <p className="text-xs text-white/70">{tx.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-loteraa-purple">{tx.amount} Terra</p>
                            <p className="text-xs text-white/70">{tx.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between mt-4">
              <Button variant="outline" size="sm" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 text-xs sm:text-sm">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Transaction History
              </Button>
              <DialogClose asChild>
                <Button size="sm" className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-xs sm:text-sm">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
