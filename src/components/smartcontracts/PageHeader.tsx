
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateSmartContractDialog from './CreateSmartContractDialog';

interface PageHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  onContractCreated: (contract: any) => void;
}

const PageHeader = ({ isDialogOpen, setIsDialogOpen, onContractCreated }: PageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">My Smart Contracts</h1>
        <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-0">
          Manage, deploy, and interact with your IoT Smart Contracts
        </p>
      </div>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Contract
      </Button>
      
      <CreateSmartContractDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={onContractCreated}
      />
    </div>
  );
};

export default PageHeader;
