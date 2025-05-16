
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Pencil, Trash, MoreHorizontal } from "lucide-react";
import EditDeviceForm from './EditDeviceForm';
import DeleteDeviceDialog from './DeleteDeviceDialog';

// Sample device data
const deviceData = [
  { 
    id: '1', 
    name: 'WeatherSensor1', 
    type: 'Digital', 
    status: 'Online', 
    lastTrigger: '3 mins ago' 
  },
  { 
    id: '2', 
    name: 'EnergyMeter', 
    type: 'Physical', 
    status: 'Standby', 
    lastTrigger: '1 hr ago' 
  },
  { 
    id: '3', 
    name: 'GasMonitor99', 
    type: 'Digital', 
    status: 'Offline', 
    lastTrigger: '-' 
  },
  { 
    id: '4', 
    name: 'TemperatureSensor', 
    type: 'Digital', 
    status: 'Online', 
    lastTrigger: '15 mins ago' 
  },
  { 
    id: '5', 
    name: 'WaterFlowMeter', 
    type: 'Physical', 
    status: 'Online', 
    lastTrigger: '30 mins ago' 
  }
];

interface DevicesTableProps {
  searchQuery: string;
  typeFilter: string;
  statusFilter: string;
}

export default function DevicesTable({
  searchQuery,
  typeFilter,
  statusFilter
}: DevicesTableProps) {
  const navigate = useNavigate();
  const [editingDevice, setEditingDevice] = useState<typeof deviceData[0] | null>(null);
  const [deleteDevice, setDeleteDevice] = useState<typeof deviceData[0] | null>(null);
  
  // Filter devices based on search query and filters
  const filteredDevices = deviceData.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || device.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || device.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleViewDevice = (deviceId: string) => {
    navigate(`/devices/${deviceId}`);
  };
  
  const handleEditDevice = (device: typeof deviceData[0]) => {
    setEditingDevice(device);
  };
  
  const handleDeleteDevice = (device: typeof deviceData[0]) => {
    setDeleteDevice(device);
  };

  return (
    <>
      <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-loteraa-gray/30">
                <TableHead className="text-white/70">Device Name</TableHead>
                <TableHead className="text-white/70">Type</TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70">Last Trigger</TableHead>
                <TableHead className="text-white/70 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <TableRow key={device.id} className="border-b border-loteraa-gray/30">
                    <TableCell className="font-medium text-white">{device.name}</TableCell>
                    <TableCell className="text-white/80">{device.type}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        device.status === "Online" 
                          ? "bg-green-500/10 text-green-500" 
                          : device.status === "Offline"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}>
                        {device.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/80">{device.lastTrigger}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewDevice(device.id)}
                          className="h-8 px-2 text-white/80 hover:text-loteraa-purple hover:bg-loteraa-purple/10"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditDevice(device)}
                          className="h-8 px-2 text-white/80 hover:text-loteraa-blue hover:bg-loteraa-blue/10"
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteDevice(device)}
                          className="h-8 px-2 text-white/80 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                        
                        <div className="md:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-loteraa-gray border-loteraa-gray/30">
                              <DropdownMenuItem 
                                onClick={() => handleViewDevice(device.id)}
                                className="text-white hover:bg-loteraa-purple/20"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleEditDevice(device)}
                                className="text-white hover:bg-loteraa-blue/20"
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteDevice(device)}
                                className="text-white hover:bg-red-500/20"
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-white/70">
                    No devices found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {editingDevice && (
        <EditDeviceForm 
          device={editingDevice} 
          open={!!editingDevice} 
          onOpenChange={() => setEditingDevice(null)} 
        />
      )}
      
      {deleteDevice && (
        <DeleteDeviceDialog 
          device={deleteDevice} 
          open={!!deleteDevice} 
          onOpenChange={() => setDeleteDevice(null)} 
        />
      )}
    </>
  );
}
