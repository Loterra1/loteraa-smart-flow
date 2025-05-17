
import React, { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AutomationTable from "@/components/automation/AutomationTable";
import CreateAutomationForm from "@/components/forms/CreateAutomationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Filter, Search } from "lucide-react";

interface AutomationType {
  id: string;
  name: string;
  triggerSource: string;
  actionType: string;
  status: "Active" | "Paused";
  lastTrigger: string;
}

const MOCK_AUTOMATIONS: AutomationType[] = [
  {
    id: "1",
    name: "Air Alert",
    triggerSource: "CO² sensor",
    actionType: "Smart Contract",
    status: "Active",
    lastTrigger: "5 mins ago",
  },
  {
    id: "2",
    name: "Auto-pay Energy",
    triggerSource: "Power meter",
    actionType: "Payment transfer",
    status: "Active",
    lastTrigger: "12 mins ago",
  },
];

const AutomationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [automations] = useState<AutomationType[]>(MOCK_AUTOMATIONS);

  const filteredAutomations = automations.filter((automation) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.triggerSource.toLowerCase().includes(searchQuery.toLowerCase());

    // Device filter
    const matchesDevice = deviceFilter === "all" || true; // For now, assume all match since we don't have device IDs in our mock data

    // Action filter
    const matchesAction =
      actionFilter === "all" || 
      (actionFilter === "smart-contract" && automation.actionType === "Smart Contract") ||
      (actionFilter === "notify" && automation.actionType === "Notification") ||
      (actionFilter === "payment" && automation.actionType === "Payment transfer");

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && automation.status === "Active") ||
      (statusFilter === "paused" && automation.status === "Paused");

    return matchesSearch && matchesDevice && matchesAction && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">My Automations</h1>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-loteraa-purple hover:bg-loteraa-purple/90"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Create Automation
          </Button>
        </div>

        <Card className="bg-loteraa-gray/10 border-loteraa-gray/30 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center">
              <Filter className="mr-2 h-5 w-5" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                  <Input
                    placeholder="Search automations..."
                    className="pl-9 bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Select value={deviceFilter} onValueChange={setDeviceFilter}>
                  <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="All Devices" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                    <SelectItem value="all" className="text-white">All Devices</SelectItem>
                    <SelectItem value="sensor1" className="text-white">CO² Sensor</SelectItem>
                    <SelectItem value="meter1" className="text-white">Power Meter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="All Actions" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                    <SelectItem value="all" className="text-white">All Actions</SelectItem>
                    <SelectItem value="smart-contract" className="text-white">Smart Contract</SelectItem>
                    <SelectItem value="notify" className="text-white">Notify</SelectItem>
                    <SelectItem value="payment" className="text-white">Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                    <SelectItem value="all" className="text-white">All Status</SelectItem>
                    <SelectItem value="active" className="text-white">Active</SelectItem>
                    <SelectItem value="paused" className="text-white">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <AutomationTable automations={filteredAutomations} />
        </div>

        <CreateAutomationForm
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
    </div>
  );
};

export default AutomationPage;
