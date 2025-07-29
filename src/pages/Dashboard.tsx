
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import SensorsList from '@/components/dashboard/SensorsList';
import SensorCharts from '@/components/dashboard/SensorCharts';
import AlertsNotifications from '@/components/dashboard/AlertsNotifications';
import AutomationTriggers from '@/components/dashboard/AutomationTriggers';
import ActionButtons from '@/components/dashboard/ActionButtons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [isNewAccount, setIsNewAccount] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signup');
      return;
    }

    // Check if user data exists, if not create fresh account
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setIsNewAccount(parsedData.isNewAccount !== false);
    } else if (user) {
      // If user exists but no stored data, it's likely a new account
      setIsNewAccount(true);
    }
  }, [navigate, user, loading]);

  const handleViewSmartContractDetails = () => {
    navigate('/smart-contracts');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-loteraa-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to signup
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome, {profile?.name || user.email?.split('@')[0] || 'User'}
          </h1>
          <p className="text-white/70">Monitor your IoT devices and smart contract interactions</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <SensorsList isNewAccount={isNewAccount} />
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
                    <span className="text-white font-semibold">0 triggers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Settlements</span>
                    <span className="text-white font-semibold">0</span>
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
        
        <SensorCharts isNewAccount={isNewAccount} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AutomationTriggers isNewAccount={isNewAccount} />
          </div>
          <div>
            <AlertsNotifications isNewAccount={isNewAccount} />
          </div>
        </div>
        
        <ActionButtons />
      </div>
    </div>
  );
}
