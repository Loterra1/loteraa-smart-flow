
import React, { useState } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Plus, BarChart, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EarningsData {
  totalEarnings: string;
  monthlyChange: string;
  pendingPayments: string;
  lastPayment: string;
  earningsHistory: {
    date: string;
    amount: string;
    source: string;
    status: string;
  }[];
}

interface DeviceData {
  id: string;
  name: string;
  type: string;
  status: string;
  earnings: string;
  dataPoints: number;
}

interface DatasetData {
  id: string;
  title: string;
  type: string;
  status: string;
  earnings: string;
  verificationData: {
    contractId: string;
    status: string;
    timestamp: string;
    fileSize: string;
    totalRecords: string;
    coverage: string;
    accessType: string;
    accessPrice: string;
    paymentAmount: string;
    walletAddress: string;
    txHash: string;
  };
}

interface DevicePerformanceData {
  deviceId: string;
  deviceName: string;
  status: string;
  uptime: string;
  lastSync: string;
  batteryLevel: number;
  dataPoints: number;
  storageUsed: string;
  cpuUsage: number;
  memoryUsage: number;
}

const EarningsPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEarningsBreakdownOpen, setIsEarningsBreakdownOpen] = useState(false);
  const [isDatasetVerifiedOpen, setIsDatasetVerifiedOpen] = useState(false);
  const [isDevicePerformanceOpen, setIsDevicePerformanceOpen] = useState(false);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isUsageAnalyticsOpen, setIsUsageAnalyticsOpen] = useState(false);
  const [selectedDeviceForPerformance, setSelectedDeviceForPerformance] = useState<DeviceData | null>(null);

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

  const handleViewDevicePerformance = (device: DeviceData) => {
    setSelectedDeviceForPerformance(device);
    setIsDevicePerformanceOpen(true);
  };

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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Earnings by Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-loteraa-gray/30 rounded-lg flex items-center justify-center">
                      <p className="text-white/50">Earnings by source chart visualization</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Monthly Earnings Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-loteraa-gray/30 rounded-lg flex items-center justify-center">
                      <p className="text-white/50">Monthly earnings trend chart visualization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-white">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 bg-loteraa-gray/20 border-loteraa-gray/30 hover:bg-loteraa-gray/30 flex flex-col items-center justify-center gap-2"
                  onClick={() => setIsAddDeviceOpen(true)}
                >
                  <Plus className="h-6 w-6 text-loteraa-purple" />
                  <span>Add Device/DApp</span>
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
                >
                  <Plus className="h-6 w-6 text-loteraa-purple" />
                  <span>Optimize Earnings</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 bg-loteraa-gray/20 border-loteraa-gray/30 hover:bg-loteraa-gray/30 flex flex-col items-center justify-center gap-2"
                >
                  <Plus className="h-6 w-6 text-loteraa-purple" />
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
                        <Button variant="ghost" size="sm" className="text-loteraa-purple hover:bg-loteraa-gray/30">
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
                    <Badge className="bg-green-600 text-xs w-fit sm:w-auto">
                      {verifiedDataset.verificationData.status}
                    </Badge>
                  </div>
                </div>

                <div className="bg-loteraa-gray/30 p-3 rounded-lg space-y-2 sm:space-y-3">
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
                        {verifiedDataset.verificationData.txHash} <ExternalLink className="h-3 w-3" />
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
      </div>
    </div>
  );
};

export default EarningsPage;
