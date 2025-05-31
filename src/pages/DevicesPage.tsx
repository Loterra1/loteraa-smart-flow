
import { useState, useEffect } from "react";
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

const DevicesPage = () => {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [devices, setDevices] = useState([]);
  const [isNewAccount, setIsNewAccount] = useState(true);

  useEffect(() => {
    // Check if user has devices in localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.devices && parsedData.devices.length > 0) {
        setDevices(parsedData.devices);
        setIsNewAccount(false);
      } else {
        setIsNewAccount(true);
      }
    }
  }, []);

  const handleDeviceAdded = (newDevice: any) => {
    console.log("Adding new device:", newDevice);
    const updatedDevices = [...devices, newDevice];
    setDevices(updatedDevices);
    setIsNewAccount(false);
    
    // Update localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.devices = updatedDevices;
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleDeviceDeleted = (deviceId: string) => {
    console.log("Deleting device:", deviceId);
    const updatedDevices = devices.filter(device => device.id !== deviceId);
    setDevices(updatedDevices);
    
    // Update localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.devices = updatedDevices;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    if (updatedDevices.length === 0) {
      setIsNewAccount(true);
    }
  };

  const handleDeviceUpdated = (updatedDevice: any) => {
    console.log("Updating device:", updatedDevice);
    const updatedDevices = devices.map(device => 
      device.id === updatedDevice.id ? updatedDevice : device
    );
    setDevices(updatedDevices);
    
    // Update localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.devices = updatedDevices;
    localStorage.setItem('userData', JSON.stringify(userData));
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
                {!isNewAccount && (
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
                )}
                
                <Button 
                  onClick={() => setIsAddDeviceOpen(true)}
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Device
                </Button>
              </div>
            </div>

            {isNewAccount ? (
              <div className="bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-loteraa-purple/10 flex items-center justify-center">
                  <Plus className="h-8 w-8 text-loteraa-purple/50" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">No devices connected yet</h2>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  Connect your first IoT device to start monitoring sensor data and automating your processes.
                </p>
                <Button 
                  onClick={() => setIsAddDeviceOpen(true)}
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Device
                </Button>
              </div>
            ) : (
              <>
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
              </>
            )}
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
