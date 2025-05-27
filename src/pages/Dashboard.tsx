
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import SensorsList from '@/components/dashboard/SensorsList';
import SensorCharts from '@/components/dashboard/SensorCharts';
import AlertsNotifications from '@/components/dashboard/AlertsNotifications';
import AutomationTriggers from '@/components/dashboard/AutomationTriggers';
import ActionButtons from '@/components/dashboard/ActionButtons';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleViewSmartContractDetails = () => {
    navigate('/smart-contracts');
  };

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-white/70">Monitor your IoT devices and smart contract interactions</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <SensorsList />
          </div>
          <div>
            <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white">Smart Contract Triggers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Today</span>
                    <span className="text-white font-semibold">4 triggers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Settlements</span>
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Failures</span>
                    <span className="text-white font-semibold">0</span>
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={handleViewSmartContractDetails}
                      className="w-full text-sm text-loteraa-purple hover:text-loteraa-purple/80 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <SensorCharts />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AutomationTriggers />
          </div>
          <div>
            <AlertsNotifications />
          </div>
        </div>
        
        <ActionButtons />
      </div>
    </div>
  );
}
