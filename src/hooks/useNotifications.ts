
import { useState } from 'react';
import { NotificationType } from '@/components/notifications/NotificationItem';
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  isNew: boolean;
  details?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reward',
      message: 'New reward of 25 Terra tokens credited',
      timestamp: '10 minutes ago',
      isNew: true,
      details: 'Wallet transaction: 0x8f2e...3d4f'
    },
    {
      id: '2',
      type: 'dataset',
      message: 'Dataset "Weather_Data_Accra" has been verified',
      timestamp: '25 minutes ago',
      isNew: true,
      details: 'Smart contract verification: 0x7a1c...9e2b'
    },
    {
      id: '3',
      type: 'contract',
      message: 'Smart contract "Air Filter Trigger" was deployed',
      timestamp: '1 hour ago',
      isNew: false,
    },
    {
      id: '4',
      type: 'device',
      message: 'New device "Temperature Sensor" added',
      timestamp: '2 hours ago',
      isNew: false,
    },
    {
      id: '5',
      type: 'automation',
      message: 'Automation "Daily Data Collection" activated',
      timestamp: '3 hours ago',
      isNew: false,
    },
    {
      id: '6',
      type: 'reward',
      message: 'Earned 15 Terra tokens from data contributions',
      timestamp: 'Yesterday',
      isNew: false,
      details: 'From 3 active sensors'
    },
    {
      id: '7',
      type: 'dataset',
      message: 'Dataset "Urban Air Quality" verification requested',
      timestamp: 'Yesterday',
      isNew: false,
    },
  ]);

  const { toast } = useToast();

  const addNotification = (type: NotificationType, message: string, details?: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: 'Just now',
      isNew: true,
      details
    };

    setNotifications([newNotification, ...notifications]);
    
    toast({
      title: "New Notification",
      description: message,
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isNew: false } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filterByType = (type: NotificationType | 'all') => {
    if (type === 'all') {
      return notifications;
    }
    return notifications.filter(n => n.type === type);
  };

  const getUnreadCount = () => {
    return notifications.filter(n => n.isNew).length;
  };

  return {
    notifications,
    addNotification,
    markAllAsRead,
    markAsRead,
    deleteNotification,
    clearAll,
    filterByType,
    getUnreadCount
  };
};
