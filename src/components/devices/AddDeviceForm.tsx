
import React from 'react';
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Device name must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a device type.",
  }),
  source: z.string().optional(),
  description: z.string().optional(),
});

interface AddDeviceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeviceAdded: (device: any) => void;
}

export default function AddDeviceForm({ open, onOpenChange, onDeviceAdded }: AddDeviceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      source: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create a new device with the form values
    const newDevice = {
      id: Math.random().toString(36).substr(2, 9),
      name: values.name,
      type: values.type === 'digital' ? 'Digital' : 'Physical',
      status: 'Online',
      lastTrigger: 'Just now',
    };
    
    // Call the onDeviceAdded callback with the new device
    onDeviceAdded(newDevice);
    
    // Show success message
    toast.success("Device added successfully", {
      description: `${values.name} has been added to your devices.`,
    });
    
    // Reset form and close dialog
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-loteraa-gray border-loteraa-gray/30 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Add New Device</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Device Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter device name" 
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Device Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Data Source (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="API endpoint or device address" 
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Brief description of the device" 
                      className="bg-loteraa-black/50 border-loteraa-gray/30 text-white" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white"
              >
                Add Device
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
