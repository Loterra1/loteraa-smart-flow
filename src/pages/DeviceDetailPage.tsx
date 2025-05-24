import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Pencil } from "lucide-react";
import EditDeviceForm from '@/components/devices/EditDeviceForm';
import EditTriggerDialog from '@/components/devices/EditTriggerDialog';

// Sample device data
const deviceData = [
  { 
    id: '1', 
    name: 'WeatherSensor1', 
    type: 'Digital', 
    status: 'Online', 
    lastTrigger: '3 mins ago',
    description: 'Weather sensor for monitoring temperature, humidity and pressure',
    metrics: [
      { name: 'Temperature', value: '24°C', timestamp: '2 mins ago' },
      { name: 'Humidity', value: '65%', timestamp: '2 mins ago' },
      { name: 'Pressure', value: '1013 hPa', timestamp: '2 mins ago' },
    ],
    triggers: [
      { id: '1', condition: 'Temperature > 30°C', action: 'Send notification', lastTriggered: '2 days ago' },
      { id: '2', condition: 'Humidity > 70%', action: 'Activate dehumidifier', lastTriggered: '12 hours ago' },
    ],
    logs: [
      { timestamp: '2023-05-16 14:32:10', event: 'Data reading', details: 'Temperature: 24°C, Humidity: 65%' },
      { timestamp: '2023-05-16 14:27:10', event: 'Data reading', details: 'Temperature: 24°C, Humidity: 64%' },
      { timestamp: '2023-05-16 14:22:10', event: 'Data reading', details: 'Temperature: 23°C, Humidity: 64%' },
      { timestamp: '2023-05-16 14:17:10', event: 'Data reading', details: 'Temperature: 23°C, Humidity: 65%' },
    ],
  },
  { 
    id: '2', 
    name: 'EnergyMeter', 
    type: 'Physical', 
    status: 'Standby', 
    lastTrigger: '1 hr ago',
    description: 'Smart energy meter for monitoring power consumption',
    metrics: [
      { name: 'Power', value: '450W', timestamp: '1 hour ago' },
      { name: 'Voltage', value: '220V', timestamp: '1 hour ago' },
      { name: 'Current', value: '2.05A', timestamp: '1 hour ago' },
    ],
    triggers: [
      { id: '1', condition: 'Power > 1000W', action: 'Send alert', lastTriggered: '3 days ago' },
    ],
    logs: [
      { timestamp: '2023-05-16 13:00:05', event: 'Data reading', details: 'Power: 450W, Voltage: 220V' },
      { timestamp: '2023-05-16 12:00:05', event: 'Data reading', details: 'Power: 460W, Voltage: 221V' },
      { timestamp: '2023-05-16 11:00:05', event: 'Status change', details: 'Status changed to Standby' },
    ],
  },
  // ... other devices
];

export default function DeviceDetailPage() {
  const navigate = useNavigate();
  const { deviceId } = useParams();
  const [editingDevice, setEditingDevice] = useState(false);
  const [editingTrigger, setEditingTrigger] = useState<any>(null);
  
  // Find device data based on ID
  const device = deviceData.find(d => d.id === deviceId);
  
  if (!device) {
    return (
      <div className="min-h-screen bg-loteraa-black">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Device not found</h2>
          <Button 
            onClick={() => navigate('/devices')}
            className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Devices
          </Button>
        </div>
      </div>
    );
  }
  
  const handleEditTrigger = (trigger: any) => {
    setEditingTrigger(trigger);
  };
  
  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/devices')}
                className="bg-transparent border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-white">{device.name}</h1>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-white/70 mr-3">Type: {device.type}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    device.status === "Online" 
                      ? "bg-green-500/10 text-green-500" 
                      : device.status === "Offline"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {device.status}
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setEditingDevice(true)}
              className="bg-loteraa-blue hover:bg-loteraa-blue/90 text-white gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit Device
            </Button>
          </div>
          
          {device.description && (
            <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
              <CardContent className="p-4">
                <p className="text-white/80">{device.description}</p>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="bg-loteraa-gray/20 border border-loteraa-gray/30 mb-4">
              <TabsTrigger 
                value="metrics" 
                className="data-[state=active]:bg-loteraa-purple/20 data-[state=active]:text-loteraa-purple"
              >
                Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="triggers" 
                className="data-[state=active]:bg-loteraa-purple/20 data-[state=active]:text-loteraa-purple"
              >
                Triggers
              </TabsTrigger>
              <TabsTrigger 
                value="logs" 
                className="data-[state=active]:bg-loteraa-purple/20 data-[state=active]:text-loteraa-purple"
              >
                Logs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="metrics">
              <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Current Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {device.metrics.map((metric, index) => (
                      <Card key={index} className="bg-loteraa-black/30 border-loteraa-gray/30">
                        <CardContent className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-white/70">{metric.name}</span>
                            <span className="text-xl font-semibold text-white mt-1">{metric.value}</span>
                            <span className="text-xs text-white/50 mt-2">Last update: {metric.timestamp}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="triggers">
              <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Automation Triggers</CardTitle>
                </CardHeader>
                <CardContent>
                  {device.triggers.length > 0 ? (
                    <div className="space-y-4">
                      {device.triggers.map((trigger) => (
                        <Card key={trigger.id} className="bg-loteraa-black/30 border-loteraa-gray/30">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-white">Condition: {trigger.condition}</h3>
                                <p className="text-sm text-white/70 mt-1">Action: {trigger.action}</p>
                                <p className="text-xs text-white/50 mt-2">Last triggered: {trigger.lastTriggered}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditTrigger(trigger)}
                                className="h-8 text-white/80 hover:text-loteraa-purple hover:bg-loteraa-purple/10"
                              >
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70 text-center py-8">No triggers configured for this device</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="logs">
              <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Activity Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-loteraa-gray/30">
                          <th className="text-left py-3 px-4 text-white/70 font-medium">Timestamp</th>
                          <th className="text-left py-3 px-4 text-white/70 font-medium">Event</th>
                          <th className="text-left py-3 px-4 text-white/70 font-medium">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {device.logs.map((log, index) => (
                          <tr key={index} className="border-b border-loteraa-gray/20">
                            <td className="py-3 px-4 text-white/70">{log.timestamp}</td>
                            <td className="py-3 px-4 text-white">{log.event}</td>
                            <td className="py-3 px-4 text-white/80">{log.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {editingDevice && (
        <EditDeviceForm 
          device={device} 
          open={editingDevice} 
          onOpenChange={setEditingDevice} 
        />
      )}
      
      {editingTrigger && (
        <EditTriggerDialog 
          trigger={editingTrigger} 
          open={!!editingTrigger} 
          onOpenChange={() => setEditingTrigger(null)} 
        />
      )}
    </div>
  );
}
