
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Link, Database, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SmartContract {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  trigger: string;
  lastModified: string;
}

interface EditSmartContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contract: SmartContract | null;
}

const EditSmartContractDialog = ({ isOpen, onClose, contract }: EditSmartContractDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const { toast } = useToast();
  
  React.useEffect(() => {
    if (contract) {
      setName(contract.name);
      setStatus(contract.status);
    }
  }, [contract]);

  if (!contract) return null;

  const handleSave = () => {
    // Simulating save action
    toast({
      title: "Contract Updated",
      description: "Your smart contract has been updated successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-black border-loteraa-gray/30 text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Edit Smart Contract</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <Label htmlFor="contract-name" className="text-white mb-2 block">Contract Name</Label>
            <Input 
              id="contract-name" 
              className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="contract-description" className="text-white mb-2 block">Description (optional)</Label>
            <Textarea 
              id="contract-description" 
              className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose of your smart contract"
            />
          </div>

          <div>
            <Label htmlFor="contract-status" className="text-white mb-2 block">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as 'Active' | 'Inactive')}>
              <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                <SelectGroup>
                  <SelectItem value="Active" className="text-white hover:bg-loteraa-gray/30">Active</SelectItem>
                  <SelectItem value="Inactive" className="text-white hover:bg-loteraa-gray/30">Inactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-white mb-3">Connected Components</h3>
            
            <div className="space-y-3">
              <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-3">
                <div className="flex items-center mb-2">
                  <Database className="h-4 w-4 text-loteraa-purple mr-2" />
                  <span className="text-white font-medium">Connected Devices</span>
                </div>
                <div className="pl-6 space-y-2">
                  <div className="bg-loteraa-gray/30 p-2 rounded flex justify-between items-center">
                    <span className="text-white">Temperature Sensor (TB-103)</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">×</Button>
                  </div>
                  <div className="bg-loteraa-gray/30 p-2 rounded flex justify-between items-center">
                    <span className="text-white">Motion Detector (MD-201)</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">×</Button>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-loteraa-purple mt-2 flex items-center">
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Add Device
                </Button>
              </div>

              <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-3">
                <div className="flex items-center mb-2">
                  <Link className="h-4 w-4 text-loteraa-purple mr-2" />
                  <span className="text-white font-medium">Linked Automations</span>
                </div>
                <div className="pl-6">
                  <div className="bg-loteraa-gray/30 p-2 rounded flex justify-between items-center">
                    <span className="text-white">Temperature Alert</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">×</Button>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-loteraa-purple mt-2 flex items-center">
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Link Automation
                </Button>
              </div>

              <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-3">
                <div className="flex items-center mb-2">
                  <Coins className="h-4 w-4 text-loteraa-purple mr-2" />
                  <span className="text-white font-medium">Payment Triggers</span>
                </div>
                <div className="pl-6">
                  <div className="bg-loteraa-gray/30 p-2 rounded">
                    <div className="flex justify-between mb-1">
                      <span className="text-white">$0.10 TERAA per motion detection</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">×</Button>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-loteraa-purple mt-2 flex items-center">
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Add Payment Trigger
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            className="bg-loteraa-purple hover:bg-loteraa-purple/90"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSmartContractDialog;
