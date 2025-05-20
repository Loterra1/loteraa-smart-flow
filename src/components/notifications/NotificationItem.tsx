import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  Award, 
  FileCheck, 
  ScrollText, 
  Zap, 
  Tv,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = 'reward' | 'dataset' | 'contract' | 'automation' | 'device';

export interface NotificationItemProps {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  isNew?: boolean;
  details?: string;
}

const getIcon = (type: NotificationType) => {
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

const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  message,
  timestamp,
  isNew = false,
  details
}) => {
  return (
    <Card 
      className={cn(
        "flex items-start p-4 mb-2 space-x-3 transition-colors border-loteraa-gray/30", 
        isNew ? "bg-loteraa-purple/10" : "bg-loteraa-gray/20"
      )}
    >
      <div className="mt-1">{getIcon(type)}</div>
      <div className="flex-1">
        <p className="text-sm text-white">{message}</p>
        {details && (
          <p className="text-xs text-loteraa-purple mt-1">{details}</p>
        )}
        <p className="text-xs text-white/50 mt-1">{timestamp}</p>
      </div>
      {isNew && (
        <div className="h-2 w-2 rounded-full bg-loteraa-purple"></div>
      )}
    </Card>
  );
};

export default NotificationItem;
