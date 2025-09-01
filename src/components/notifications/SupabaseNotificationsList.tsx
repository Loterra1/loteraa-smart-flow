import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  FileCheck, 
  ScrollText, 
  Zap, 
  Tv,
  Bell,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SupabaseNotification } from '@/hooks/useSupabaseNotifications';
import { useSupabaseNotifications } from '@/hooks/useSupabaseNotifications';

interface SupabaseNotificationsListProps {
  notifications: SupabaseNotification[];
  activeTab: string;
  onMarkAllAsRead: () => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'reward':
      return <Award className="h-5 w-5 text-yellow-500" />;
    case 'dataset':
      return <FileCheck className="h-5 w-5 text-green-500" />;
    case 'contract':
      return <ScrollText className="h-5 w-5 text-loteraa-purple" />;
    case 'automation':
      return <Zap className="h-5 w-5 text-blue-500" />;
    case 'device':
      return <Tv className="h-5 w-5 text-orange-500" />;
    default:
      return <Bell className="h-5 w-5 text-white" />;
  }
};

const SupabaseNotificationsList: React.FC<SupabaseNotificationsListProps> = ({
  notifications,
  activeTab,
  onMarkAllAsRead
}) => {
  const { markAsRead } = useSupabaseNotifications();
  const [selectedNotification, setSelectedNotification] = useState<SupabaseNotification | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredNotifications = notifications;
  const unreadCount = filteredNotifications.filter(n => !n.is_read).length;

  const handleNotificationClick = (notification: SupabaseNotification) => {
    setSelectedNotification(notification);
    setShowDetailsModal(true);
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
  };

  const handleExplorerClick = (explorerLink: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(explorerLink, '_blank');
  };

  if (filteredNotifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white/50 mb-4">
          <Bell className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
          <p>You're all caught up! Check back later for updates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/70">{unreadCount} unread notifications</span>
          <Button
            onClick={onMarkAllAsRead}
            variant="outline"
            size="sm"
            className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20"
          >
            Mark all as read
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id}
            className={cn(
              "flex items-start p-4 space-x-3 transition-colors border-loteraa-gray/30 cursor-pointer hover:bg-loteraa-gray/30 group", 
              !notification.is_read ? "bg-loteraa-purple/10" : "bg-loteraa-gray/20"
            )}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="mt-1">{getIcon(notification.type)}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{notification.title}</p>
                  <p className="text-sm text-white/70 mt-1">{notification.message}</p>
                  <p className="text-xs text-white/50 mt-2">
                    {new Date(notification.created_at).toLocaleDateString()} at {new Date(notification.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  {!notification.is_read && (
                    <div className="h-2 w-2 rounded-full bg-loteraa-purple mr-2"></div>
                  )}
                  {notification.data?.explorer_link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto text-loteraa-purple hover:text-loteraa-purple/80"
                      onClick={(e) => handleExplorerClick(notification.data.explorer_link, e)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <ChevronRight className="h-4 w-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="bg-loteraa-black border-loteraa-gray/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedNotification && getIcon(selectedNotification.type)}
              {selectedNotification?.title}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {selectedNotification?.message}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedNotification?.data?.reward_amount && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Amount Earned:</span>
                  <span className="text-lg font-semibold text-green-500">
                    +{selectedNotification.data.reward_amount} LOT
                  </span>
                </div>
              </div>
            )}
            
            {selectedNotification?.data?.transaction_hash && (
              <div className="space-y-2">
                <span className="text-sm text-white/70">Transaction Hash:</span>
                <code className="block text-xs bg-loteraa-gray/20 p-2 rounded border text-white/80 break-all">
                  {selectedNotification.data.transaction_hash}
                </code>
              </div>
            )}

            {selectedNotification?.data?.explorer_link && (
              <Button
                onClick={() => window.open(selectedNotification.data.explorer_link, '_blank')}
                className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Explorer
              </Button>
            )}
            
            <div className="text-xs text-white/50 pt-2 border-t border-loteraa-gray/20">
              {new Date(selectedNotification?.created_at || '').toLocaleString()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupabaseNotificationsList;