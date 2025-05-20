
import React, { useState } from 'react';
import NotificationItem, { NotificationType } from './NotificationItem';
import { Notification } from '@/hooks/useNotifications';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import RewardDetailsDialog from './RewardDetailsDialog';
import DatasetDetailsDialog from './DatasetDetailsDialog';
import ContractDetailsDialog from './ContractDetailsDialog';
import DeviceDetailsDialog from './DeviceDetailsDialog';
import AutomationDetailsDialog from './AutomationDetailsDialog';

interface NotificationsListProps {
  notifications: Notification[];
  activeTab: NotificationType | 'all';
  onMarkAllAsRead: () => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  activeTab,
  onMarkAllAsRead
}) => {
  // Selected rewards state
  const [selectedReward, setSelectedReward] = useState<{
    isOpen: boolean;
    data: {
      amount: number;
      source: string;
      timestamp: string;
      transactionId: string;
      details?: string;
    };
  }>({
    isOpen: false,
    data: {
      amount: 0,
      source: '',
      timestamp: '',
      transactionId: ''
    }
  });

  // Selected dataset state
  const [selectedDataset, setSelectedDataset] = useState<{
    isOpen: boolean;
    data: {
      name: string;
      verificationStatus: string;
      timestamp: string;
      transactionId?: string;
      details?: string;
    };
  }>({
    isOpen: false,
    data: {
      name: '',
      verificationStatus: '',
      timestamp: '',
    }
  });

  // Selected contract state
  const [selectedContract, setSelectedContract] = useState<{
    isOpen: boolean;
    data: {
      name: string;
      status: string;
      timestamp: string;
      address?: string;
      details?: string;
    };
  }>({
    isOpen: false,
    data: {
      name: '',
      status: '',
      timestamp: '',
    }
  });

  // Selected device state
  const [selectedDevice, setSelectedDevice] = useState<{
    isOpen: boolean;
    data: {
      name: string;
      status: string;
      timestamp: string;
      deviceId?: string;
      details?: string;
    };
  }>({
    isOpen: false,
    data: {
      name: '',
      status: '',
      timestamp: '',
    }
  });

  // Selected automation state
  const [selectedAutomation, setSelectedAutomation] = useState<{
    isOpen: boolean;
    data: {
      name: string;
      status: string;
      timestamp: string;
      triggers?: string[];
      details?: string;
    };
  }>({
    isOpen: false,
    data: {
      name: '',
      status: '',
      timestamp: '',
    }
  });

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const hasUnread = notifications.some(n => n.isNew);
  
  const handleNotificationClick = (notification: Notification) => {
    switch (notification.type) {
      case 'reward':
        handleRewardClick(notification);
        break;
      case 'dataset':
        handleDatasetClick(notification);
        break;
      case 'contract':
        handleContractClick(notification);
        break;
      case 'device':
        handleDeviceClick(notification);
        break;
      case 'automation':
        handleAutomationClick(notification);
        break;
      default:
        break;
    }
  };

  const handleRewardClick = (notification: Notification) => {
    // Parse the reward amount from the message
    const amountMatch = notification.message.match(/(\d+) Terra tokens/);
    const amount = amountMatch ? parseInt(amountMatch[1], 10) : 0;
    
    // Get transaction ID from details if available
    const transactionId = notification.details?.match(/0x[a-f0-9]+/) 
      ? notification.details.match(/0x[a-f0-9]+/)?.[0] || ''
      : '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6);
    
    setSelectedReward({
      isOpen: true,
      data: {
        amount,
        source: notification.message.includes('data contributions') 
          ? 'Data Contribution Rewards' 
          : 'Platform Activity Bonus',
        timestamp: notification.timestamp,
        transactionId,
        details: notification.details
      }
    });
  };

  const handleDatasetClick = (notification: Notification) => {
    // Parse dataset name from the message
    const nameMatch = notification.message.match(/"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : 'Dataset';
    
    // Determine verification status from message
    let verificationStatus = 'Pending';
    if (notification.message.includes('has been verified')) {
      verificationStatus = 'Verified';
    } else if (notification.message.includes('verification requested')) {
      verificationStatus = 'Verification Requested';
    }
    
    // Get transaction ID from details if available
    const transactionId = notification.details?.match(/0x[a-f0-9]+/) 
      ? notification.details.match(/0x[a-f0-9]+/)?.[0] 
      : undefined;
    
    setSelectedDataset({
      isOpen: true,
      data: {
        name,
        verificationStatus,
        timestamp: notification.timestamp,
        transactionId,
        details: notification.details
      }
    });
  };

  const handleContractClick = (notification: Notification) => {
    // Parse contract name from the message
    const nameMatch = notification.message.match(/"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : 'Smart Contract';
    
    // Determine contract status from message
    let status = 'Created';
    if (notification.message.includes('was deployed')) {
      status = 'Deployed';
    }
    
    // Generate a mock contract address if not in details
    const address = notification.details?.match(/0x[a-f0-9]+/) 
      ? notification.details.match(/0x[a-f0-9]+/)?.[0] 
      : '0x' + Math.random().toString(16).slice(2, 42);
    
    setSelectedContract({
      isOpen: true,
      data: {
        name,
        status,
        timestamp: notification.timestamp,
        address,
        details: notification.details
      }
    });
  };

  const handleDeviceClick = (notification: Notification) => {
    // Parse device name from the message
    const nameMatch = notification.message.match(/"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : 'IoT Device';
    
    // Determine device status from message
    const status = 'Added';
    
    // Generate a mock device ID if not in details
    const deviceId = 'IOT_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    setSelectedDevice({
      isOpen: true,
      data: {
        name,
        status,
        timestamp: notification.timestamp,
        deviceId,
        details: notification.details
      }
    });
  };

  const handleAutomationClick = (notification: Notification) => {
    // Parse automation name from the message
    const nameMatch = notification.message.match(/"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : 'Automation Workflow';
    
    // Determine automation status from message
    let status = 'Created';
    if (notification.message.includes('activated')) {
      status = 'Activated';
    }
    
    // Mock automation triggers
    const triggers = ['Data threshold exceeded', 'Daily schedule (12:00 UTC)', 'Manual trigger available'];
    
    setSelectedAutomation({
      isOpen: true,
      data: {
        name,
        status,
        timestamp: notification.timestamp,
        triggers,
        details: notification.details
      }
    });
  };

  const closeRewardDialog = () => {
    setSelectedReward(prev => ({ ...prev, isOpen: false }));
  };

  const closeDatasetDialog = () => {
    setSelectedDataset(prev => ({ ...prev, isOpen: false }));
  };

  const closeContractDialog = () => {
    setSelectedContract(prev => ({ ...prev, isOpen: false }));
  };

  const closeDeviceDialog = () => {
    setSelectedDevice(prev => ({ ...prev, isOpen: false }));
  };

  const closeAutomationDialog = () => {
    setSelectedAutomation(prev => ({ ...prev, isOpen: false }));
  };
  
  if (filteredNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/50">
        <p>No notifications in this category</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-white/70">
          {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
        </p>
        {hasUnread && (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-loteraa-purple hover:bg-loteraa-purple/10 flex items-center gap-1"
            onClick={onMarkAllAsRead}
          >
            <Check className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {filteredNotifications.map(notification => (
          <NotificationItem 
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
            timestamp={notification.timestamp}
            isNew={notification.isNew}
            details={notification.details}
            onClick={() => handleNotificationClick(notification)}
          />
        ))}
      </div>

      {/* Dialog components for each notification type */}
      <RewardDetailsDialog 
        isOpen={selectedReward.isOpen}
        onClose={closeRewardDialog}
        rewardData={selectedReward.data}
      />
      
      <DatasetDetailsDialog 
        isOpen={selectedDataset.isOpen}
        onClose={closeDatasetDialog}
        datasetData={selectedDataset.data}
      />
      
      <ContractDetailsDialog 
        isOpen={selectedContract.isOpen}
        onClose={closeContractDialog}
        contractData={selectedContract.data}
      />
      
      <DeviceDetailsDialog 
        isOpen={selectedDevice.isOpen}
        onClose={closeDeviceDialog}
        deviceData={selectedDevice.data}
      />
      
      <AutomationDetailsDialog 
        isOpen={selectedAutomation.isOpen}
        onClose={closeAutomationDialog}
        automationData={selectedAutomation.data}
      />
    </div>
  );
};

export default NotificationsList;
