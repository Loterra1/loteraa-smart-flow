import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Pencil, Trash } from "lucide-react";
import EditDeviceForm from './EditDeviceForm';
import DeleteDeviceDialog from './DeleteDeviceDialog';

type Device = {
  id: string;
  name: string;
  type: string;
  status: string;
  lastTrigger: string;
};

interface DevicesCardsProps {
  searchQuery: string;
  typeFilter: string;
  statusFilter: string;
  devices: Device[];
}

export default function DevicesCards({
  searchQuery,
  typeFilter,
  statusFilter,
  devices
}: DevicesCardsProps) {
  const navigate = useNavigate();
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [deleteDevice, setDeleteDevice] = useState<Device | null>(null);
  
  // Filter devices based on search query and filters
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || device.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || device.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleViewDevice = (deviceId: string) => {
    navigate(`/devices/${deviceId}`);
  };
  
  const handleEditDevice = (device: Device) => {
    setEditingDevice(device);
  };
  
  const handleDeleteDevice = (device: Device) => {
    setDeleteDevice(device);
  };

  return (
    <>
      {filteredDevices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="bg-loteraa-gray/20 border-loteraa-gray/30 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-white">{device.name}</h3>
                      <p className="text-sm text-white/70 mt-1">Type: {device.type}</p>
                    </div>
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
                  
                  <div className="text-sm text-white/70">
                    <span>Last Trigger: {device.lastTrigger}</span>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2 border-t border-loteraa-gray/30">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewDevice(device.id)}
                      className="h-8 px-3 text-white/80 hover:text-loteraa-purple hover:bg-loteraa-purple/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditDevice(device)}
                      className="h-8 px-3 text-white/80 hover:text-loteraa-blue hover:bg-loteraa-blue/10"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteDevice(device)}
                      className="h-8 px-3 text-white/80 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-loteraa-gray/10 border border-loteraa-gray/20 rounded-lg">
          <p className="text-white/70">No devices found matching your filters</p>
        </div>
      )}
      
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
