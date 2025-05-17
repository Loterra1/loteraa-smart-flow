
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
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

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
  const [contractActionType, setContractActionType] = useState<string>("bind");
  const [notificationDestination, setNotificationDestination] = useState<string>("email");

  // Form data state to collect all inputs
  const [formData, setFormData] = useState({
    name: "Heat Alert Automation",
    description: "",
    device: "device1",
    dataFeed: "temperature",
    conditions: [{ field: "temperature", operation: ">", value: "30", unit: "°C" }],
    frequency: "10min",
    triggerMethod: "onChange",
    actionType: "smartContract",
    contractMethod: "transfer(address, uint256)",
    authToken: "",
    parameters: "",
    notificationMessage: "Temperature exceed 30°C",
    notificationDestination: "email",
    paymentAmount: "",
    paymentRecipient: "Device owner",
    paymentReason: "Compensation for data usage"
  });

  // Mock data for dropdowns
  const connectedDevices = [
    { id: "device1", name: "Greenhouse sensor #12" },
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

  // Handler to update the form data
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Handler to save the automation
  const handleSaveAutomation = () => {
    // Here you would typically send the formData to your API
    console.log("Saving automation:", formData);
    // Close the dialog
    onOpenChange(false);
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
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="automation-description" className="text-white">Description (optional)</Label>
                <Textarea 
                  id="automation-description" 
                  placeholder="Describe what this automation does" 
                  className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white min-h-[80px]"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="select-device" className="text-white">Select IoT Device</Label>
                <Select 
                  value={formData.device}
                  onValueChange={(value) => handleInputChange("device", value)}
                >
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
                <Select
                  value={formData.dataFeed}
                  onValueChange={(value) => handleInputChange("dataFeed", value)}
                >
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
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) => handleInputChange("frequency", value)}
                  >
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
                    onValueChange={(value) => {
                      setTriggerMethod(value);
                      handleInputChange("triggerMethod", value);
                    }}
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
                    onValueChange={(value) => {
                      setSelectedActionType(value);
                      handleInputChange("actionType", value);
                    }}
                  >
                    <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                      <SelectValue placeholder="Smart Contract" />
                    </SelectTrigger>
                    <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                      <SelectItem value="smartContract" className="text-white">Smart Contract</SelectItem>
                      <SelectItem value="payment" className="text-white">Token Payment</SelectItem>
                      <SelectItem value="notification" className="text-white">Send Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedActionType === "smartContract" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="select-contract" className="text-white">Select Smart Contract</Label>
                      <Select
                        value={contractActionType}
                        onValueChange={setContractActionType}
                      >
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder="Bind Existing" />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                          <SelectItem value="bind" className="text-white">Bind Existing</SelectItem>
                          <SelectItem value="create" className="text-white">Create New</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {contractActionType === "bind" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="contract-method" className="text-white">Contract Method to Call</Label>
                          <Select
                            value={formData.contractMethod}
                            onValueChange={(value) => handleInputChange("contractMethod", value)}
                          >
                            <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                              <SelectValue placeholder="transfer(address, uint256)" />
                            </SelectTrigger>
                            <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                              <SelectItem value="transfer(address, uint256)" className="text-white">transfer(address, uint256)</SelectItem>
                              <SelectItem value="approve(address, uint256)" className="text-white">approve(address, uint256)</SelectItem>
                              <SelectItem value="mint(address, uint256)" className="text-white">mint(address, uint256)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="auth-token" className="text-white">Authorization Token (if required)</Label>
                          <Input 
                            id="auth-token" 
                            placeholder="Enter authorization token" 
                            className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                            value={formData.authToken}
                            onChange={(e) => handleInputChange("authToken", e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="parameters" className="text-white">Parameters (if required)</Label>
                          <Input 
                            id="parameters" 
                            placeholder="Enter wallet address or dynamic variable" 
                            className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                            value={formData.parameters}
                            onChange={(e) => handleInputChange("parameters", e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    {/* Add notification option after smart contract parameters */}
                    <div className="space-y-2 pt-4 border-t border-loteraa-gray/30">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="send-notification" className="border-loteraa-gray/30 data-[state=checked]:bg-loteraa-purple" />
                        <Label htmlFor="send-notification" className="text-white">Also send notification</Label>
                      </div>
                      
                      <div className="pl-6 space-y-2 mt-2">
                        <Label htmlFor="notification-message-sc" className="text-white">Message</Label>
                        <Input 
                          id="notification-message-sc" 
                          placeholder="Temperature exceed 30°C" 
                          className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        />
                        
                        <Label htmlFor="notification-destination-sc" className="text-white">Send to</Label>
                        <Select>
                          <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                            <SelectValue placeholder="Your email" />
                          </SelectTrigger>
                          <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                            <SelectItem value="email" className="text-white">Your email</SelectItem>
                            <SelectItem value="dashboard" className="text-white">Dashboard</SelectItem>
                            <SelectItem value="webhook" className="text-white">Webhook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {selectedActionType === "notification" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notification-message" className="text-white">Message</Label>
                      <Input 
                        id="notification-message" 
                        placeholder="Temperature exceed 30°C" 
                        className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        value={formData.notificationMessage}
                        onChange={(e) => handleInputChange("notificationMessage", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notification-destination" className="text-white">Send to</Label>
                      <Select
                        value={notificationDestination}
                        onValueChange={(value) => {
                          setNotificationDestination(value);
                          handleInputChange("notificationDestination", value);
                        }}
                      >
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder="Your email" />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                          <SelectItem value="email" className="text-white">Your email</SelectItem>
                          <SelectItem value="dashboard" className="text-white">Dashboard</SelectItem>
                          <SelectItem value="webhook" className="text-white">Webhook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {notificationDestination === "webhook" && (
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url" className="text-white">Webhook URL</Label>
                        <Input 
                          id="webhook-url" 
                          placeholder="https://" 
                          className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        />
                      </div>
                    )}
                  </div>
                )}

                {selectedActionType === "payment" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment-amount" className="text-white">Send</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="payment-amount" 
                          placeholder="Amount" 
                          className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                          value={formData.paymentAmount}
                          onChange={(e) => handleInputChange("paymentAmount", e.target.value)}
                        />
                        <span className="flex items-center text-white">sensor token</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-recipient" className="text-white">To</Label>
                      <Select
                        value={formData.paymentRecipient}
                        onValueChange={(value) => handleInputChange("paymentRecipient", value)}
                      >
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder="Device owner" />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                          <SelectItem value="Device owner" className="text-white">Device owner</SelectItem>
                          <SelectItem value="Developer" className="text-white">Developer</SelectItem>
                          <SelectItem value="Custom" className="text-white">Custom address</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {formData.paymentRecipient === "Custom" && (
                      <div className="space-y-2">
                        <Label htmlFor="custom-address" className="text-white">Custom Address</Label>
                        <Input 
                          id="custom-address" 
                          placeholder="0x..." 
                          className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-reason" className="text-white">Reason</Label>
                      <Input 
                        id="payment-reason" 
                        placeholder="Compensation for data usage" 
                        className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        value={formData.paymentReason}
                        onChange={(e) => handleInputChange("paymentReason", e.target.value)}
                      />
                    </div>
                    
                    {/* Add notification option after payment configuration */}
                    <div className="space-y-2 pt-4 border-t border-loteraa-gray/30">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="send-notification-payment" className="border-loteraa-gray/30 data-[state=checked]:bg-loteraa-purple" />
                        <Label htmlFor="send-notification-payment" className="text-white">Also send notification</Label>
                      </div>
                      
                      <div className="pl-6 space-y-2 mt-2">
                        <Label htmlFor="notification-message-payment" className="text-white">Message</Label>
                        <Input 
                          id="notification-message-payment" 
                          placeholder="Payment of sensor tokens sent" 
                          className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        />
                        
                        <Label htmlFor="notification-destination-payment" className="text-white">Send to</Label>
                        <Select>
                          <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                            <SelectValue placeholder="Your email" />
                          </SelectTrigger>
                          <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                            <SelectItem value="email" className="text-white">Your email</SelectItem>
                            <SelectItem value="dashboard" className="text-white">Dashboard</SelectItem>
                            <SelectItem value="webhook" className="text-white">Webhook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
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
                    onClick={() => document.getElementById('step-4-trigger')?.click()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Step 4: Review & Save */}
          <AccordionItem value="step-4" className="border-loteraa-gray/30">
            <AccordionTrigger id="step-4-trigger" className="text-white hover:text-loteraa-purple">
              Step 4: Review & Save
            </AccordionTrigger>
            <AccordionContent className="text-white/80 space-y-6">
              <div className="rounded-md border border-loteraa-gray/30 p-4 bg-loteraa-gray/5">
                <h3 className="font-medium text-lg text-white mb-4">Summary</h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="text-white/60">Name:</div>
                    <div className="text-white sm:col-span-2">{formData.name}</div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="text-white/60">Device:</div>
                    <div className="text-white sm:col-span-2">
                      {connectedDevices.find(d => d.id === formData.device)?.name || formData.device}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="text-white/60">Trigger:</div>
                    <div className="text-white sm:col-span-2">
                      Temperature &gt; 30°C every 10 mins
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="text-white/60">Action:</div>
                    <div className="text-white sm:col-span-2">
                      {formData.actionType === "smartContract" 
                        ? "Trigger Smart Contract " + (selectedActionType === "notification" ? "+ notify" : "")
                        : formData.actionType === "payment" 
                          ? "Send payment" + (selectedActionType === "notification" ? " + notify" : "")
                          : "Send notification"}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="text-white/60">Status:</div>
                    <div className="text-white sm:col-span-2">
                      <span className="text-yellow-400">Will be active after saving</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-loteraa-gray/30 text-white"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white"
                  onClick={handleSaveAutomation}
                >
                  Save & Activate
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
