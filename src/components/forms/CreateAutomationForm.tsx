
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { PlusCircle, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CreateAutomationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateAutomationForm({ open, onOpenChange }: CreateAutomationFormProps) {
  // State for the form
  const [step, setStep] = useState<string>("step-1");
  const [conditions, setConditions] = useState([{ field: "", operation: "", value: "", unit: "" }]);
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [actionType, setActionType] = useState("");

  // Handler to add more conditions
  const addCondition = () => {
    setConditions([...conditions, { field: "", operation: "", value: "", unit: "" }]);
  };

  // Example devices and APIs for selection
  const dataSources = [
    { id: "temp_sensor_1", name: "temperaturesensor_xyz", type: "My IoT device" },
    { id: "openweather", name: "OpenWeather_Api", type: "Public Open Source API" },
    { id: "research_data_1", name: "ClimateData_Research", type: "Research Data" },
    { id: "external_api_1", name: "SmartCity_API", type: "External platform API" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90%] md:max-w-[700px] max-h-[90vh] overflow-y-auto bg-loteraa-black border border-loteraa-gray/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Create Automation Rule</DialogTitle>
        </DialogHeader>
        
        <Accordion type="single" collapsible className="w-full" defaultValue="step-1">
          {/* Step 1: Rule Details */}
          <AccordionItem value="step-1" className="border-loteraa-gray/30">
            <AccordionTrigger className="text-white hover:text-loteraa-purple">
              Step 1: Rule Details
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
                <Label htmlFor="automation-description" className="text-white">Description</Label>
                <Textarea 
                  id="automation-description" 
                  placeholder="Describe what this automation does" 
                  className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white min-h-[80px]"
                />
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

          {/* Step 2: Select Data Source */}
          <AccordionItem value="step-2" className="border-loteraa-gray/30">
            <AccordionTrigger id="step-2-trigger" className="text-white hover:text-loteraa-purple">
              Step 2: Select Data Source (Device/API)
            </AccordionTrigger>
            <AccordionContent className="text-white/80 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-source-type" className="text-white">Choose Data Source Type</Label>
                <Select>
                  <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="Select data source type" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                    <SelectItem value="my-iot-device" className="text-white">My IoT Device</SelectItem>
                    <SelectItem value="public-api" className="text-white">Public Open Source API</SelectItem>
                    <SelectItem value="research-data" className="text-white">Research Data</SelectItem>
                    <SelectItem value="external-api" className="text-white">External Platform API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="select-source" className="text-white">Search or Select Source</Label>
                <Select>
                  <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="Select specific source" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                    {dataSources.map((source) => (
                      <SelectItem key={source.id} value={source.id} className="text-white">
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between">
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
            </AccordionContent>
          </AccordionItem>

          {/* Step 3: Define Trigger Conditions */}
          <AccordionItem value="step-3" className="border-loteraa-gray/30">
            <AccordionTrigger id="step-3-trigger" className="text-white hover:text-loteraa-purple">
              Step 3: Define Trigger Condition(s)
            </AccordionTrigger>
            <AccordionContent className="text-white/80">
              <div className="space-y-4">
                <p className="text-white font-medium">IF:</p>
                
                {conditions.map((condition, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 border border-loteraa-gray/20 rounded-md p-3 bg-loteraa-gray/10">
                    <div>
                      <Label className="text-white text-sm mb-1 block">Data Field</Label>
                      <Select>
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                          <SelectItem value="temperature" className="text-white">temperature</SelectItem>
                          <SelectItem value="humidity" className="text-white">humidity</SelectItem>
                          <SelectItem value="pressure" className="text-white">pressure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-white text-sm mb-1 block">Operation</Label>
                      <Select>
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder="Operation" />
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
                        placeholder="40" 
                        className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white text-sm mb-1 block">Unit</Label>
                      <Select>
                        <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                          <SelectItem value="celsius" className="text-white">°C</SelectItem>
                          <SelectItem value="fahrenheit" className="text-white">°F</SelectItem>
                          <SelectItem value="percent" className="text-white">%</SelectItem>
                          <SelectItem value="pascal" className="text-white">Pa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
                
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-loteraa-gray/30 text-white flex items-center w-full sm:w-auto"
                    onClick={addCondition}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Condition
                  </Button>
                  
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Label className="text-white">Use AND</Label>
                    <Switch id="use-and" />
                    <Label className="text-white">Use OR</Label>
                  </div>
                </div>
                
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

          {/* Step 4: Set Blockchain Action */}
          <AccordionItem value="step-4" className="border-loteraa-gray/30">
            <AccordionTrigger id="step-4-trigger" className="text-white hover:text-loteraa-purple">
              Step 4: Set Blockchain Action
            </AccordionTrigger>
            <AccordionContent className="text-white/80 space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Choose Action</Label>
                <Select onValueChange={setActionType}>
                  <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                    <SelectItem value="send-token" className="text-white">Send Token Payment</SelectItem>
                    <SelectItem value="trigger-contract" className="text-white">Trigger Contract Function</SelectItem>
                    <SelectItem value="send-notification" className="text-white">Send Notification/Webhook</SelectItem>
                    <SelectItem value="grant-access" className="text-white">Grant Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {actionType === "send-token" && (
                <div className="space-y-4">
                  <h4 className="text-white font-medium text-sm">Input for Action:</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recipient-wallet" className="text-white">Recipient Wallet</Label>
                    <Input 
                      id="recipient-wallet" 
                      placeholder="0x..." 
                      className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-white">Amount to Send</Label>
                    <Input 
                      id="amount" 
                      placeholder="10" 
                      className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="token-type" className="text-white">Token Type</Label>
                    <Select>
                      <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                        <SelectItem value="tera" className="text-white">Tera</SelectItem>
                        <SelectItem value="usdc" className="text-white">USDC</SelectItem>
                        <SelectItem value="pol" className="text-white">POL</SelectItem>
                        <SelectItem value="usdt" className="text-white">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blockchain" className="text-white">Blockchain</Label>
                    <Select>
                      <SelectTrigger className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                      <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                        <SelectItem value="polygon" className="text-white">Polygon</SelectItem>
                        <SelectItem value="loteraa" className="text-white">Loteraa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Similar sections for other action types would go here */}
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-loteraa-gray/30 text-white"
                  onClick={() => document.getElementById('step-3-trigger')?.click()}
                >
                  Previous
                </Button>
                <Button 
                  type="button" 
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white"
                  onClick={() => document.getElementById('step-5-trigger')?.click()}
                >
                  Next
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Step 5: Authorization & Preview */}
          <AccordionItem value="step-5" className="border-loteraa-gray/30">
            <AccordionTrigger id="step-5-trigger" className="text-white hover:text-loteraa-purple">
              Step 5: Authorization & Preview
            </AccordionTrigger>
            <AccordionContent className="text-white/80 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Requires Authorization Token?</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={requiresAuth} 
                      onCheckedChange={setRequiresAuth}
                    />
                    <Label className="text-white">{requiresAuth ? 'Yes - enter token' : 'No'}</Label>
                  </div>
                  
                  {requiresAuth && (
                    <Input 
                      placeholder="Enter authorization token" 
                      className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white mt-2"
                    />
                  )}
                </div>
                
                <div className="bg-loteraa-gray/10 border border-loteraa-gray/30 rounded-lg p-4 space-y-2">
                  <h4 className="text-white font-medium">Summary</h4>
                  <div className="text-white/80 space-y-1 text-sm">
                    <p>Trigger: temp > 40°C</p>
                    <p>Action: send 10 Tera to wallet address</p>
                    <p>Device: Tempsenor001 on Loteraa blockchain</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button variant="outline" className="bg-loteraa-blue/20 border-loteraa-blue hover:bg-loteraa-blue/30 text-white">
                    Connect Wallet to Sign Contract
                  </Button>
                  
                  <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white">
                    Deploy Automation
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
