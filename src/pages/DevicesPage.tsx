
import { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DevicesCards from "@/components/devices/DevicesCards";
import DevicesTable from "@/components/devices/DevicesTable";
import AddDeviceForm from "@/components/devices/AddDeviceForm";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DevicesPage = () => {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

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
                
                <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Device
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-loteraa-gray/95 border-loteraa-gray/20 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Add New IoT Device</DialogTitle>
                      <DialogDescription className="text-white/70">
                        Connect a new IoT device to your Loteraa network
                      </DialogDescription>
                    </DialogHeader>
                    <AddDeviceForm onClose={() => setIsAddDeviceOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl p-6">
              {viewMode === "cards" ? <DevicesCards /> : <DevicesTable />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DevicesPage;
