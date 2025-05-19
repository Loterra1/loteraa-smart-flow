import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Wallet, BarChart, PlusCircle, Upload, Database, File, ExternalLink, CheckCircle } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

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

interface DevAppEntry {
  id: string;
  name: string;
  usageCount: number;
  earnings: string;
}

interface SmartContractEarning {
  id: string;
  contractId: string;
  triggeredBy: string;
  earnings: string;
}

export default function EarningsPage() {
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState("terra1s9pkd...m8xrpa7");
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("0");
  const [isUploadDatasetDialogOpen, setIsUploadDatasetDialogOpen] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [datasetForm, setDatasetForm] = useState({
    title: "",
    description: "",
    tags: "",
    startDate: "2025-01-01", 
    endDate: "2025-06-01",
    location: "",
    licenseType: "paid",
    price: "0.75",
    accessControls: {
      requireAuth: true,
      allowReuse: false,
      oneTimeAccess: false,
      timeLockedAccess: false
    },
    smartContract: "SC-AirData-4098"
  });

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

  const devApps: DevAppEntry[] = [
    { id: "1", name: "Soil Monitor v2", usageCount: 68, earnings: "$1,022.90" },
    { id: "2", name: "Smart Irrigation Kit", usageCount: 121, earnings: "$2,502.00" },
    { id: "3", name: "Urban Air Node", usageCount: 94, earnings: "$1,876.00" },
  ];

  const contractEarnings: SmartContractEarning[] = [
    { id: "1", contractId: "#0x7d5f", triggeredBy: "UrbanWeatherApp", earnings: "$510.00" },
    { id: "2", contractId: "#0x35af", triggeredBy: "SoilNetplatform", earnings: "$1,200.00" },
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
    setIsUploadDatasetDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDatasetForm({
      ...datasetForm,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDatasetForm({
      ...datasetForm,
      accessControls: {
        ...datasetForm.accessControls,
        [name]: checked
      }
    });
  };

  const handleSubmitDataset = () => {
    // Close the upload dialog
    setIsUploadDatasetDialogOpen(false);
    // Show verification dialog
    setIsVerificationDialogOpen(true);
    
    toast({
      title: "Dataset Submitted",
      description: "Your dataset is being verified by the smart contract...",
    });
  };

  const handleCompletedVerification = () => {
    setIsVerificationDialogOpen(false);
    
    toast({
      title: "Dataset Published Successfully",
      description: `${datasetForm.title} is now available for researchers.`,
    });
  };

  const handleWithdrawMax = () => {
    setWithdrawAmount("12500");
  };

  const handleAddNewDevApp = () => {
    toast({
      title: "Add New Device/Dapp",
      description: "Opening device/Dapp creation form...",
    });
  };

  const handleViewUsageAnalytics = () => {
    toast({
      title: "Usage Analytics",
      description: "Opening analytics dashboard...",
    });
  };

  const handleViewExplorer = () => {
    toast({
      title: "Blockchain Explorer",
      description: "Opening blockchain explorer in new window...",
    });
  };

  const handleDownloadReports = () => {
    toast({
      title: "Download Reports",
      description: "Preparing reports for download...",
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
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Available Balance: $12,500 TERRA</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="amount" className="text-sm font-medium text-white">
                        Amount (TERRA)
                      </label>
                      <div className="flex">
                        <input
                          id="amount"
                          type="text"
                          className="flex-1 bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-l-md p-2"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          className="rounded-l-none bg-loteraa-gray/50 hover:bg-loteraa-gray/70"
                          onClick={handleWithdrawMax}
                        >
                          MAX
                        </Button>
                      </div>
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
                      Withdraw Now
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
              <TabsTrigger value="developers" className="text-white data-[state=active]:bg-loteraa-purple">For Developers</TabsTrigger>
              <TabsTrigger value="contracts" className="text-white data-[state=active]:bg-loteraa-purple">Smart Contracts</TabsTrigger>
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
                  <Dialog open={isUploadDatasetDialogOpen} onOpenChange={setIsUploadDatasetDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                        onClick={handleUploadDataset}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Dataset
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-loteraa-gray border-loteraa-gray/50 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Upload New Dataset (IoT Researchers)</DialogTitle>
                        <DialogDescription className="text-white/70">
                          Provide metadata, access rules, and pricing for your data
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col space-y-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-2">
                            <label htmlFor="title" className="text-sm font-medium text-white">
                              Dataset Title
                            </label>
                            <input
                              id="title"
                              name="title"
                              type="text"
                              className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2"
                              value={datasetForm.title}
                              onChange={handleFormChange}
                              placeholder="Enter dataset title"
                            />
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label htmlFor="tags" className="text-sm font-medium text-white">
                              Add Tags
                            </label>
                            <input
                              id="tags"
                              name="tags"
                              type="text"
                              className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2"
                              value={datasetForm.tags}
                              onChange={handleFormChange}
                              placeholder="e.g. air quality, sensors, climate"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="description" className="text-sm font-medium text-white">
                            Description
                          </label>
                          <Textarea
                            id="description"
                            name="description"
                            className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2 min-h-[100px]"
                            value={datasetForm.description}
                            onChange={handleFormChange}
                            placeholder="Describe what this dataset is about (e.g. Air quality sensor data from Lagos)"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium text-white">
                            Upload Dataset File
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-loteraa-gray/30 rounded-lg cursor-pointer bg-loteraa-black/30 hover:bg-loteraa-black/50">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-white" />
                                <p className="mb-2 text-sm text-white/70">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-white/50">
                                  Accept .csv, .json, .zip (max 100MB)
                                </p>
                              </div>
                              <input 
                                id="file-upload" 
                                type="file" 
                                className="hidden" 
                                accept=".csv,.json,.zip"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                          {uploadedFile && (
                            <p className="text-sm text-green-400 flex items-center">
                              <File className="h-4 w-4 mr-2" />
                              File selected: {uploadedFile.name}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-white">
                              Date Range of Data
                            </label>
                            <div className="flex space-x-2">
                              <div className="flex flex-col space-y-1 flex-1">
                                <label htmlFor="startDate" className="text-xs text-white/70">From:</label>
                                <input
                                  id="startDate"
                                  name="startDate"
                                  type="date"
                                  className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2"
                                  value={datasetForm.startDate}
                                  onChange={handleFormChange}
                                />
                              </div>
                              <div className="flex flex-col space-y-1 flex-1">
                                <label htmlFor="endDate" className="text-xs text-white/70">To:</label>
                                <input
                                  id="endDate"
                                  name="endDate"
                                  type="date"
                                  className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2"
                                  value={datasetForm.endDate}
                                  onChange={handleFormChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label htmlFor="location" className="text-sm font-medium text-white">
                              Location/Region
                            </label>
                            <input
                              id="location"
                              name="location"
                              type="text"
                              className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2"
                              value={datasetForm.location}
                              onChange={handleFormChange}
                              placeholder="Enter region/city/GPS coordinates"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium text-white">
                            Licensing & Usage Rights
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="flex items-center space-x-2">
                              <input
                                id="open"
                                name="licenseType"
                                type="radio"
                                value="open"
                                checked={datasetForm.licenseType === "open"}
                                onChange={handleFormChange}
                                className="h-4 w-4 text-loteraa-purple"
                              />
                              <label htmlFor="open" className="text-sm text-white">
                                Open Access
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                id="paid"
                                name="licenseType"
                                type="radio"
                                value="paid"
                                checked={datasetForm.licenseType === "paid"}
                                onChange={handleFormChange}
                                className="h-4 w-4 text-loteraa-purple"
                              />
                              <label htmlFor="paid" className="text-sm text-white">
                                Paid Access
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                id="restricted"
                                name="licenseType"
                                type="radio"
                                value="restricted"
                                checked={datasetForm.licenseType === "restricted"}
                                onChange={handleFormChange}
                                className="h-4 w-4 text-loteraa-purple"
                              />
                              <label htmlFor="restricted" className="text-sm text-white">
                                Restricted Use
                              </label>
                            </div>
                          </div>
                        </div>
                        {datasetForm.licenseType === "paid" && (
                          <div className="flex flex-col space-y-2">
                            <label htmlFor="price" className="text-sm font-medium text-white">
                              Access Price per Request
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 bg-loteraa-black/70 border border-r-0 border-loteraa-gray/30 rounded-l-md text-white">
                                $
                              </span>
                              <input
                                id="price"
                                name="price"
                                type="text"
                                className="flex-1 bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-r-md p-2"
                                value={datasetForm.price}
                                onChange={handleFormChange}
                                placeholder="e.g. 0.50 Terra per access"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium text-white">
                            Access Control Settings
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <input
                                id="requireAuth"
                                name="requireAuth"
                                type="checkbox"
                                checked={datasetForm.accessControls.requireAuth}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-loteraa-purple"
                              />
                              <label htmlFor="requireAuth" className="text-sm text-white">
                                Require authentication to access
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                id="allowReuse"
                                name="allowReuse"
                                type="checkbox"
                                checked={datasetForm.accessControls.allowReuse}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-loteraa-purple"
                              />
                              <label htmlFor="allowReuse" className="text-sm text-white">
                                Allow developer reuse
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                id="oneTimeAccess"
                                name="oneTimeAccess"
                                type="checkbox"
                                checked={datasetForm.accessControls.oneTimeAccess}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-loteraa-purple"
                              />
                              <label htmlFor="oneTimeAccess" className="text-sm text-white">
                                One time access per user
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                id="timeLockedAccess"
                                name="timeLockedAccess"
                                type="checkbox"
                                checked={datasetForm.accessControls.timeLockedAccess}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-loteraa-purple"
                              />
                              <label htmlFor="timeLockedAccess" className="text-sm text-white">
                                Enable time locked access
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="smartContract" className="text-sm font-medium text-white">
                            Bind to Smart Contract (Optional)
                          </label>
                          <select
                            id="smartContract"
                            name="smartContract"
                            className="bg-loteraa-black/50 text-white border border-loteraa-gray/30 rounded-md p-2"
                            value={datasetForm.smartContract}
                            onChange={handleFormChange}
                          >
                            <option value="SC-AirData-4098">SC-AirData-4098</option>
                            <option value="SC-TempSensor-1234">SC-TempSensor-1234</option>
                            <option value="Create New">Create New</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-between flex-wrap gap-2">
                        <div>
                          <Button 
                            variant="outline" 
                            className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 mr-2"
                          >
                            Preview Sample
                          </Button>
                          <Button 
                            variant="outline" 
                            className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                          >
                            View Data Structure
                          </Button>
                        </div>
                        <div>
                          <Button 
                            variant="outline" 
                            className="mr-2"
                            onClick={() => setIsUploadDatasetDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="outline" 
                            className="bg-transparent border-loteraa-gray/70 text-white hover:bg-loteraa-gray/20 mr-2"
                          >
                            Save Draft
                          </Button>
                          <Button 
                            className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                            onClick={handleSubmitDataset}
                          >
                            Publish Dataset
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
            
            <TabsContent value="developers">
              <Card className="bg-loteraa-gray/20 border border-loteraa-gray/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">IoT Devices/Dapps</CardTitle>
                  <CardDescription className="text-white/70">
                    Revenue generated by developer usage of your devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                          <TableHead className="text-white">Name</TableHead>
                          <TableHead className="text-white">Usage Count</TableHead>
                          <TableHead className="text-white">Earnings</TableHead>
                          <TableHead className="text-white">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {devApps.map((app) => (
                          <TableRow key={app.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                            <TableCell className="font-medium text-white">
                              {app.name}
                            </TableCell>
                            <TableCell className="text-white/80">{app.usageCount} Devices</TableCell>
                            <TableCell className="font-medium text-loteraa-purple">
                              {app.earnings} TERRA
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                                onClick={handleViewUsageAnalytics}
                              >
                                View Usage Analytics
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <Button 
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                    onClick={handleAddNewDevApp}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Device/Dapp
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="contracts">
              <Card className="bg-loteraa-gray/20 border border-loteraa-gray/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Smart Contract Earnings</CardTitle>
                  <CardDescription className="text-white/70">
                    Revenue generated by your smart contracts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                          <TableHead className="text-white">Contract ID</TableHead>
                          <TableHead className="text-white">Triggered By</TableHead>
                          <TableHead className="text-white">Earnings</TableHead>
                          <TableHead className="text-white">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contractEarnings.map((contract) => (
                          <TableRow key={contract.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                            <TableCell className="font-medium text-white">
                              {contract.contractId}
                            </TableCell>
                            <TableCell className="text-white/80">{contract.triggeredBy}</TableCell>
                            <TableCell className="font-medium text-loteraa-purple">
                              {contract.earnings} TERRA
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-white"
                                  onClick={handleViewExplorer}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  <span className="sr-only">View on Explorer</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                                  onClick={handleDownloadReports}
                                >
                                  Download Reports
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Dataset Verification Dialog */}
      <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
        <DialogContent className="bg-loteraa-gray border-loteraa-gray/50 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Dataset Verified by Smart Contract
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Your uploaded IoT Data has been successfully verified
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="bg-loteraa-gray/30 p-4 rounded-md">
              <h4 className="text-white font-medium mb-3">Verification Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-white/70">Dataset Title:</div>
                <div className="text-white">{datasetForm.title || "Air Quality Dataset"}</div>
                
                <div className="text-white/70">Smart Contract:</div>
                <div className="text-white">SC-AirData-4098</div>
                
                <div className="text-white/70">Status:</div>
                <div className="text-green-500">Verified</div>
                
                <div className="text-white/70">Time of verification:</div>
                <div className="text-white">{format(new Date(), "yyyy-MM-dd HH:mm 'UTC'")}</div>
                
                <div className="text-white/70">Data Hash Match:</div>
                <div className="text-green-500">Matched</div>
                
                <div className="text-white/70">Timestamp Match:</div>
                <div className="text-green-500">Matched</div>
                
                <div className="text-white/70">Region Match:</div>
                <div className="text-green-500">Matched</div>
              </div>
            </div>
            
            <div className="bg-loteraa-gray/30 p-4 rounded-md">
              <h4 className="text-white font-medium mb-3">Dataset Stats</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-white/70">File Size:</div>
                <div className="text-white">3.2MB</div>
                
                <div className="text-white/70">Total Records:</div>
                <div className="text-white">14,500</div>
                
                <div className="text-white/70">Coverage:</div>
                <div className="text-white">January 1 - March 31, 2025</div>
                
                <div className="text-white/70">Access Set:</div>
                <div className="text-white">Paid (0.75 $TERRA per query)</div>
              </div>
            </div>
            
            <div className="bg-loteraa-green-dark/20 border border-green-500/30 p-4 rounded-md">
              <h4 className="text-green-500 font-medium mb-2 flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Payment Released Automatically
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-white/70">Payment Status:</div>
                <div className="text-green-500">Paid</div>
                
                <div className="text-white/70">Amount:</div>
                <div className="text-white">1,243 $TERRA</div>
                
                <div className="text-white/70">Wallet Address:</div>
                <div className="text-white truncate">0xabc...</div>
                
                <div className="text-white/70">Tx Hash:</div>
                <div className="text-white flex items-center">
                  0xf5a1... 
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 ml-1 text-white hover:text-loteraa-purple"
                    onClick={handleViewExplorer}
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="sr-only">View on Explorer</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-2">
            <div>
              <Button 
                variant="outline" 
                className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20 mr-2"
                onClick={handleViewUsageAnalytics}
              >
                View Access Analytics
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                onClick={handleDownloadReports}
              >
                Download Payment Report
              </Button>
            </div>
            <div>
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={handleCompletedVerification}
              >
                View Dataset Page
              </Button>
              <Button 
                className="bg-loteraa-purple hover:bg-loteraa-purple/90"
              >
                Bind to More Smart Contracts
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
