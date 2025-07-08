
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp } from "lucide-react";

export default function DashboardStats() {
  const [isNewAccount, setIsNewAccount] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setIsNewAccount(parsedData.isNewAccount !== false);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
      <StatCard 
        title="Data Streams" 
        value="0" 
        trend={<ChevronUp className="h-4 w-4 text-gray-500" />}
        trendValue="Start collecting data"
        iconBg="bg-loteraa-blue/20"
        iconColor="text-loteraa-blue"
        isNew={isNewAccount}
      />
      <StatCard 
        title="Total Earnings" 
        value="0" 
        unit="$LOT"
        trend={<ChevronUp className="h-4 w-4 text-gray-500" />}
        trendValue="Begin earning"
        iconBg="bg-loteraa-teal/20"
        iconColor="text-loteraa-teal"
        isNew={isNewAccount}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  trend: React.ReactNode;
  trendValue: string;
  iconBg: string;
  iconColor: string;
  isNew?: boolean;
}

function StatCard({ title, value, unit, trend, trendValue, iconBg, iconColor, isNew }: StatCardProps) {
  return (
    <Card className="bg-loteraa-gray/20 border-loteraa-gray/30 hover:border-loteraa-purple/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/70">{title}</p>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-semibold text-white">{value}</p>
              {unit && <span className="ml-1 text-sm text-white/70">{unit}</span>}
            </div>
            <div className="flex items-center mt-2">
              {trend}
              <span className={`text-xs ml-1 ${isNew ? 'text-gray-500' : 'text-green-500'}`}>
                {trendValue}
              </span>
            </div>
          </div>
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <div className={`h-8 w-8 ${iconColor}`}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
