
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DeviceType = "digital" | "physical";

type AddIoTDeviceFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddIoTDeviceForm({ open, onOpenChange }: AddIoTDeviceFormProps) {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const { toast } = useToast();
  
  const digitalForm = useForm({
    defaultValues: {
      deviceName: "",
      deviceType: "",
      apiEndpoint: "",
      authToken: "",
      pollingInterval: "60",
      dataFormat: "JSON",
      smartContract: "",
    }
  });
  
  const physicalForm = useForm({
    defaultValues: {
      deviceName: "",
      deviceType: "",
      manufacturer: "",
      gatewayId: "",
      sensorId: "",
      connectionProtocol: "",
      pollRate: "60",
      smartContract: "",
      bindToAutomation: "no",
    }
  });
  
  const handleDeviceTypeChange = (value: string) => {
    setDeviceType(value as DeviceType);
  };
  
  const submitDigitalDevice = (data: any) => {
    console.log("Digital device data:", data);
    toast({
      title: "Digital Device Added",
      description: `Device ${data.deviceName} has been successfully added.`
    });
    onOpenChange(false);
    setDeviceType(null);
    digitalForm.reset();
  };
  
  const submitPhysicalDevice = (data: any) => {
    console.log("Physical device data:", data);
    toast({
      title: "Physical Device Added",
      description: `Device ${data.deviceName} has been successfully added.`
    });
    onOpenChange(false);
    setDeviceType(null);
    physicalForm.reset();
  };
  
  const smartContractOptions = [
    { value: "environmentcontract.sol", label: "environmentcontract.sol (Utilities)" },
    { value: "waterflowmonitor.sol", label: "waterflowmonitor.sol (Temp Sensors)" },
    { value: "new", label: "Create New Smart Contract" },
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto bg-loteraa-gray/30 border-loteraa-gray/40">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add New IoT Device</DialogTitle>
          <DialogDescription>
            Select the type of IoT device you want to add
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deviceType">Device Type</Label>
            <Select onValueChange={handleDeviceTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose type" />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="digital">Digital IoT Device</SelectItem>
                <SelectItem value="physical">Physical IoT Device</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {deviceType === "digital" && (
            <Form {...digitalForm}>
              <form onSubmit={digitalForm.handleSubmit(submitDigitalDevice)} className="space-y-3">
                <FormField
                  control={digitalForm.control}
                  name="deviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter device name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={digitalForm.control}
                  name="deviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter device type" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={digitalForm.control}
                  name="apiEndpoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Endpoint URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://api.example.com" className="text-xs md:text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={digitalForm.control}
                  name="authToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Authorization Token</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter auth token" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={digitalForm.control}
                  name="pollingInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Polling Interval (sec)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={digitalForm.control}
                  name="dataFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Data Format</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-50">
                          <SelectItem value="JSON">JSON</SelectItem>
                          <SelectItem value="XML">XML</SelectItem>
                          <SelectItem value="CSV">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={digitalForm.control}
                  name="smartContract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Smart Contract to Trigger</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose contract" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-50">
                          {smartContractOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-loteraa-purple w-full sm:w-auto">
                    Register Digital Device
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
          
          {deviceType === "physical" && (
            <Form {...physicalForm}>
              <form onSubmit={physicalForm.handleSubmit(submitPhysicalDevice)} className="space-y-3">
                <FormField
                  control={physicalForm.control}
                  name="deviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter device name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={physicalForm.control}
                  name="deviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter device type" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={physicalForm.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter manufacturer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={physicalForm.control}
                  name="gatewayId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gateway ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter gateway ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={physicalForm.control}
                  name="sensorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sensor ID/MAC</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter sensor ID or MAC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={physicalForm.control}
                  name="connectionProtocol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connection Protocol</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select protocol" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-50">
                          <SelectItem value="mqtt">MQTT</SelectItem>
                          <SelectItem value="http">HTTP/REST</SelectItem>
                          <SelectItem value="coap">CoAP</SelectItem>
                          <SelectItem value="websocket">WebSocket</SelectItem>
                          <SelectItem value="bluetooth">Bluetooth</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={physicalForm.control}
                  name="pollRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency/Poll Rate (sec)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={physicalForm.control}
                  name="smartContract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Smart Contract to Trigger</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose contract" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-50">
                          {smartContractOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={physicalForm.control}
                  name="bindToAutomation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bind to Existing Automation?</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-50">
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border border-loteraa-blue/30 rounded-md p-3 mt-3 bg-loteraa-blue/5">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Check className="w-4 h-4 mr-2 text-loteraa-blue" />
                    Connection Verification
                  </h4>
                  <p className="text-xs text-white/70">
                    After registering, we'll verify the connection to your physical device.
                    Make sure your device is powered on and connected to the network.
                  </p>
                </div>
                
                <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-loteraa-purple w-full sm:w-auto">
                    Register & Save Device
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
