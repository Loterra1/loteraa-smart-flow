import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
   const { user, profile, loading, setWalletAddress } = useAuth();
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

   useEffect(() => {
      const getUserWallet = async (retries = 5) => {
         try {
            if (!user?.id) return;

            const response = await api.get(
               `/onchain/retrieve-wallet?userId=${user.id}`,
               { timeout: 15000 }
            );

            if (response.data.success) {
               const address = response.data.data.address;
               setWalletAddress(address);
            }
         } catch (error) {
            if (error.code === 'ECONNABORTED' && retries > 0) {
               console.log(
                  `Request timed out, retrying... (${retries} attempts left)`
               );
               setTimeout(() => getUserWallet(retries - 1), 2000);
            } else {
               console.error('Error fetching wallet:', error);
            }
         }
      };

      getUserWallet();
   }, [user?.id, setWalletAddress]);

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
                  Welcome,{' '}
                  {profile?.display_name || user.email?.split('@')[0] || 'User'}
               </h1>
               <p className="text-white/70">
                  Monitor your IoT devices and smart contract interactions
               </p>
            </div>

            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
               <div>
                  <SensorsList isNewAccount={isNewAccount} />
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
