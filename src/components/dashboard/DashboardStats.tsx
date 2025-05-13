
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp } from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Sensors" 
        value="12" 
        trend={<ChevronUp className="h-4 w-4 text-green-500" />}
        trendValue="+2"
        iconBg="bg-loteraa-purple/20"
        iconColor="text-loteraa-purple"
      />
      <StatCard 
        title="Data Streams" 
        value="4" 
        trend={<ChevronUp className="h-4 w-4 text-green-500" />}
        trendValue="+1"
        iconBg="bg-loteraa-blue/20"
        iconColor="text-loteraa-blue"
      />
      <StatCard 
        title="Total Earnings" 
        value="350" 
        unit="$SEN"
        trend={<ChevronUp className="h-4 w-4 text-green-500" />}
        trendValue="+45"
        iconBg="bg-loteraa-teal/20"
        iconColor="text-loteraa-teal"
      />
      <StatCard 
        title="Active Sensors" 
        value="9" 
        trend={<ChevronUp className="h-4 w-4 text-green-500" />}
        trendValue="+3"
        iconBg="bg-green-500/20"
        iconColor="text-green-500"
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
}

function StatCard({ title, value, unit, trend, trendValue, iconBg, iconColor }: StatCardProps) {
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
              <span className="text-xs text-green-500 ml-1">{trendValue} this week</span>
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
