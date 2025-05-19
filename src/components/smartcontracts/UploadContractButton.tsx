
import React from 'react';
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateSmartContractDialog from './CreateSmartContractDialog';
import { SmartContract } from '@/types/smartContract';

interface UploadContractButtonProps {
  isUploadDialogOpen: boolean;
  setUploadDialogOpen: (open: boolean) => void;
  onContractCreated: (contract: SmartContract) => void;
}

const UploadContractButton = ({ 
  isUploadDialogOpen, 
  setUploadDialogOpen, 
  onContractCreated 
}: UploadContractButtonProps) => {
  return (
    <div className="flex justify-center">
      <Dialog open={isUploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Existing Contract
          </Button>
        </DialogTrigger>
        <CreateSmartContractDialog 
          onClose={() => setUploadDialogOpen(false)} 
          onContractCreated={onContractCreated}
          initialContractType="upload"
        />
      </Dialog>
    </div>
  );
};

export default UploadContractButton;
