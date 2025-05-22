
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      triggerSource: "",
      actionType: "",
      isActive: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-loteraa-gray border-loteraa-gray/30 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create New Automation</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
            <FormField
              control={form.control}
              name="actionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Action Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                        <SelectValue placeholder="Select action type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                      <SelectItem value="Smart Contract">Smart Contract</SelectItem>
                      <SelectItem value="Payment transfer">Payment transfer</SelectItem>
                      <SelectItem value="Notification">Notification</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-white">Activate Immediately</FormLabel>
                  </div>
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
                Create Automation
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
