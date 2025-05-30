import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  ExternalLink, 
  Play, 
  FileText, 
  History, 
  Settings,
  Copy, 
  Check,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SmartContractService from '@/utils/smartContractUtils';
import APP_CONSTANTS from '@/constants/app';

interface SmartContract {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  trigger: string;
  lastModified: string;
  code?: string;
  abi?: string;
  address?: string;
}

interface ViewSmartContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contract: SmartContract | null;
  onExportContract?: (contractId: string) => void;
  onSaveContractCode?: (contract: SmartContract, code: string, abi: string) => void;
}

const ViewSmartContractDialog = ({ 
  isOpen, 
  onClose, 
  contract, 
  onExportContract,
  onSaveContractCode
}: ViewSmartContractDialogProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [sensorId, setSensorId] = useState('');
  const [sensorValue, setSensorValue] = useState('');
  const [executingCall, setExecutingCall] = useState(false);
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [isEditingAbi, setIsEditingAbi] = useState(false);
  const [editableCode, setEditableCode] = useState('');
  const [editableAbi, setEditableAbi] = useState('');
  const { toast } = useToast();

  if (!contract) return null;

  // Use the smart contract service for default code generation
  const getDefaultContractCode = () => {
    return contract.code || SmartContractService.generateDefaultContractCode(contract.name);
  };

  const getDefaultABI = () => {
    return contract.abi || SmartContractService.generateDefaultABI();
  };

  const handleCopyAddress = () => {
    const contractAddress = contract.address || '0x7F4e7630f8742e7Db0606a55E3d45970E3F3dC25';
    navigator.clipboard.writeText(contractAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Address Copied",
          description: "Contract address copied to clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Failed to copy address to clipboard.",
          variant: "destructive"
        });
      });
  };
  
  const handleExportContract = () => {
    if (onExportContract && contract) {
      onExportContract(contract.id);
    }
    
    // Create exportable contract data
    const exportData = {
      name: contract.name,
      type: contract.type,
      code: getDefaultContractCode(),
      abi: getDefaultABI(),
      metadata: {
        version: "1.0.0",
        compiler: "solc 0.8.0",
        exported: new Date().toISOString()
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contract.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Contract Exported",
      description: `${contract.name} has been exported successfully.`,
    });
  };

  const handleExecuteCall = async () => {
    if (!sensorId || !sensorValue) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setExecutingCall(true);
    
    try {
      const contractAddress = contract.address || '0x7F4e7630f8742e7Db0606a55E3d45970E3F3dC25';
      const result = await SmartContractService.callContractFunction(
        contractAddress,
        'logSensorData',
        [sensorId, sensorValue]
      );
      
      toast({
        title: "Function Executed",
        description: `Successfully logged data: ${sensorId} = ${sensorValue}`,
      });
      
      console.log('Contract execution result:', result);
    } catch (error) {
      toast({
        title: "Execution Failed",
        description: "Failed to execute contract function.",
        variant: "destructive"
      });
    } finally {
      setExecutingCall(false);
    }
  };

  const startEditingCode = () => {
    setEditableCode(getDefaultContractCode());
    setIsEditingCode(true);
  };

  const startEditingAbi = () => {
    setEditableAbi(getDefaultABI());
    setIsEditingAbi(true);
  };

  const saveCodeChanges = () => {
    // Validate contract code before saving
    const validation = SmartContractService.validateContractCode(editableCode);
    
    if (!validation.isValid) {
      toast({
        title: "Code Validation Failed",
        description: validation.errors.join(', '),
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Code Updated",
      description: "Contract code has been updated successfully.",
    });
    setIsEditingCode(false);
    if (onSaveContractCode) {
      onSaveContractCode(contract, editableCode, editableAbi);
    }
  };

  const saveAbiChanges = () => {
    toast({
      title: "ABI Updated",
      description: "Contract ABI has been updated successfully.",
    });
    setIsEditingAbi(false);
    if (onSaveContractCode) {
      onSaveContractCode(contract, editableCode, editableAbi);
    }
  };

  const cancelCodeEditing = () => {
    setIsEditingCode(false);
  };

  const cancelAbiEditing = () => {
    setIsEditingAbi(false);
  };

  const contractAddress = contract.address || '0x7F4e7630f8742e7Db0606a55E3d45970E3F3dC25';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-black border-loteraa-gray/30 text-white sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center justify-between">
            <span>{contract.name}</span>
            <div className="text-sm font-normal bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {contract.status}
            </div>
          </DialogTitle>
          <div className="text-white/70 flex flex-wrap items-center text-sm mt-1">
            <span>Contract Address:</span>
            <code className="bg-loteraa-gray/30 px-2 py-0.5 rounded mx-2 font-mono text-xs break-all">
              {contractAddress}
            </code>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={handleCopyAddress}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-loteraa-gray/20 border-loteraa-gray/30 grid grid-cols-4">
            <TabsTrigger value="overview" className="data-[state=active]:text-loteraa-purple">Overview</TabsTrigger>
            <TabsTrigger value="code" className="data-[state=active]:text-loteraa-purple">Code</TabsTrigger>
            <TabsTrigger value="interact" className="data-[state=active]:text-loteraa-purple">Interact</TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:text-loteraa-purple">Logs</TabsTrigger>
          </TabsList>

          {/* Overview tab content */}
          <TabsContent value="overview" className="border-none p-0 mt-4">
            <div className="space-y-4">
              <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4">
                <h3 className="font-medium text-white mb-3">Contract Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-white/70">Type:</div>
                  <div className="text-white">{contract.type}</div>
                  
                  <div className="text-white/70">Status:</div>
                  <div className="text-white">{contract.status}</div>
                  
                  <div className="text-white/70">Trigger:</div>
                  <div className="text-white">{contract.trigger}</div>
                  
                  <div className="text-white/70">Last Modified:</div>
                  <div className="text-white">{contract.lastModified}</div>
                </div>
              </div>

              <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4">
                <h3 className="font-medium text-white mb-3">Connected Devices</h3>
                <div className="space-y-2">
                  <div className="bg-loteraa-gray/30 p-2 rounded flex justify-between items-center">
                    <span className="text-white">Temperature Sensor (TB-103)</span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-loteraa-purple">View</Button>
                  </div>
                  <div className="bg-loteraa-gray/30 p-2 rounded flex justify-between items-center">
                    <span className="text-white">Motion Detector (MD-201)</span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-loteraa-purple">View</Button>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-loteraa-purple mt-2">
                  + Connect More Devices
                </Button>
              </div>

              <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4">
                <h3 className="font-medium text-white mb-2">Transaction History</h3>
                <div className="text-white/70 text-sm">
                  <div className="flex justify-between py-1 border-b border-loteraa-gray/30">
                    <span>Created</span>
                    <span>{contract.lastModified}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-loteraa-gray/30">
                    <span>Last Trigger</span>
                    <span>May 16, 2025</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Total Transactions</span>
                    <span>24</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Code tab content */}
          <TabsContent value="code" className="border-none p-0 mt-4">
            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-white">Contract Code</h3>
                <div className="flex gap-2">
                  {isEditingCode ? (
                    <>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="bg-transparent border-red-500/70 text-white hover:bg-red-500/20"
                        onClick={cancelCodeEditing}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="bg-transparent border-green-500/70 text-white hover:bg-green-500/20"
                        onClick={saveCodeChanges}
                      >
                        <Save className="h-3 w-3 mr-1" /> Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                        onClick={() => {
                          navigator.clipboard.writeText(getDefaultContractCode());
                          toast({
                            title: "Code Copied",
                            description: "Contract code has been copied to clipboard.",
                          });
                        }}
                      >
                        <Copy className="h-3 w-3 mr-1" /> Copy Code
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                        onClick={startEditingCode}
                      >
                        <Code className="h-3 w-3 mr-1" /> Edit Code
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-loteraa-gray/30 p-3 rounded-md overflow-x-auto">
                {isEditingCode ? (
                  <Textarea 
                    className="bg-loteraa-gray/40 border-loteraa-gray/30 text-white font-mono h-60 w-full"
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                  />
                ) : (
                  <pre className="text-white/90 text-xs font-mono">
                    {getDefaultContractCode()}
                  </pre>
                )}
              </div>
            </div>
            
            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4 mt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-white">Contract ABI</h3>
                <div className="flex gap-2">
                  {isEditingAbi ? (
                    <>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="bg-transparent border-red-500/70 text-white hover:bg-red-500/20"
                        onClick={cancelAbiEditing}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="bg-transparent border-green-500/70 text-white hover:bg-green-500/20"
                        onClick={saveAbiChanges}
                      >
                        <Save className="h-3 w-3 mr-1" /> Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                        onClick={() => {
                          navigator.clipboard.writeText(getDefaultABI());
                          toast({
                            title: "ABI Copied",
                            description: "Contract ABI has been copied to clipboard.",
                          });
                        }}
                      >
                        <Copy className="h-3 w-3 mr-1" /> Copy ABI
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                        onClick={startEditingAbi}
                      >
                        <Code className="h-3 w-3 mr-1" /> Edit ABI
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-loteraa-gray/30 p-3 rounded-md overflow-x-auto">
                {isEditingAbi ? (
                  <Textarea 
                    className="bg-loteraa-gray/40 border-loteraa-gray/30 text-white font-mono h-40 w-full"
                    value={editableAbi}
                    onChange={(e) => setEditableAbi(e.target.value)}
                  />
                ) : (
                  <pre className="text-white/90 text-xs font-mono">
                    {getDefaultABI()}
                  </pre>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Interact tab content */}
          <TabsContent value="interact" className="border-none p-0 mt-4">
            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4">
              <h3 className="font-medium text-white mb-4">Test Contract Functions</h3>
              
              <div className="border border-loteraa-gray/40 rounded-md overflow-hidden mb-4">
                <div className="bg-loteraa-purple/20 p-3 font-medium text-white">
                  logSensorData
                </div>
                <div className="p-3 space-y-3">
                  <div>
                    <Label htmlFor="sensorId" className="text-white mb-1 block text-sm">sensorId (string)</Label>
                    <Input 
                      id="sensorId" 
                      placeholder="e.g., temp-sensor-1"
                      className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white"
                      value={sensorId}
                      onChange={(e) => setSensorId(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="value" className="text-white mb-1 block text-sm">value (string)</Label>
                    <Input 
                      id="value" 
                      placeholder="e.g., 25.5"
                      className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white"
                      value={sensorValue}
                      onChange={(e) => setSensorValue(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                    onClick={handleExecuteCall}
                    disabled={executingCall}
                  >
                    {executingCall ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Execute Call
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4 mt-4">
              <h3 className="font-medium text-white mb-3">Set Roles</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-loteraa-gray/30 p-2 rounded flex items-center">
                  <input type="radio" id="owner" name="role" className="mr-2" defaultChecked />
                  <Label htmlFor="owner" className="text-white cursor-pointer">Owner</Label>
                </div>
                <div className="bg-loteraa-gray/30 p-2 rounded flex items-center">
                  <input type="radio" id="researcher" name="role" className="mr-2" />
                  <Label htmlFor="researcher" className="text-white cursor-pointer">Researcher</Label>
                </div>
                <div className="bg-loteraa-gray/30 p-2 rounded flex items-center">
                  <input type="radio" id="deviceLinker" name="role" className="mr-2" />
                  <Label htmlFor="deviceLinker" className="text-white cursor-pointer">Device Linker</Label>
                </div>
                <div className="bg-loteraa-gray/30 p-2 rounded flex items-center">
                  <input type="radio" id="viewer" name="role" className="mr-2" />
                  <Label htmlFor="viewer" className="text-white cursor-pointer">Viewer</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="address" className="text-white mb-1 block text-sm">Address</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    id="address" 
                    placeholder="Enter wallet address"
                    className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white flex-1"
                  />
                  <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                    Assign Role
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Logs tab content */}
          <TabsContent value="logs" className="border-none p-0 mt-4">
            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-white">Event Logs</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                  onClick={() => {
                    toast({
                      title: "Logs Refreshed",
                      description: "Event logs have been updated.",
                    });
                  }}
                >
                  <History className="h-3 w-3 mr-1" /> Refresh
                </Button>
              </div>
              <div className="bg-loteraa-gray/30 rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-loteraa-gray/40">
                        <th className="text-left p-2 text-white/70">Event</th>
                        <th className="text-left p-2 text-white/70">Sensor</th>
                        <th className="text-left p-2 text-white/70">Value</th>
                        <th className="text-left p-2 text-white/70">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-loteraa-gray/40">
                        <td className="p-2 text-white">DataLogged</td>
                        <td className="p-2 text-white">temp-sensor-1</td>
                        <td className="p-2 text-white">24.3</td>
                        <td className="p-2 text-white/70">May 17, 10:23 AM</td>
                      </tr>
                      <tr className="border-b border-loteraa-gray/40">
                        <td className="p-2 text-white">DataLogged</td>
                        <td className="p-2 text-white">temp-sensor-1</td>
                        <td className="p-2 text-white">24.5</td>
                        <td className="p-2 text-white/70">May 17, 9:45 AM</td>
                      </tr>
                      <tr className="border-b border-loteraa-gray/40">
                        <td className="p-2 text-white">DataLogged</td>
                        <td className="p-2 text-white">motion-sensor-2</td>
                        <td className="p-2 text-white">true</td>
                        <td className="p-2 text-white/70">May 17, 9:30 AM</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-white">DataLogged</td>
                        <td className="p-2 text-white">motion-sensor-2</td>
                        <td className="p-2 text-white">false</td>
                        <td className="p-2 text-white/70">May 17, 9:15 AM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap justify-between pt-4 gap-2">
          <Button 
            variant="outline" 
            className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
            onClick={onClose}
          >
            Close
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
              onClick={handleExportContract}
            >
              <FileText className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button 
              className="bg-loteraa-purple hover:bg-loteraa-purple/90"
              onClick={() => {
                onClose();
                toast({
                  title: "Opening Editor",
                  description: "Edit contract dialog opened.",
                });
              }}
            >
              <Settings className="h-4 w-4 mr-1" />
              Edit Contract
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSmartContractDialog;
