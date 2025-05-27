
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const triggerSourceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().min(1, "Please select a type"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  dataFormat: z.string().min(1, "Please specify data format"),
});

type TriggerSourceFormValues = z.infer<typeof triggerSourceSchema>;

interface TriggerSource {
  id: string;
  name: string;
  type: string;
  description: string;
  dataFormat: string;
}

interface CreateTriggerSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTriggerSourceCreated: (triggerSource: TriggerSource) => void;
}

export default function CreateTriggerSourceDialog({
  open,
  onOpenChange,
  onTriggerSourceCreated
}: CreateTriggerSourceDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TriggerSourceFormValues>({
    resolver: zodResolver(triggerSourceSchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
      dataFormat: "",
    },
  });

  const onSubmit = async (values: TriggerSourceFormValues) => {
    setIsSubmitting(true);
    
    // Create new trigger source
    const newTriggerSource: TriggerSource = {
      id: Math.random().toString(36).substr(2, 9),
      name: values.name,
      type: values.type,
      description: values.description,
      dataFormat: values.dataFormat,
    };
    
    // Call the callback
    onTriggerSourceCreated(newTriggerSource);
    
    toast.success("Trigger source created successfully", {
      description: `${values.name} has been added to your trigger sources.`,
    });
    
    // Reset form and close dialog
    form.reset();
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-loteraa-gray border-loteraa-gray/30 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create New Trigger Source</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Trigger Source Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Custom Temperature Sensor" 
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
                  <FormLabel className="text-white">Sensor Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-loteraa-black/50 border-loteraa-gray/30 text-white">
                        <SelectValue placeholder="Select sensor type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
                      <SelectItem value="temperature">Temperature Sensor</SelectItem>
                      <SelectItem value="humidity">Humidity Sensor</SelectItem>
                      <SelectItem value="pressure">Pressure Sensor</SelectItem>
                      <SelectItem value="motion">Motion Sensor</SelectItem>
                      <SelectItem value="light">Light Sensor</SelectItem>
                      <SelectItem value="sound">Sound Sensor</SelectItem>
                      <SelectItem value="air-quality">Air Quality Sensor</SelectItem>
                      <SelectItem value="power">Power Meter</SelectItem>
                      <SelectItem value="water">Water Quality Monitor</SelectItem>
                      <SelectItem value="custom">Custom Sensor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Data Format</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., °C, %, ppm, boolean, etc." 
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
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what this trigger source monitors and how it works..." 
                      className="bg-loteraa-black/50 border-loteraa-gray/30 text-white h-20" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Trigger Source'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
