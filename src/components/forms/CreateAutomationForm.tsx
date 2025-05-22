import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Plus, Trash, AlertTriangle, Upload, FileCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSmartContracts } from "@/hooks/useSmartContracts";
import { SmartContract } from '@/types/smartContract';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  triggerSource: z.string({
    required_error: "Please select a trigger source.",
  }),
  actionType: z.string({
    required_error: "Please select an action type.",
  }),
  isActive: z.boolean().default(true),
  triggerMethod: z.enum(["onChange", "onInterval"]).default("onChange"),
  triggerInterval: z.string().optional(),
  conditionOperator: z.string().optional(),
  conditionValue: z.string().optional(),
  contractAction: z.string().optional(),
  contractMethod: z.string().optional(),
  selectedContract: z.string().optional(),
  contractCode: z.string().optional(),
  contractAbi: z.string().optional(),
  authToken: z.string().optional(),
  contractParams: z.string().optional(),
  paymentAmount: z.string().optional(),
  paymentRecipient: z.string().optional(),
  paymentReason: z.string().optional(),
});

interface AutomationType {
  id: string;
  name: string;
  triggerSource: string;
  actionType: string;
  status: "Active" | "Paused";
  lastTrigger: string;
}

interface CreateAutomationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAutomationCreated?: (automation: AutomationType) => void;
}

