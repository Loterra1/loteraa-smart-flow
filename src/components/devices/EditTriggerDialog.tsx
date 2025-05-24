
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

const formSchema = z.object({
  condition: z.string().min(1, {
    message: "Condition is required.",
  }),
  action: z.string().min(1, {
    message: "Action is required.",
  }),
});

interface EditTriggerDialogProps {
  trigger: {
    id: string;
    condition: string;
    action: string;
    lastTriggered: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditTriggerDialog({ 
  trigger, 
  open, 
  onOpenChange 
}: EditTriggerDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      condition: trigger.condition,
      action: trigger.action,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call to update trigger
    console.log("Updating trigger:", trigger.id, values);
    
    // Show success message
    toast.success("Trigger updated successfully", {
      description: "The automation trigger has been updated.",
    });
    
    // Close dialog
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-loteraa-gray border-loteraa-gray/30 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Edit Automation Trigger</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Condition</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Temperature > 30°C" 
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
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Action</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Send notification" 
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
                className="bg-loteraa-blue hover:bg-loteraa-blue/90 text-white"
              >
                Update Trigger
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
