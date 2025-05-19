
import React from 'react';
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateSmartContractDialog from './CreateSmartContractDialog';
import { SmartContract } from '@/types/smartContract';

interface PageHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  onContractCreated: (contract: SmartContract) => void;
}

const PageHeader = ({ isDialogOpen, setIsDialogOpen, onContractCreated }: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">My Smart Contracts</h1>
        <p className="text-white/70">Manage and deploy your smart contracts for IoT devices</p>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Smart Contract
          </Button>
        </DialogTrigger>
        <CreateSmartContractDialog 
          onClose={() => setIsDialogOpen(false)} 
          onContractCreated={onContractCreated}
        />
      </Dialog>
    </div>
  );
};

export default PageHeader;
