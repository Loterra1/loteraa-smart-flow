
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddIoTDeviceForm from "@/components/forms/AddIoTDeviceForm";

export default function ActionButtons() {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Button 
          className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white gap-2 h-12 text-md"
          onClick={() => setIsAddDeviceOpen(true)}
        >
          <Plus className="h-5 w-5" />
          Add New IoT Device
        </Button>
        <Button className="bg-loteraa-blue hover:bg-loteraa-blue/90 text-white gap-2 h-12 text-md">
          <Plus className="h-5 w-5" />
          Create Automation
        </Button>
        <Button className="bg-loteraa-teal hover:bg-loteraa-teal/90 text-white gap-2 h-12 text-md">
          <Plus className="h-5 w-5" />
          Bind Smart Contract
        </Button>
      </div>
      
      <AddIoTDeviceForm 
        open={isAddDeviceOpen} 
        onOpenChange={setIsAddDeviceOpen} 
      />
    </>
  );
}
