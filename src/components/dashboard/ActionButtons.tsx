
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddIoTDeviceForm from "@/components/forms/AddIoTDeviceForm";
import CreateAutomationForm from "@/components/forms/CreateAutomationForm";

export default function ActionButtons() {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isCreateAutomationOpen, setIsCreateAutomationOpen] = useState(false);
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button 
          className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white gap-2 h-12 text-sm md:text-md"
          onClick={() => setIsAddDeviceOpen(true)}
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
          Add New IoT Device
        </Button>
        <Button 
          className="bg-loteraa-blue hover:bg-loteraa-blue/90 text-white gap-2 h-12 text-sm md:text-md"
          onClick={() => setIsCreateAutomationOpen(true)}
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
          Create Automation
        </Button>
        <Button className="bg-loteraa-teal hover:bg-loteraa-teal/90 text-white gap-2 h-12 text-sm md:text-md">
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
          Bind Smart Contract
        </Button>
      </div>
      
      <AddIoTDeviceForm 
        open={isAddDeviceOpen} 
        onOpenChange={setIsAddDeviceOpen} 
      />

      <CreateAutomationForm
        open={isCreateAutomationOpen}
        onOpenChange={setIsCreateAutomationOpen}
      />
    </>
  );
}
