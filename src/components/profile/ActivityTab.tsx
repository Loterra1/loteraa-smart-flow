
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";

// Sample data for the engagement graph
const engagementData = [
  { day: '1', value: 4 },
  { day: '5', value: 3 },
  { day: '10', value: 7 },
  { day: '15', value: 5 },
  { day: '20', value: 9 },
  { day: '25', value: 6 },
  { day: '30', value: 8 },
];

// Sample recent actions
const recentActions = [
  { 
    id: 1, 
    type: 'upload', 
    description: 'Uploaded Air quality_lagos_2025.csv', 
    time: '2 hours ago',
    link: '/dataset-entry'
  },
  { 
    id: 2, 
    type: 'earning', 
    description: 'Earned 1,250 Terra from verified Dataset', 
    time: '1 day ago',
    link: '/earnings'
  },
];

export default function ActivityTab() {
  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Recent Actions</h3>
          <div className="space-y-3">
            {recentActions.map((action) => (
              <div 
                key={action.id}
                className="bg-loteraa-gray/20 p-3 rounded-md flex flex-col md:flex-row md:items-center justify-between"
              >
                <div>
                  <p className="text-white">
                    {action.description}
                    {action.type === 'upload' && (
                      <Link to={action.link} className="text-loteraa-purple hover:underline ml-1">
                        (view dataset)
                      </Link>
                    )}
                  </p>
                  <p className="text-sm text-white/60">{action.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Engagement Graph (last 30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <XAxis dataKey="day" stroke="#8E9196" />
                  <YAxis stroke="#8E9196" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1F2C', 
                      border: '1px solid #7E69AB',
                      borderRadius: '4px',
                      color: 'white'
                    }} 
                  />
                  <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
