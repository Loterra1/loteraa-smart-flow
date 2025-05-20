
import React from 'react';
import NotificationItem, { NotificationType } from './NotificationItem';
import { Notification } from '@/hooks/useNotifications';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const hasUnread = notifications.some(n => n.isNew);
  
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
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
