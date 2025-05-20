
import React, { useState } from 'react';
import NotificationItem, { NotificationType } from './NotificationItem';
import { Notification } from '@/hooks/useNotifications';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import RewardDetailsDialog from './RewardDetailsDialog';

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

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const hasUnread = notifications.some(n => n.isNew);
  
  const handleNotificationClick = (notification: Notification) => {
    // Only handle reward type notifications
    if (notification.type === 'reward') {
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
    }
  };

  const closeRewardDialog = () => {
    setSelectedReward(prev => ({
      ...prev,
      isOpen: false
    }));
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

      {/* Reward Details Dialog */}
      <RewardDetailsDialog 
        isOpen={selectedReward.isOpen}
        onClose={closeRewardDialog}
        rewardData={selectedReward.data}
      />
    </div>
  );
};

export default NotificationsList;
