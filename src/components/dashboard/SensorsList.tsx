import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

interface SensorsListProps {
  isNewAccount?: boolean;
}

export default function SensorsList({ isNewAccount = false }: SensorsListProps) {
  const navigate = useNavigate();

  const handleViewSensor = (sensorId: number) => {
    navigate(`/devices/${sensorId}`);
  };

  const handleAddDevice = () => {
    navigate('/devices');
  };

  if (isNewAccount) {
    return (
      <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-white">Active Sensors</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-loteraa-purple/10 flex items-center justify-center">
              <Plus className="h-8 w-8 text-loteraa-purple/50" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No devices connected yet</h3>
            <p className="text-white/70 mb-4 max-w-sm">
              Connect your first IoT device to start monitoring sensor data and automating your processes.
            </p>
            <Button 
              onClick={handleAddDevice}
              className="bg-black hover:bg-black/90"
            >
              Add Your First Device
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sensors = [
    { 
      id: 1, 
      name: "Temp Sensor 01", 
      type: "Temperature", 
      status: "Online", 
      lastReading: "25°C", 
      lastUpdate: "2 min ago" 
    },
    { 
      id: 2, 
      name: "Motion Sensor", 
      type: "Motion", 
      status: "Idle", 
      lastReading: "No motion", 
      lastUpdate: "2 hrs ago" 
    },
    { 
      id: 3, 
      name: "Humidity Sensor", 
      type: "Humidity", 
      status: "Online", 
      lastReading: "65%", 
      lastUpdate: "5 min ago" 
    },
    { 
      id: 4, 
      name: "Light Sensor", 
      type: "Light", 
      status: "Online", 
      lastReading: "320 lux", 
      lastUpdate: "1 min ago" 
    }
  ];

  return (
    <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">Active Sensors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-loteraa-gray/30">
                <TableHead className="text-white/70">Name</TableHead>
                <TableHead className="text-white/70">Type</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70">Last Reading</TableHead>
                <TableHead className="text-white/70">Last Update</TableHead>
                <TableHead className="text-white/70">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sensors.map((sensor) => (
                <TableRow key={sensor.id} className="border-b border-loteraa-gray/30">
                  <TableCell className="font-medium text-white">{sensor.name}</TableCell>
                  <TableCell className="text-white/80">{sensor.type}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      sensor.status === "Online" 
                        ? "bg-green-500/10 text-green-500" 
                        : sensor.status === "Offline"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {sensor.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-white/80">{sensor.lastReading}</TableCell>
                  <TableCell className="text-white/70">{sensor.lastUpdate}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-loteraa-purple hover:text-loteraa-purple/80 hover:bg-loteraa-purple/10"
                      onClick={() => handleViewSensor(sensor.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
