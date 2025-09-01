
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();
  const [earnings, setEarnings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEarnings();
    }
  }, [user]);

  const fetchEarnings = async () => {
    try {
      const { data, error } = await supabase
        .from('earnings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching earnings:', error);
        return;
      }

      setEarnings(data || []);
      
      const total = data?.reduce((sum, earning) => sum + Number(earning.amount), 0) || 0;
      setTotalEarnings(total);

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyEarnings = data?.filter(earning => {
        const earningDate = new Date(earning.created_at);
        return earningDate.getMonth() === currentMonth && earningDate.getFullYear() === currentYear;
      }).reduce((sum, earning) => sum + Number(earning.amount), 0) || 0;
      
      setThisMonth(monthlyEarnings);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const earningsOverview = [
    { title: "Total Earnings", value: totalEarnings.toString(), unit: "$LOT", change: "+0%", icon: DollarSign },
    { title: "This Month", value: thisMonth.toString(), unit: "$LOT", change: "+0%", icon: TrendingUp },
    { title: "Data Points", value: earnings.length.toString(), unit: "points", change: "+0%", icon: Database },
    { title: "Avg. Daily", value: "0", unit: "$LOT", change: "+0%", icon: Coins },
  ];

  return (
    <div className="min-h-screen bg-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Earnings</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Monthly Earnings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-white/50">No earnings data available yet</p>
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
              <div className="text-center py-8">
                <p className="text-white/50">No device earnings yet</p>
                <p className="text-sm text-white/40 mt-2">Connect devices to start earning</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Dataset Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {earnings.length > 0 ? earnings.slice(0, 5).map((earning) => (
                  <div key={earning.id} className="flex justify-between items-center py-2 border-b border-loteraa-gray/20">
                    <div>
                      <p className="text-sm text-white">{earning.type.replace('_', ' ')}</p>
                      <p className="text-xs text-white/50">{new Date(earning.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-500">+{earning.amount} LOT</p>
                      <p className="text-xs text-white/50">{earning.status}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-white/50">No dataset earnings yet</p>
                    <p className="text-sm text-white/40 mt-2">Submit datasets to start earning</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