export default function CreateAutomationForm({ 
  open, 
  onOpenChange,
  onAutomationCreated 
}: CreateAutomationFormProps) {
  const [step, setStep] = useState(1);
  const [conditions, setConditions] = useState<{id: string, sensor: string, operator: string, value: string}[]>([
    { id: "1", sensor: "Temperature sensor", operator: ">", value: "30°C" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customMethodInput, setCustomMethodInput] = useState(false);
  const [contractFile, setContractFile] = useState<File | null>(null);
  const { contracts } = useSmartContracts();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      triggerSource: "",
      actionType: "",
      isActive: true,
      triggerMethod: "onChange",
      triggerInterval: "10mins",
      conditionOperator: ">",
      conditionValue: "30",
      contractAction: "",
      contractMethod: "",
      selectedContract: "",
      contractCode: "",
      contractAbi: "",
      authToken: "",
      contractParams: "",
      paymentAmount: "",
      paymentRecipient: "Device owner",
      paymentReason: "Compensation for data usage",
    },
  });

  // Pre-defined contract methods
  const contractMethods = [
    { value: "transfer", label: "transfer(address, uint256)" },
    { value: "approve", label: "approve(address, uint256)" },
    { value: "mint", label: "mint(address, uint256)" },
    { value: "burn", label: "burn(uint256)" },
    { value: "custom", label: "Custom method..." },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Create a new automation
    const newAutomation: AutomationType = {
      id: Math.random().toString(36).substr(2, 9),
      name: values.name,
      triggerSource: values.triggerSource,
      actionType: values.actionType,
      status: values.isActive ? "Active" : "Paused",
      lastTrigger: "Just now",
    };
    
    // Call the onAutomationCreated callback with the new automation
    if (onAutomationCreated) {
      onAutomationCreated(newAutomation);
    }
    
    // Show success message
    toast.success("Automation created successfully", {
      description: `Your ${values.name} automation has been created and is now ${values.isActive ? 'active' : 'paused'}.`,
    });
    
    // Reset form and close dialog
    form.reset();
    setStep(1);
    setConditions([{ id: "1", sensor: "Temperature sensor", operator: ">", value: "30°C" }]);
    setIsSubmitting(false);
    onOpenChange(false);
  }

  const nextStep = () => {
    const currentValues = form.getValues();
    
    // Simple validation for each step
    if (step === 1 && !currentValues.name) {
      form.setError("name", {
        type: "manual",
        message: "Name is required"
      });
      return;
    }
    
    if (step === 2 && !currentValues.triggerSource) {
      form.setError("triggerSource", {
        type: "manual",
        message: "Please select a trigger source"
      });
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const addCondition = () => {
    setConditions([
      ...conditions, 
      {
        id: Math.random().toString(36).substr(2, 9),
        sensor: "Temperature sensor",
        operator: ">",
        value: "25°C"
      }
    ]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(c => c.id !== id));
    } else {
      toast("Cannot remove - you need at least one condition");
    }
  };

  const updateCondition = (id: string, field: string, value: string) => {
    setConditions(conditions.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContractFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          form.setValue('contractCode', event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleContractActionChange = (value: string) => {
    form.setValue('contractAction', value);
    // Reset selected contract and method when switching contract action type
    form.setValue('selectedContract', '');
    form.setValue('contractMethod', '');
    form.setValue('contractCode', '');
    form.setValue('contractAbi', '');
    setCustomMethodInput(false);
  };

  const handleMethodChange = (value: string) => {
    if (value === 'custom') {
      setCustomMethodInput(true);
      form.setValue('contractMethod', '');
    } else {
      setCustomMethodInput(false);
      form.setValue('contractMethod', value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-loteraa-gray border-loteraa-gray/30 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create New Automation</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="w-full bg-loteraa-gray/30 rounded-lg p-2 mb-6">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div 
                    key={s} 
                    className={`flex flex-col items-center ${step === s ? 'text-loteraa-purple' : 'text-white/50'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === s ? 'bg-loteraa-purple text-white' : step > s ? 'bg-loteraa-purple/30 text-white' : 'bg-loteraa-gray/50 text-white/50'}`}>
                      {step > s ? <Check className="h-4 w-4" /> : s}
                    </div>
                    <span className="text-xs">Step {s}</span>
                  </div>
                ))}
              </div>
              <div className="w-full h-1 bg-loteraa-gray/20 mt-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-loteraa-purple transition-all duration-300" 
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Automation Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter a name for this automation" 
                          className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Select Trigger Source */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Trigger Source</h3>
                <FormField
                  control={form.control}
                  name="triggerSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Trigger Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                            <SelectValue placeholder="Select trigger source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                          <SelectItem value="CO² sensor">CO² sensor</SelectItem>
                          <SelectItem value="Power meter">Power meter</SelectItem>
                          <SelectItem value="Temperature sensor">Temperature sensor</SelectItem>
                          <SelectItem value="Water quality monitor">Water quality monitor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Trigger Method</h4>
                  <FormField
                    control={form.control}
                    name="triggerMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="onChange" id="onChange" />
                              <FormLabel htmlFor="onChange" className="font-normal cursor-pointer">
                                On Change
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="onInterval" id="onInterval" />
                              <FormLabel htmlFor="onInterval" className="font-normal cursor-pointer">
                                On Interval
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("triggerMethod") === "onInterval" && (
                  <FormField
                    control={form.control}
                    name="triggerInterval"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Frequency / Interval</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                              <SelectValue placeholder="Select interval" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                            <SelectItem value="1min">Every 1 minute</SelectItem>
                            <SelectItem value="5mins">Every 5 minutes</SelectItem>
                            <SelectItem value="10mins">Every 10 minutes</SelectItem>
                            <SelectItem value="30mins">Every 30 minutes</SelectItem>
                            <SelectItem value="1hour">Every hour</SelectItem>
                            <SelectItem value="6hours">Every 6 hours</SelectItem>
                            <SelectItem value="12hours">Every 12 hours</SelectItem>
                            <SelectItem value="1day">Every day</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            {/* Step 3: Set Trigger Conditions */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Set Trigger Conditions</h3>
                <p className="text-sm text-white/70">Define when this automation should be triggered</p>
                
                <div className="space-y-3">
                  {conditions.map((condition, index) => (
                    <Card key={condition.id} className="bg-loteraa-black/30 border-loteraa-gray/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Condition {index + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-loteraa-gray/30"
                            onClick={() => removeCondition(condition.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <FormLabel className="text-xs text-white/70">Sensor</FormLabel>
                            <Select 
                              defaultValue={condition.sensor}
                              onValueChange={(value) => updateCondition(condition.id, 'sensor', value)}
                            >
                              <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white h-9 text-sm">
                                <SelectValue placeholder="Select sensor" />
                              </SelectTrigger>
                              <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                                <SelectItem value="Temperature sensor">Temperature sensor</SelectItem>
                                <SelectItem value="CO² sensor">CO² sensor</SelectItem>
                                <SelectItem value="Power meter">Power meter</SelectItem>
                                <SelectItem value="Water quality monitor">Water quality monitor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <FormLabel className="text-xs text-white/70">Operator</FormLabel>
                            <Select 
                              defaultValue={condition.operator}
                              onValueChange={(value) => updateCondition(condition.id, 'operator', value)}
                            >
                              <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white h-9 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                                <SelectItem value=">">Greater than (&gt;)</SelectItem>
                                <SelectItem value="<">Less than (&lt;)</SelectItem>
                                <SelectItem value="=">Equal to (=)</SelectItem>
                                <SelectItem value="!=">Not equal to (!=)</SelectItem>
                                <SelectItem value=">=">Greater or equal (≥)</SelectItem>
                                <SelectItem value="<=">Less or equal (≤)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <FormLabel className="text-xs text-white/70">Value</FormLabel>
                            <Input 
                              className="bg-loteraa-black/50 border-loteraa-gray/30 text-white h-9 text-sm" 
                              defaultValue={condition.value}
                              onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent border-dashed border-loteraa-purple/50 text-loteraa-purple hover:bg-loteraa-purple/10"
                    onClick={addCondition}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add More Condition
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Choose Action */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Choose Action</h3>
                
                <Tabs defaultValue="smartcontract" className="w-full">
                  <TabsList className="grid grid-cols-2 bg-loteraa-black/30">
                    <TabsTrigger value="smartcontract">Smart Contract</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="smartcontract" className="pt-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="contractAction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Select Smart Contract</FormLabel>
                            <Select onValueChange={handleContractActionChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                                <SelectItem value="bind">Bind Existing</SelectItem>
                                <SelectItem value="create">Create New</SelectItem>
                                <SelectItem value="upload">Upload Contract</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("contractAction") === "bind" && (
                        <FormField
                          control={form.control}
                          name="selectedContract"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Select Contract</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                                    <SelectValue placeholder="Select existing contract" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white max-h-[200px]">
                                  {contracts.map((contract) => (
                                    <SelectItem key={contract.id} value={contract.id}>
                                      {contract.name} ({contract.type})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {form.watch("contractAction") === "create" && (
                        <div className="space-y-4">
                          <FormItem>
                            <FormLabel className="text-white">Contract Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter contract name" 
                                className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                                onChange={(e) => form.setValue('selectedContract', e.target.value)}
                              />
                            </FormControl>
                          </FormItem>
                          
                          <FormItem>
                            <FormLabel className="text-white">Contract Code</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="// Enter your contract code here" 
                                className="bg-loteraa-black/50 border-loteraa-gray/30 text-white font-mono h-32" 
                                onChange={(e) => form.setValue('contractCode', e.target.value)}
                              />
                            </FormControl>
                            <p className="text-xs text-white/60 mt-1">Write your smart contract code using Solidity or another supported language</p>
                          </FormItem>
                        </div>
                      )}

                      {form.watch("contractAction") === "upload" && (
                        <div className="space-y-4">
                          <FormItem>
                            <FormLabel className="text-white">Upload Contract File</FormLabel>
                            <FormControl>
                              <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-loteraa-gray/30 rounded-md bg-loteraa-black/30">
                                {contractFile ? (
                                  <div className="flex flex-col items-center gap-2">
                                    <FileCode className="h-10 w-10 text-loteraa-purple" />
                                    <p className="text-sm">{contractFile.name}</p>
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={() => {
                                        setContractFile(null);
                                        form.setValue('contractCode', '');
                                      }}
                                      className="border-loteraa-purple/50 text-loteraa-purple"
                                    >
                                      Change File
                                    </Button>
                                  </div>
                                ) : (
                                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                                    <Upload className="h-10 w-10 text-loteraa-gray/70" />
                                    <p className="text-sm text-center">
                                      Click to select contract file<br />
                                      <span className="text-xs text-white/50">Supports .sol, .json files</span>
                                    </p>
                                    <Input 
                                      type="file" 
                                      accept=".sol,.json" 
                                      className="hidden" 
                                      onChange={handleFileChange} 
                                    />
                                  </label>
                                )}
                              </div>
                            </FormControl>
                          </FormItem>

                          {contractFile && (
                            <FormItem>
                              <FormLabel className="text-white">Contract Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter contract name" 
                                  className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                                  defaultValue={contractFile.name.split('.')[0]}
                                  onChange={(e) => form.setValue('selectedContract', e.target.value)}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        </div>
                      )}

                      {form.watch("contractAction") && (
                        <FormField
                          control={form.control}
                          name="contractMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Contract Method to Call</FormLabel>
                              <Select 
                                onValueChange={handleMethodChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                                    <SelectValue placeholder="Select method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                                  {contractMethods.map((method) => (
                                    <SelectItem key={method.value} value={method.value}>
                                      {method.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {customMethodInput && (
                        <FormItem>
                          <FormLabel className="text-white">Custom Method Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. setThreshold(uint256)" 
                              className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                              onChange={(e) => form.setValue('contractMethod', e.target.value)}
                            />
                          </FormControl>
                        </FormItem>
                      )}

                      {form.watch("contractAction") && (
                        <>
                          <FormField
                            control={form.control}
                            name="authToken"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Authorization Token (if required)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter auth token" 
                                    className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="contractParams"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Parameters (if required)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter wallet address or dynamic variable" 
                                    className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="pt-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="paymentAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Send Amount (Terra tokens)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                placeholder="Enter token amount" 
                                className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="paymentRecipient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Payment Recipient</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                                  <SelectValue placeholder="Select recipient" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                                <SelectItem value="Device owner">Device Owner</SelectItem>
                                <SelectItem value="Developer">Developer</SelectItem>
                                <SelectItem value="Data provider">Data Provider</SelectItem>
                                <SelectItem value="Custom">Custom Address</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("paymentRecipient") === "Custom" && (
                        <FormItem>
                          <FormLabel className="text-white">Custom Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter wallet address" 
                              className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}

                      <FormField
                        control={form.control}
                        name="paymentReason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Payment Reason</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter reason for payment" 
                                className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Step 5: Review & Save */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Review & Save</h3>
                
                <Card className="bg-loteraa-black/30 border-loteraa-gray/30">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-loteraa-gray/20 pb-2">
                        <span className="text-white/70">Name:</span>
                        <span className="font-medium">{form.getValues("name")}</span>
                      </div>
                      
                      <div className="flex justify-between border-b border-loteraa-gray/20 pb-2">
                        <span className="text-white/70">Device:</span>
                        <span className="font-medium">{form.getValues("triggerSource")}</span>
                      </div>
                      
                      <div className="flex justify-between border-b border-loteraa-gray/20 pb-2">
                        <span className="text-white/70">Trigger:</span>
                        <span className="font-medium">
                          {conditions[0]?.sensor} {conditions[0]?.operator} {conditions[0]?.value}
                          {conditions.length > 1 && ` (+${conditions.length - 1} more)`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between border-b border-loteraa-gray/20 pb-2">
                        <span className="text-white/70">Action:</span>
                        <span className="font-medium">
                          {form.watch("contractAction") ? 
                            `Smart Contract (${form.watch("contractAction") === "bind" ? "Bind Existing" : 
                             form.watch("contractAction") === "create" ? "Create New" : "Upload"})` : 
                            "Token Payment"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span>Will be activated after saving</span>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-loteraa-purple"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="bg-loteraa-gray/20 rounded p-3 mt-4 flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <p className="text-white/80">
                          This automation will run automatically based on the conditions set. 
                          You can pause it anytime from the automations dashboard.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30 w-full sm:w-auto"
                >
                  Back
                </Button>
              )}
              
              {step < 5 ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white w-full sm:w-auto"
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save & Activate'}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
