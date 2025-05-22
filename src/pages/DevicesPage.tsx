
import React, { useState } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, LayoutGrid, ListFilter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DevicesTable from '@/components/devices/DevicesTable';
import DevicesCards from '@/components/devices/DevicesCards';
import AddDeviceForm from '@/components/devices/AddDeviceForm';

// Initial device data
const initialDeviceData = [
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
  },
  { 
    id: '6', 
    name: 'GasSensor1', 
    type: 'Digital', 
    status: 'Online', 
    lastTrigger: '5 mins ago' 
  }
];

export default function DevicesPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [devices, setDevices] = useState(initialDeviceData);
  
  const handleDeviceAdded = (newDevice: typeof initialDeviceData[0]) => {
    setDevices([newDevice, ...devices]);
  };
  
  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">My Devices</h1>
            <Button 
              onClick={() => setIsAddDeviceOpen(true)}
              className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Device
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input 
                placeholder="Search devices..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-white/70 text-sm whitespace-nowrap">Filter by:</span>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                  <SelectValue placeholder="All Devices" />
                </SelectTrigger>
                <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="physical">Physical</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="standby">Standby</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-md overflow-hidden border-loteraa-gray/30">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode('table')}
                  className={`rounded-none h-9 ${viewMode === 'table' 
                    ? 'bg-loteraa-purple/20 text-loteraa-purple' 
                    : 'bg-loteraa-gray/20 text-white/70 hover:text-white'}`}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode('card')}
                  className={`rounded-none h-9 ${viewMode === 'card' 
                    ? 'bg-loteraa-purple/20 text-loteraa-purple' 
                    : 'bg-loteraa-gray/20 text-white/70 hover:text-white'}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {viewMode === 'table' ? (
            <DevicesTable 
              searchQuery={searchQuery} 
              typeFilter={typeFilter} 
              statusFilter={statusFilter}
              devices={devices}
            />
          ) : (
            <DevicesCards 
              searchQuery={searchQuery} 
              typeFilter={typeFilter} 
              statusFilter={statusFilter}
              devices={devices}
            />
          )}
        </div>
      </div>
      
      <AddDeviceForm 
        open={isAddDeviceOpen} 
        onOpenChange={setIsAddDeviceOpen}
        onDeviceAdded={handleDeviceAdded}
      />
    </div>
  );
}
