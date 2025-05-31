import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, Bell } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface AlertsNotificationsProps {
  isNewAccount?: boolean;
}

export default function AlertsNotifications({ isNewAccount = false }: AlertsNotificationsProps) {
  const navigate = useNavigate();

  const handleViewAllNotifications = () => {
    navigate('/notifications');
  };

  if (isNewAccount) {
    return (
      <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-white">Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-loteraa-teal/10 flex items-center justify-center">
              <Bell className="h-8 w-8 text-loteraa-teal/50" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No alerts yet</h3>
            <p className="text-white/70 max-w-sm">
              You'll see device alerts and system notifications here as you start using the platform.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const notifications = [
    {
      id: 1,
      type: "alert",
      message: "Temp Sensor 01 battery low (15%)",
      time: "10 min ago",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />
    },
    {
      id: 2,
      type: "success",
      message: "Smart contract executed",
      hash: "0x8f2e...3d4f",
      time: "25 min ago",
      icon: <Check className="h-5 w-5 text-green-500" />
    },
    {
      id: 3,
      type: "success",
      message: "Smart contract executed",
      hash: "0x7a1c...9e2b",
      time: "1 hour ago",
      icon: <Check className="h-5 w-5 text-green-500" />
    },
    {
      id: 4,
      type: "alert",
      message: "Motion Sensor connection issue",
      time: "3 hours ago",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  ];

  return (
    <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">Alerts & Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-md bg-loteraa-gray/30 border border-loteraa-gray/20">
              <div className="mt-0.5">{notification.icon}</div>
              <div>
                <p className="text-sm text-white">{notification.message}</p>
                {notification.hash && (
                  <a href={`https://etherscan.io/tx/${notification.hash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-loteraa-purple hover:underline">
                    {notification.hash}
                  </a>
                )}
                <p className="text-xs text-white/50 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
          
          <button 
            onClick={handleViewAllNotifications}
            className="w-full py-2 text-sm text-loteraa-purple hover:text-loteraa-purple/80 transition-colors"
          >
            View All Notifications
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
