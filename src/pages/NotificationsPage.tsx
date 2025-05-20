
import React, { useState } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Award, FileCheck, ScrollText, Zap, Tv, Trash2, BellOff } from "lucide-react";
import { useNotifications, Notification } from '@/hooks/useNotifications';
import NotificationsList from '@/components/notifications/NotificationsList';
import { NotificationType } from '@/components/notifications/NotificationItem';

export default function NotificationsPage() {
  const { 
    notifications, 
    markAllAsRead, 
    clearAll,
    filterByType,
    getUnreadCount 
  } = useNotifications();
  
  const [activeTab, setActiveTab] = useState<NotificationType | 'all'>('all');

  const handleTabChange = (value: string) => {
    setActiveTab(value as NotificationType | 'all');
  };

  const getTabLabel = (type: NotificationType | 'all') => {
    const typeToLabel = {
      'all': 'All',
      'reward': 'Rewards',
      'dataset': 'Datasets',
      'contract': 'Smart Contracts',
      'automation': 'Automation',
      'device': 'Devices'
    };
    
    return typeToLabel[type] || 'Unknown';
  };

  const unreadCount = getUnreadCount();

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Notifications</h1>
            <p className="text-white/70">
              Track your activity and important updates across the platform
            </p>
          </div>
          
          {notifications.length > 0 && (
            <Button 
              variant="outline" 
              className="bg-transparent border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30 flex items-center gap-2"
              onClick={clearAll}
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
        
        <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-lg overflow-hidden">
          <Tabs defaultValue="all" onValueChange={handleTabChange}>
            <TabsList className="w-full grid grid-cols-3 md:grid-cols-6 bg-loteraa-gray/30">
              <TabsTrigger value="all" className="relative">
                All
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-loteraa-purple text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="reward">
                <Award className="h-4 w-4 mr-2" />
                Rewards
              </TabsTrigger>
              <TabsTrigger value="dataset">
                <FileCheck className="h-4 w-4 mr-2" />
                Datasets
              </TabsTrigger>
              <TabsTrigger value="contract">
                <ScrollText className="h-4 w-4 mr-2" />
                Contracts
              </TabsTrigger>
              <TabsTrigger value="automation">
                <Zap className="h-4 w-4 mr-2" />
                Automation
              </TabsTrigger>
              <TabsTrigger value="device">
                <Tv className="h-4 w-4 mr-2" />
                Devices
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="p-4 md:p-6">
              <NotificationsList 
                notifications={notifications}
                activeTab="all"
                onMarkAllAsRead={markAllAsRead}
              />
            </TabsContent>
            
            <TabsContent value="reward" className="p-4 md:p-6">
              <NotificationsList 
                notifications={filterByType('reward')}
                activeTab="reward"
                onMarkAllAsRead={markAllAsRead}
              />
            </TabsContent>
            
            <TabsContent value="dataset" className="p-4 md:p-6">
              <NotificationsList 
                notifications={filterByType('dataset')}
                activeTab="dataset"
                onMarkAllAsRead={markAllAsRead}
              />
            </TabsContent>
            
            <TabsContent value="contract" className="p-4 md:p-6">
              <NotificationsList 
                notifications={filterByType('contract')}
                activeTab="contract"
                onMarkAllAsRead={markAllAsRead}
              />
            </TabsContent>
            
            <TabsContent value="automation" className="p-4 md:p-6">
              <NotificationsList 
                notifications={filterByType('automation')}
                activeTab="automation"
                onMarkAllAsRead={markAllAsRead}
              />
            </TabsContent>
            
            <TabsContent value="device" className="p-4 md:p-6">
              <NotificationsList 
                notifications={filterByType('device')}
                activeTab="device"
                onMarkAllAsRead={markAllAsRead}
              />
            </TabsContent>
          </Tabs>
          
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <BellOff className="h-12 w-12 text-loteraa-gray/40 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
              <p className="text-white/50 text-center max-w-md">
                When you perform activities like adding devices, verifying datasets,
                or deploying smart contracts, notifications will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
