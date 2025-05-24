
import { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DevicesCards from "@/components/devices/DevicesCards";
import DevicesTable from "@/components/devices/DevicesTable";
import AddDeviceForm from "@/components/devices/AddDeviceForm";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample device data - in a real app this would come from an API
const sampleDevices = [
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

const DevicesPage = () => {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [devices, setDevices] = useState(sampleDevices);

  console.log("DevicesPage rendered with devices:", devices);
  console.log("Search query:", searchQuery);
  console.log("Type filter:", typeFilter);
  console.log("Status filter:", statusFilter);

  const handleDeviceAdded = (newDevice: any) => {
    console.log("Adding new device:", newDevice);
    setDevices(prevDevices => [...prevDevices, newDevice]);
  };

  const handleDeviceDeleted = (deviceId: string) => {
    console.log("Deleting device:", deviceId);
    setDevices(prevDevices => prevDevices.filter(device => device.id !== deviceId));
  };

  const handleDeviceUpdated = (updatedDevice: any) => {
    console.log("Updating device:", updatedDevice);
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === updatedDevice.id ? updatedDevice : device
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      <main className="flex-grow pt-24 pb-16 bg-gradient-to-br from-loteraa-black to-loteraa-gray/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">
                  IoT Devices
                </h1>
                <p className="text-lg text-white/70">
                  Monitor and manage your connected IoT devices
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="flex bg-loteraa-gray/20 rounded-lg p-1">
                  <Button
                    variant={viewMode === "cards" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("cards")}
                    className="text-white"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="text-white"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={() => setIsAddDeviceOpen(true)}
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Device
                </Button>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                    <Input
                      placeholder="Search devices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-loteraa-gray/20 border-loteraa-gray/30 text-white placeholder-white/50"
                    />
                  </div>
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-48 bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-gray border-loteraa-gray/30">
                    <SelectItem value="all" className="text-white hover:bg-loteraa-gray/20">All Types</SelectItem>
                    <SelectItem value="digital" className="text-white hover:bg-loteraa-gray/20">Digital</SelectItem>
                    <SelectItem value="physical" className="text-white hover:bg-loteraa-gray/20">Physical</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-gray border-loteraa-gray/30">
                    <SelectItem value="all" className="text-white hover:bg-loteraa-gray/20">All Status</SelectItem>
                    <SelectItem value="online" className="text-white hover:bg-loteraa-gray/20">Online</SelectItem>
                    <SelectItem value="offline" className="text-white hover:bg-loteraa-gray/20">Offline</SelectItem>
                    <SelectItem value="standby" className="text-white hover:bg-loteraa-gray/20">Standby</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl p-6">
              {viewMode === "cards" ? (
                <DevicesCards 
                  searchQuery={searchQuery}
                  typeFilter={typeFilter}
                  statusFilter={statusFilter}
                  devices={devices}
                  onDeviceDeleted={handleDeviceDeleted}
                  onDeviceUpdated={handleDeviceUpdated}
                />
              ) : (
                <DevicesTable 
                  searchQuery={searchQuery}
                  typeFilter={typeFilter}
                  statusFilter={statusFilter}
                  devices={devices}
                  onDeviceDeleted={handleDeviceDeleted}
                  onDeviceUpdated={handleDeviceUpdated}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <AddDeviceForm 
        open={isAddDeviceOpen}
        onOpenChange={setIsAddDeviceOpen}
        onDeviceAdded={handleDeviceAdded}
      />
    </div>
  );
};

export default DevicesPage;
