
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Check, ChevronsUpDown, Upload, FileText, Eye } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const bindContractFormSchema = z.object({
  contractSelection: z.enum(["myContract", "pasteAddress"]),
  contractAddress: z.string().optional(),
  myContract: z.string().optional(),
  network: z.enum(["ethereum", "base", "loteraa"]).optional(),
  functionName: z.string().optional(),
  paramMappings: z.record(z.object({
    type: z.enum(["static", "iotData"]),
    value: z.string(),
    transform: z.string().optional()
  })).optional(),
  gasPaymentMethod: z.enum(["default", "prepaid"]),
  gasToken: z.enum(["POL", "USDC", "USDT", "TERRA"]).optional(),
  authToken: z.string().optional(),
});

type BindContractFormValues = z.infer<typeof bindContractFormSchema>;

interface BindSmartContractFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BindSmartContractForm({ open, onOpenChange }: BindSmartContractFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [contractABI, setContractABI] = useState<any>(null);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [functionParams, setFunctionParams] = useState<{ name: string; type: string }[]>([]);
  const [paramMappings, setParamMappings] = useState<Record<string, { type: string; value: string; transform?: string }>>({});
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [contractInfoDialog, setContractInfoDialog] = useState<string | null>(null);
  
  const mockContracts = [
    { name: "MyPaymentContract.sol", address: "0x123...456" },
    { name: "DataStorageContract.sol", address: "0x789...012" },
  ];

  const mockFunctions = [
    { name: "pay", signature: "pay(address,uint256)", params: [{ name: "_to", type: "address" }, { name: "_amount", type: "uint256" }] },
    { name: "setData", signature: "setData(string,uint256)", params: [{ name: "_key", type: "string" }, { name: "_value", type: "uint256" }] },
  ];

  const form = useForm<BindContractFormValues>({
    resolver: zodResolver(bindContractFormSchema),
    defaultValues: {
      contractSelection: "myContract",
      gasPaymentMethod: "default",
      gasToken: "POL",
    },
  });

  const contractSelection = form.watch("contractSelection");
  
  const validateContractABI = () => {
    // In production, this would call an API to validate the contract ABI
    // Mock implementation that simulates ABI validation
    const mockABI = mockFunctions;
    setContractABI(mockABI);
    toast.success("Contract ABI validated successfully");
    setCurrentStep(2);
  };

  const selectFunction = (funcSignature: string) => {
    const func = mockFunctions.find(f => f.signature === funcSignature);
    if (func) {
      setSelectedFunction(func.signature);
      setFunctionParams(func.params);
      
      // Initialize parameter mappings
      const initialMappings: Record<string, { type: string; value: string }> = {};
      func.params.forEach(param => {
        initialMappings[param.name] = { type: "static", value: "" };
      });
      setParamMappings(initialMappings);
      
      setCurrentStep(3);
    }
  };

  const handleParamTypeChange = (paramName: string, type: "static" | "iotData") => {
    setParamMappings(prev => ({
      ...prev,
      [paramName]: { ...prev[paramName], type, value: "" }
    }));
  };

  const handleParamValueChange = (paramName: string, value: string) => {
    setParamMappings(prev => ({
      ...prev,
      [paramName]: { ...prev[paramName], value }
    }));
  };

  const addTransformLogic = (paramName: string) => {
    setParamMappings(prev => ({
      ...prev,
      [paramName]: { ...prev[paramName], transform: prev[paramName].transform || "* 1.0" }
    }));
  };

  const handleTransformChange = (paramName: string, transform: string) => {
    setParamMappings(prev => ({
      ...prev,
      [paramName]: { ...prev[paramName], transform }
    }));
  };

  const handleSubmit = (values: BindContractFormValues) => {
    // In a real app, we would process the form data here
    console.log("Form values:", values);
    console.log("Parameter mappings:", paramMappings);
    
    toast.success("Smart contract binding created successfully!");
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(1);
    setContractABI(null);
    setSelectedFunction(null);
    setFunctionParams([]);
    setParamMappings({});
  };

  const onClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const testSimulation = () => {
    toast.info("Running test simulation...");
    // In production, this would actually run a simulation
    setTimeout(() => {
      toast.success("Simulation successful!");
    }, 1500);
  };

  const previewExecution = () => {
    toast.info("Generating preview...");
    // In production, this would show a detailed preview
    setTimeout(() => {
      toast.success("Preview ready");
    }, 1000);
  };

  const handleUploadContract = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.sol')) {
      toast.success(`Contract ${file.name} uploaded successfully!`);
      // In production, process the uploaded contract file
      setShowUploadDialog(false);
    } else {
      toast.error("Please upload a valid .sol file");
    }
  };

  const viewContractInfo = (contractAddress: string) => {
    const contract = mockContracts.find(c => c.address === contractAddress);
    if (contract) {
      setContractInfoDialog(contractAddress);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Bind Smart Contract</DialogTitle>
          <DialogDescription className="text-white/70">
            Connect your smart contracts to IoT devices.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-4">
            {/* Step 1: Select Smart Contract */}
            <div className={`space-y-4 ${currentStep !== 1 && 'hidden'}`}>
              <h3 className="text-lg font-medium text-white border-b border-loteraa-gray/30 pb-2">
                Step 1: Select Smart Contract
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="myContract" 
                    value="myContract"
                    checked={contractSelection === "myContract"}
                    onChange={() => form.setValue("contractSelection", "myContract")}
                    className="text-loteraa-purple focus:ring-loteraa-purple"
                  />
                  <label htmlFor="myContract" className="text-white">Choose from my contracts</label>
                </div>
                
                {contractSelection === "myContract" && (
                  <FormField
                    control={form.control}
                    name="myContract"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose contract</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white">
                              <SelectValue placeholder="Select contract" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-loteraa-gray border-loteraa-gray/40">
                            {mockContracts.map((contract) => (
                              <SelectItem key={contract.address} value={contract.address} className="text-white hover:bg-loteraa-gray/50">
                                <div className="flex items-center justify-between w-full">
                                  <span>{contract.name}</span>
                                  {contract.name === "DataStorageContract.sol" && (
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="ghost"
                                      className="p-1 h-6 w-6 ml-2"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowUploadDialog(true);
                                      }}
                                    >
                                      <Upload className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {contractSelection === "myContract" && form.watch("myContract") && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent text-loteraa-teal border-loteraa-teal/30 hover:bg-loteraa-teal/20"
                    onClick={() => viewContractInfo(form.watch("myContract")!)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Contract Info
                  </Button>
                )}
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="pasteAddress" 
                    value="pasteAddress" 
                    checked={contractSelection === "pasteAddress"}
                    onChange={() => form.setValue("contractSelection", "pasteAddress")}
                    className="text-loteraa-purple focus:ring-loteraa-purple"
                  />
                  <label htmlFor="pasteAddress" className="text-white">Paste contract address</label>
                </div>
                
                {contractSelection === "pasteAddress" && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="contractAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contract address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white"
                              placeholder="0x..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="network"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Network</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white">
                                <SelectValue placeholder="Select network" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-loteraa-gray border-loteraa-gray/40">
                              <SelectItem value="ethereum" className="text-white hover:bg-loteraa-gray/50">Ethereum</SelectItem>
                              <SelectItem value="base" className="text-white hover:bg-loteraa-gray/50">Base</SelectItem>
                              <SelectItem value="loteraa" className="text-white hover:bg-loteraa-gray/50">Loteraa</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                <Button
                  type="button"
                  onClick={validateContractABI}
                  className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90"
                  disabled={
                    (contractSelection === "myContract" && !form.watch("myContract")) ||
                    (contractSelection === "pasteAddress" && (!form.watch("contractAddress") || !form.watch("network")))
                  }
                >
                  Validate Contract ABI
                </Button>
              </div>
            </div>
            
            {/* Step 2: Choose Function to Bind */}
            <div className={`space-y-4 ${currentStep !== 2 && 'hidden'}`}>
              <h3 className="text-lg font-medium text-white border-b border-loteraa-gray/30 pb-2">
                Step 2: Choose Function to Bind
              </h3>
              
              <Select
                onValueChange={selectFunction}
              >
                <SelectTrigger className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white">
                  <SelectValue placeholder="Select function" />
                </SelectTrigger>
                <SelectContent className="bg-loteraa-gray border-loteraa-gray/40">
                  {mockFunctions.map((func) => (
                    <SelectItem key={func.signature} value={func.signature} className="text-white hover:bg-loteraa-gray/50">
                      {func.signature}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedFunction && (
                <div className="p-3 bg-loteraa-gray/30 rounded-md border border-loteraa-gray/40">
                  <p className="text-white font-mono">{selectedFunction}</p>
                </div>
              )}
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent text-white border-loteraa-gray/40 hover:bg-loteraa-gray/20"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
              </div>
            </div>
            
            {/* Step 3: Map Inputs to Trigger Data */}
            <div className={`space-y-4 ${currentStep !== 3 && 'hidden'}`}>
              <h3 className="text-lg font-medium text-white border-b border-loteraa-gray/30 pb-2">
                Step 3: Map Inputs to Trigger Data
              </h3>
              
              {functionParams.map((param) => (
                <div key={param.name} className="p-4 bg-loteraa-gray/20 rounded-md border border-loteraa-gray/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">
                      {param.name} <span className="text-white/60 text-sm">({param.type})</span>
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm text-white/70 mb-1 block">Data Source</label>
                      <Select
                        onValueChange={(value) => handleParamTypeChange(param.name, value as "static" | "iotData")}
                        defaultValue="static"
                      >
                        <SelectTrigger className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-gray border-loteraa-gray/40">
                          <SelectItem value="static" className="text-white hover:bg-loteraa-gray/50">Static Value</SelectItem>
                          <SelectItem value="iotData" className="text-white hover:bg-loteraa-gray/50">IoT Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      {paramMappings[param.name]?.type === "static" ? (
                        <div>
                          <label className="text-sm text-white/70 mb-1 block">Value</label>
                          <Input 
                            className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white"
                            placeholder={param.type === "address" ? "0x..." : "Enter value"}
                            onChange={(e) => handleParamValueChange(param.name, e.target.value)}
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="text-sm text-white/70 mb-1 block">IoT Data Field</label>
                          <Select
                            onValueChange={(value) => handleParamValueChange(param.name, value)}
                          >
                            <SelectTrigger className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white">
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent className="bg-loteraa-gray border-loteraa-gray/40">
                              <SelectItem value="sensorData.owner" className="text-white hover:bg-loteraa-gray/50">sensorData.owner</SelectItem>
                              <SelectItem value="sensorData.reading" className="text-white hover:bg-loteraa-gray/50">sensorData.reading</SelectItem>
                              <SelectItem value="sensorData.timestamp" className="text-white hover:bg-loteraa-gray/50">sensorData.timestamp</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {paramMappings[param.name]?.type === "iotData" && (
                    <div>
                      {paramMappings[param.name]?.transform ? (
                        <div className="mt-2">
                          <label className="text-sm text-white/70 mb-1 block">Transform Logic</label>
                          <div className="flex space-x-2">
                            <Input 
                              className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white"
                              placeholder="* 0.01"
                              value={paramMappings[param.name]?.transform}
                              onChange={(e) => handleTransformChange(param.name, e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="bg-transparent text-loteraa-purple border-loteraa-purple/30 hover:bg-loteraa-purple/10"
                              onClick={() => setParamMappings(prev => ({
                                ...prev,
                                [param.name]: { ...prev[param.name], transform: undefined }
                              }))}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2 bg-transparent text-loteraa-purple border-loteraa-purple/30 hover:bg-loteraa-purple/10"
                          onClick={() => addTransformLogic(param.name)}
                        >
                          + Add Transform Logic
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent text-white border-loteraa-gray/40 hover:bg-loteraa-gray/20"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="bg-loteraa-blue hover:bg-loteraa-blue/90"
                  onClick={() => setCurrentStep(4)}
                >
                  Next: Gas Settings
                </Button>
              </div>
            </div>
            
            {/* Step 4: Gas Settings */}
            <div className={`space-y-4 ${currentStep !== 4 && 'hidden'}`}>
              <h3 className="text-lg font-medium text-white border-b border-loteraa-gray/30 pb-2">
                Step 4: Gas Settings
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="defaultGas" 
                    checked={form.watch("gasPaymentMethod") === "default"}
                    onChange={() => form.setValue("gasPaymentMethod", "default")}
                    className="text-loteraa-purple focus:ring-loteraa-purple" 
                  />
                  <label htmlFor="defaultGas" className="text-white">Default (User pays gas)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="prepaidGas" 
                    checked={form.watch("gasPaymentMethod") === "prepaid"}
                    onChange={() => form.setValue("gasPaymentMethod", "prepaid")}
                    className="text-loteraa-purple focus:ring-loteraa-purple" 
                  />
                  <label htmlFor="prepaidGas" className="text-white">Prepaid via platform (for Enterprise)</label>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="gasToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token used for Gas</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-loteraa-gray border-loteraa-gray/40">
                        <SelectItem value="POL" className="text-white hover:bg-loteraa-gray/50">POL</SelectItem>
                        <SelectItem value="USDC" className="text-white hover:bg-loteraa-gray/50">USDC</SelectItem>
                        <SelectItem value="USDT" className="text-white hover:bg-loteraa-gray/50">USDT</SelectItem>
                        <SelectItem value="TERRA" className="text-white hover:bg-loteraa-gray/50">TERRA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="authToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authorization token (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white"
                        placeholder="Enter authorization token"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent text-loteraa-teal border-loteraa-teal/30 hover:bg-loteraa-teal/10"
                  onClick={testSimulation}
                >
                  Test Simulation
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent text-loteraa-blue border-loteraa-blue/30 hover:bg-loteraa-blue/10"
                  onClick={previewExecution}
                >
                  Preview Execution
                </Button>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent text-white border-loteraa-gray/40 hover:bg-loteraa-gray/20"
                  onClick={() => setCurrentStep(3)}
                >
                  Back
                </Button>
                
                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-transparent text-white border-loteraa-gray/40 hover:bg-loteraa-gray/20"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    className="bg-loteraa-teal hover:bg-loteraa-teal/90"
                  >
                    Bind Contract
                  </Button>
                </div>
              </div>
            </div>
            </form>
        </Form>

        {/* Upload Contract Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="sm:max-w-md bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Upload Smart Contract</DialogTitle>
              <DialogDescription className="text-white/70">
                Upload a .sol file to add to DataStorageContract.sol
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-loteraa-gray/40 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-loteraa-gray mx-auto mb-4" />
                <label className="cursor-pointer">
                  <span className="text-white">Click to upload or drag and drop</span>
                  <p className="text-sm text-white/60 mt-1">.sol files only</p>
                  <input
                    type="file"
                    accept=".sol"
                    className="hidden"
                    onChange={handleUploadContract}
                  />
                </label>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Contract Info Dialog */}
        <Dialog open={!!contractInfoDialog} onOpenChange={() => setContractInfoDialog(null)}>
          <DialogContent className="sm:max-w-lg bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Contract Information</DialogTitle>
            </DialogHeader>
            {contractInfoDialog && (() => {
              const contract = mockContracts.find(c => c.address === contractInfoDialog);
              return contract ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-white/70">Contract Name</label>
                      <p className="text-white font-mono">{contract.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-white/70">Address</label>
                      <p className="text-white font-mono break-all">{contract.address}</p>
                    </div>
                    <div>
                      <label className="text-sm text-white/70">Network</label>
                      <p className="text-white">Ethereum</p>
                    </div>
                    <div>
                      <label className="text-sm text-white/70">Status</label>
                      <p className="text-green-400">Active</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-white/70">Available Functions</label>
                    <div className="mt-2 space-y-2">
                      {mockFunctions.map((func) => (
                        <div key={func.signature} className="p-2 bg-loteraa-gray/30 rounded border border-loteraa-gray/40">
                          <p className="text-white font-mono text-sm">{func.signature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent text-white border-loteraa-gray/40 hover:bg-loteraa-gray/20"
                      onClick={() => {
                        navigator.clipboard.writeText(contract.address);
                        toast.success("Address copied to clipboard");
                      }}
                    >
                      Copy Address
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent text-loteraa-teal border-loteraa-teal/30 hover:bg-loteraa-teal/20"
                      onClick={() => setContractInfoDialog(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : null;
            })()}
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
