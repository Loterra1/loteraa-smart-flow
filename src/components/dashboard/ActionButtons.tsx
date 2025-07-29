
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddIoTDeviceForm from "@/components/forms/AddIoTDeviceForm";
import CreateAutomationForm from "@/components/forms/CreateAutomationForm";
import BindSmartContractForm from "@/components/forms/BindSmartContractForm";

export default function ActionButtons() {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isCreateAutomationOpen, setIsCreateAutomationOpen] = useState(false);
  const [isBindContractOpen, setIsBindContractOpen] = useState(false);
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button 
          className="bg-black hover:bg-black/90 border border-white text-white gap-2 h-12 text-sm md:text-md"
          onClick={() => setIsAddDeviceOpen(true)}
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5 text-white" />
          Add New IoT Device
        </Button>
        <Button 
          className="bg-black hover:bg-black/90 border border-white text-white gap-2 h-12 text-sm md:text-md"
          onClick={() => setIsCreateAutomationOpen(true)}
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5 text-white" />
          Create Automation
        </Button>
        <Button 
          className="bg-black hover:bg-black/90 border border-white text-white gap-2 h-12 text-sm md:text-md"
          onClick={() => setIsBindContractOpen(true)}
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5 text-white" />
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
      
      <BindSmartContractForm
        open={isBindContractOpen}
        onOpenChange={setIsBindContractOpen}
      />
    </>
  );
}
