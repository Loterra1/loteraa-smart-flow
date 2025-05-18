
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SmartContract {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  trigger: string;
  lastModified: string;
}

interface DeleteSmartContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contract: SmartContract | null;
}

const DeleteSmartContractDialog = ({ isOpen, onClose, contract }: DeleteSmartContractDialogProps) => {
  const { toast } = useToast();

  if (!contract) return null;

  const handleDelete = () => {
    // Simulating delete action
    toast({
      title: "Contract Deleted",
      description: `${contract.name} has been deleted successfully.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-black border-loteraa-gray/30 text-white sm:max-w-[450px]">
        <DialogHeader>
          <div className="mx-auto rounded-full bg-red-100 p-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-white text-center text-xl">
            Delete Smart Contract
          </DialogTitle>
          <DialogDescription className="text-white/70 text-center">
            Are you sure you want to delete this smart contract?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-white/70">Contract Name:</span>
            <span className="text-white font-medium">{contract.name}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-white/70">Type:</span>
            <span className="text-white">{contract.type}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-white/70">Status:</span>
            <span className="text-white">{contract.status}</span>
          </div>
        </div>

        <div className="text-white/70 text-sm mt-2">
          <p>Note: This will permanently delete the contract from your account. 
             The contract will remain on the blockchain but will no longer be accessible from your dashboard.</p>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Button 
            variant="outline" 
            className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20 flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={handleDelete}
          >
            Delete Contract
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSmartContractDialog;
