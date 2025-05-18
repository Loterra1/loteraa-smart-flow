
import React, { useState, useEffect } from 'react';
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
import { PlusCircle, Link, Database, Coins, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IoTDevice {
  id: string;
  name: string;
  type: string;
}

interface AutomationRule {
  id: string;
  name: string;
  description: string;
}

interface SmartContract {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  trigger: string;
  lastModified: string;
  code?: string;
}

interface EditSmartContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contract: SmartContract | null;
  onSave?: (contract: SmartContract) => void;
}

const EditSmartContractDialog = ({ isOpen, onClose, contract, onSave }: EditSmartContractDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [contractCode, setContractCode] = useState('');
  const [linkedDevices, setLinkedDevices] = useState<IoTDevice[]>([]);
  const [linkedRules, setLinkedRules] = useState<AutomationRule[]>([]);
  const [paymentAmount, setPaymentAmount] = useState('0.10');
  const [paymentTrigger, setPaymentTrigger] = useState('motion detection');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const { toast } = useToast();
  
  // Sample data
  const availableDevices: IoTDevice[] = [
    { id: '3', name: 'Temperature Sensor (TB-103)', type: 'Temperature' },
    { id: '4', name: 'Motion Detector (MD-201)', type: 'Motion' },
    { id: '5', name: 'Light Sensor (LS-105)', type: 'Light' },
    { id: '6', name: 'Humidity Sensor (HS-102)', type: 'Humidity' },
    { id: '7', name: 'Door Sensor (DS-301)', type: 'Contact' }
  ];

  const availableAutomations: AutomationRule[] = [
    { id: '2', name: 'Temperature Alert', description: 'Trigger when temperature exceeds threshold' },
    { id: '3', name: 'Motion Detection', description: 'Trigger when motion is detected' }
  ];

  // Initialize with sample data
  const initialDevices: IoTDevice[] = [
    { id: '1', name: 'Temperature Sensor (TB-103)', type: 'Temperature' },
    { id: '2', name: 'Motion Detector (MD-201)', type: 'Motion' }
  ];

  const initialRules: AutomationRule[] = [
    { id: '1', name: 'Temperature Alert', description: 'Trigger when temperature exceeds threshold' }
  ];
  
  useEffect(() => {
    if (contract) {
      setName(contract.name);
      setStatus(contract.status);
      setLinkedDevices(initialDevices);
      setLinkedRules(initialRules);
      setContractCode(contract.code || '');
    }
  }, [contract]);

  if (!contract) return null;

  const handleSave = () => {
    if (onSave && contract) {
      onSave({
        ...contract,
        name,
        status,
        trigger: linkedRules.length > 0 ? linkedRules[0].name : 'None',
        lastModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        code: contractCode
      });
    }
    toast({
      title: "Contract Updated",
      description: "Your smart contract has been updated successfully.",
    });
    onClose();
  };

  const addDevice = () => {
    // Find a device that's not already linked
    const availableDevice = availableDevices.find(
      device => !linkedDevices.some(d => d.id === device.id)
    );
    
    if (availableDevice) {
      setLinkedDevices([...linkedDevices, availableDevice]);
      toast({
        title: "Device Added",
        description: `${availableDevice.name} has been added to your contract.`,
      });
    } else {
      toast({
        title: "No More Devices",
        description: "All available devices have been added.",
      });
    }
  };

  const removeDevice = (deviceId: string) => {
    setLinkedDevices(linkedDevices.filter(device => device.id !== deviceId));
  };

  const addAutomation = () => {
    // Find an automation that's not already linked
    const availableAutomation = availableAutomations.find(
      automation => !linkedRules.some(r => r.id === automation.id)
    );
    
    if (availableAutomation) {
      setLinkedRules([...linkedRules, availableAutomation]);
      toast({
        title: "Automation Added",
        description: `${availableAutomation.name} has been linked to your contract.`,
      });
    } else {
      toast({
        title: "No More Automations",
        description: "All available automations have been added.",
      });
    }
  };

  const removeAutomation = (automationId: string) => {
    setLinkedRules(linkedRules.filter(rule => rule.id !== automationId));
  };

  const handleAddPaymentTrigger = () => {
    toast({
      title: "Payment Trigger Updated",
      description: `$${paymentAmount} TERAA per ${paymentTrigger} has been set.`,
    });
  };

  const toggleCodeEditor = () => {
    setShowCodeEditor(!showCodeEditor);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-black border-loteraa-gray/30 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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

          <div className="flex items-center justify-between">
            <h3 className="text-white mb-3">Connected Components</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-loteraa-purple"
              onClick={toggleCodeEditor}
            >
              <Code className="h-4 w-4 mr-1" />
              {showCodeEditor ? "Hide Code Editor" : "Edit Contract Code"}
            </Button>
          </div>
          
          {showCodeEditor && (
            <div className="mb-4">
              <Label htmlFor="contract-code" className="text-white mb-2 block">Contract Code</Label>
              <Textarea 
                id="contract-code" 
                className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white font-mono h-60"
                value={contractCode}
                onChange={(e) => setContractCode(e.target.value)}
                placeholder="// Write your Solidity code here..."
              />
            </div>
          )}
          
          <div className="space-y-3">
            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-3">
              <div className="flex items-center mb-2">
                <Database className="h-4 w-4 text-loteraa-purple mr-2" />
                <span className="text-white font-medium">Connected Devices</span>
              </div>
              <div className="pl-6 space-y-2">
                {linkedDevices.map((device) => (
                  <div 
                    key={device.id} 
                    className="bg-loteraa-gray/30 p-2 rounded flex justify-between items-center"
                  >
                    <span className="text-white">{device.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => removeDevice(device.id)}
                    >×</Button>
                  </div>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-loteraa-purple mt-2 flex items-center"
                onClick={addDevice}
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Add Device
              </Button>
            </div>

            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-3">
              <div className="flex items-center mb-2">
                <Link className="h-4 w-4 text-loteraa-purple mr-2" />
                <span className="text-white font-medium">Linked Automations</span>
              </div>
              <div className="pl-6 space-y-2">
                {linkedRules.map((rule) => (
                  <div 
                    key={rule.id} 
                    className="bg-loteraa-gray/30 p-2 rounded flex justify-between items-center"
                  >
                    <span className="text-white">{rule.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => removeAutomation(rule.id)}
                    >×</Button>
                  </div>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-loteraa-purple mt-2 flex items-center"
                onClick={addAutomation}
              >
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
                  <div className="flex flex-col md:flex-row md:justify-between mb-2 gap-2">
                    <div className="flex items-center">
                      <span className="text-white">$</span>
                      <Input
                        className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white h-7 w-16 mx-1"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                      <span className="text-white">TERAA per</span>
                    </div>
                    <div className="flex items-center">
                      <Input
                        className="bg-loteraa-gray/40 border-loteraa-gray/50 text-white h-7 ml-1 w-32"
                        value={paymentTrigger}
                        onChange={(e) => setPaymentTrigger(e.target.value)}
                      />
                      <Button variant="ghost" size="sm" className="h-7 text-xs">×</Button>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-loteraa-purple mt-2 flex items-center"
                onClick={handleAddPaymentTrigger}
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Add Payment Trigger
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between pt-4 gap-2">
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
