
import React, { useState, useEffect } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, DollarSign, Database } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface EarningsData {
  period: string;
  amount: number;
  source: string;
}

interface DeviceData {
  name: string;
  earnings: number;
  dataPoints: number;
}

interface DatasetData {
  name: string;
  earnings: number;
  verifications: number;
}

interface DevicePerformanceData {
  day: string;
  device1: number;
  device2: number;
  device3: number;
}

export default function EarningsPage() {
  const [isNewAccount, setIsNewAccount] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.earnings && parsedData.earnings.length > 0) {
        setIsNewAccount(false);
      } else {
        setIsNewAccount(true);
      }
    }
  }, []);

  if (isNewAccount) {
    return (
      <div className="min-h-screen bg-loteraa-black">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Earnings</h1>
            <p className="text-white/70">Track your rewards from data contributions and smart contract interactions</p>
          </div>
          
          <div className="bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-loteraa-teal/10 flex items-center justify-center">
              <Coins className="h-8 w-8 text-loteraa-teal/50" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No earnings yet</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Start connecting devices, submitting datasets, and creating automations to begin earning $TERRA tokens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                Connect Your First Device
              </Button>
              <Button variant="outline" className="border-loteraa-gray/30 text-white hover:bg-loteraa-gray/20">
                Submit Dataset
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sample data for existing accounts (this would be loaded from actual user data)
  const earningsOverview = [
    { title: "Total Earnings", value: "1,234", unit: "$TERRA", change: "+12.5%", icon: DollarSign },
    { title: "This Month", value: "234", unit: "$TERRA", change: "+8.2%", icon: TrendingUp },
    { title: "Data Points", value: "15.2K", unit: "points", change: "+15.1%", icon: Database },
    { title: "Avg. Daily", value: "42", unit: "$TERRA", change: "+5.7%", icon: Coins },
  ];

  const earningsData: EarningsData[] = [
    { period: "Jan", amount: 120, source: "Data" },
    { period: "Feb", amount: 180, source: "Data" },
    { period: "Mar", amount: 250, source: "Automation" },
    { period: "Apr", amount: 200, source: "Data" },
    { period: "May", amount: 300, source: "Dataset" },
    { period: "Jun", amount: 280, source: "Data" },
  ];

  const deviceData: DeviceData[] = [
    { name: "Temp Sensor 01", earnings: 145, dataPoints: 2340 },
    { name: "Motion Sensor", earnings: 98, dataPoints: 1560 },
    { name: "Humidity Sensor", earnings: 167, dataPoints: 2890 },
    { name: "Light Sensor", earnings: 123, dataPoints: 1970 },
  ];

  const datasetData: DatasetData[] = [
    { name: "Climate Dataset #1", earnings: 450, verifications: 12 },
    { name: "Motion Data Collection", earnings: 320, verifications: 8 },
    { name: "Environmental Sensors", earnings: 580, verifications: 15 },
  ];

  const performanceData: DevicePerformanceData[] = [
    { day: "Mon", device1: 12, device2: 8, device3: 15 },
    { day: "Tue", device1: 15, device2: 12, device3: 18 },
    { day: "Wed", device1: 8, device2: 15, device3: 12 },
    { day: "Thu", device1: 20, device2: 18, device3: 25 },
    { day: "Fri", device1: 18, device2: 20, device3: 22 },
    { day: "Sat", device1: 10, device2: 8, device3: 12 },
    { day: "Sun", device1: 14, device2: 16, device3: 18 },
  ];

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Earnings</h1>
          <p className="text-white/70">Track your rewards from data contributions and smart contract interactions</p>
        </div>
        
        {/* Earnings Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {earningsOverview.map((item, index) => (
            <Card key={index} className="bg-loteraa-gray/20 border-loteraa-gray/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">{item.title}</p>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-semibold text-white">{item.value}</p>
                      <span className="ml-1 text-sm text-white/70">{item.unit}</span>
                    </div>
                    <p className="text-xs text-green-500 mt-2">{item.change}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-loteraa-teal/20">
                    <item.icon className="h-6 w-6 text-loteraa-teal" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Monthly Earnings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C3248" />
                    <XAxis dataKey="period" stroke="#C8C8C9" />
                    <YAxis stroke="#C8C8C9" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1B23', 
                        border: '1px solid #2C3248',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#7142F6" 
                      strokeWidth={2}
                      name="Earnings ($TERRA)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Device Performance (Weekly)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2C3248" />
                    <XAxis dataKey="day" stroke="#C8C8C9" />
                    <YAxis stroke="#C8C8C9" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1B23', 
                        border: '1px solid #2C3248',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="device1" fill="#7142F6" name="Temp Sensor" />
                    <Bar dataKey="device2" fill="#3182F4" name="Motion Sensor" />
                    <Bar dataKey="device3" fill="#0CCCBC" name="Humidity Sensor" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Device Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-loteraa-gray/30">
                    <div>
                      <h4 className="font-medium text-white">{device.name}</h4>
                      <p className="text-sm text-white/70">{device.dataPoints} data points</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{device.earnings} $TERRA</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Dataset Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datasetData.map((dataset, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-loteraa-gray/30">
                    <div>
                      <h4 className="font-medium text-white">{dataset.name}</h4>
                      <p className="text-sm text-white/70">{dataset.verifications} verifications</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{dataset.earnings} $TERRA</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
