
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle, ChevronDown, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CreateAutomationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateAutomationForm({ open, onOpenChange }: CreateAutomationFormProps) {
  // State for the form
  const [step, setStep] = useState<string>("step-1");
  const [conditions, setConditions] = useState([{ field: "temperature", operation: ">", value: "30", unit: "°C" }]);
  const [triggerMethod, setTriggerMethod] = useState<string>("onChange");
  const [selectedActionType, setSelectedActionType] = useState<string>("smartContract");

  // Mock data for dropdowns
  const connectedDevices = [
    { id: "device1", name: "Temperature Sensor" },
    { id: "device2", name: "Humidity Sensor" },
    { id: "device3", name: "Power Meter" },
  ];

  // Handler to add more conditions
  const addCondition = () => {
    setConditions([...conditions, { field: "", operation: "", value: "", unit: "" }]);
  };

  // Available data fields based on selected device
  const dataFields = {
    "device1": ["temperature"],
    "device2": ["humidity"],
    "device3": ["voltage", "current", "power"]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90%] md:max-w-[700px] max-h-[90vh] overflow-y-auto bg-loteraa-black border border-loteraa-gray/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Create Automation Rule</DialogTitle>
          <DialogDescription className="text-white/60">
            Configure your IoT automation with blockchain actions.
          </DialogDescription>
        </DialogHeader>
        
        <Accordion type="single" collapsible className="w-full" defaultValue="step-1">
          {/* Step 1: Define Automation Info */}
          <AccordionItem value="step-1" className="border-loteraa-gray/30">
            <AccordionTrigger className="text-white hover:text-loteraa-purple">
              Step 1: Define Automation Info
            </AccordionTrigger>
            <AccordionContent className="text-white/80 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="automation-name" className="text-white">Automation Name</Label>
                <Input 
                  id="automation-name" 
                  placeholder="Enter automation name" 
                  className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="automation-description" className="text-white">Description (optional)</Label>
                <Textarea 
                  id="automation-description" 
                  placeholder="Describe what this automation does" 
                  className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="select-device" className="text-white">Select IoT Device</Label>
                <Select>
                  <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="Choose from connected devices" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                    {connectedDevices.map((device) => (
                      <SelectItem key={device.id} value={device.id} className="text-white">
                        {device.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="select-data-feed" className="text-white">Select Data Feed</Label>
                <Select>
                  <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="Temperature" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                    <SelectItem value="temperature" className="text-white">Temperature</SelectItem>
                    <SelectItem value="humidity" className="text-white">Humidity</SelectItem>
                    <SelectItem value="voltage" className="text-white">Voltage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="button" 
                className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white"
                onClick={() => document.getElementById('step-2-trigger')?.click()}
              >
                Next
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Step 2: Set Trigger Condition */}
          <AccordionItem value="step-2" className="border-loteraa-gray/30">
            <AccordionTrigger id="step-2-trigger" className="text-white hover:text-loteraa-purple">
              Step 2: Set Trigger Condition
            </AccordionTrigger>
            <AccordionContent className="text-white/80 space-y-4">
              <div className="space-y-4">
                <p className="text-white font-medium">When this condition is met:</p>
                
                {conditions.map((condition, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 border border-loteraa-gray/20 rounded-md p-3 bg-loteraa-gray/10">
                    <div>
                      <Label className="text-white text-sm mb-1 block">Data Field</Label>
                      <Select>
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder={condition.field || "Select field"} />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                          <SelectItem value="temperature" className="text-white">Temperature</SelectItem>
                          <SelectItem value="humidity" className="text-white">Humidity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-white text-sm mb-1 block">Operation</Label>
                      <Select>
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder={condition.operation || "Operation"} />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                          <SelectItem value="greater" className="text-white">{">"}</SelectItem>
                          <SelectItem value="less" className="text-white">{"<"}</SelectItem>
                          <SelectItem value="equal" className="text-white">{"="}</SelectItem>
                          <SelectItem value="not-equal" className="text-white">{"!="}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-white text-sm mb-1 block">Value</Label>
                      <Input 
                        placeholder={condition.value || "30"} 
                        className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white text-sm mb-1 block">Unit</Label>
                      <Select>
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder={condition.unit || "°C"} />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                          <SelectItem value="celsius" className="text-white">°C</SelectItem>
                          <SelectItem value="fahrenheit" className="text-white">°F</SelectItem>
                          <SelectItem value="percent" className="text-white">%</SelectItem>
                          <SelectItem value="volt" className="text-white">V</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-loteraa-gray/30 text-white flex items-center"
                  onClick={addCondition}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add More Condition
                </Button>
                
                <div className="space-y-2 mt-4">
                  <Label className="text-white">Frequency/Interval</Label>
                  <Select>
                    <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                      <SelectValue placeholder="Every 10 mins" />
                    </SelectTrigger>
                    <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                      <SelectItem value="1min" className="text-white">Every 1 min</SelectItem>
                      <SelectItem value="5min" className="text-white">Every 5 mins</SelectItem>
                      <SelectItem value="10min" className="text-white">Every 10 mins</SelectItem>
                      <SelectItem value="30min" className="text-white">Every 30 mins</SelectItem>
                      <SelectItem value="1hour" className="text-white">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Trigger Method</Label>
                  <RadioGroup 
                    defaultValue={triggerMethod}
                    onValueChange={setTriggerMethod}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onChange" id="onChange" className="border-loteraa-gray/30 text-loteraa-purple" />
                      <Label htmlFor="onChange" className="text-white">On Change</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onInterval" id="onInterval" className="border-loteraa-gray/30 text-loteraa-purple" />
                      <Label htmlFor="onInterval" className="text-white">On Interval</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-loteraa-gray/30 text-white"
                    onClick={() => document.getElementById('step-1')?.click()}
                  >
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white"
                    onClick={() => document.getElementById('step-3-trigger')?.click()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Step 3: Choose Action */}
          <AccordionItem value="step-3" className="border-loteraa-gray/30">
            <AccordionTrigger id="step-3-trigger" className="text-white hover:text-loteraa-purple">
              Step 3: Choose Action
            </AccordionTrigger>
            <AccordionContent className="text-white/80 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="action-type" className="text-white">Action Type</Label>
                  <Select 
                    value={selectedActionType}
                    onValueChange={setSelectedActionType}
                  >
                    <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                      <SelectValue placeholder="Smart Contract" />
                    </SelectTrigger>
                    <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                      <SelectItem value="smartContract" className="text-white">Smart Contract</SelectItem>
                      <SelectItem value="payment" className="text-white">Payment Transfer</SelectItem>
                      <SelectItem value="notification" className="text-white">Send Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedActionType === "smartContract" && (
                  <div className="space-y-2">
                    <Label htmlFor="select-contract" className="text-white">Select Smart Contract</Label>
                    <Select>
                      <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                        <SelectValue placeholder="Bind Existing" />
                      </SelectTrigger>
                      <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                        <SelectItem value="bind" className="text-white">Bind Existing</SelectItem>
                        <SelectItem value="create" className="text-white">Create New</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedActionType === "payment" && (
                  <div className="space-y-2">
                    <Label htmlFor="recipient" className="text-white">Recipient Address</Label>
                    <Input 
                      id="recipient" 
                      placeholder="0x..." 
                      className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                    />
                    <Label htmlFor="amount" className="text-white mt-4">Amount</Label>
                    <Input 
                      id="amount" 
                      placeholder="0.01" 
                      className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                    />
                  </div>
                )}
                
                {selectedActionType === "notification" && (
                  <div className="space-y-2">
                    <Label htmlFor="webhook" className="text-white">Webhook URL</Label>
                    <Input 
                      id="webhook" 
                      placeholder="https://" 
                      className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                    />
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-loteraa-gray/30 text-white"
                    onClick={() => document.getElementById('step-2-trigger')?.click()}
                  >
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white"
                    onClick={() => onOpenChange(false)}
                  >
                    Create Automation
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
