
import React from 'react';
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteAutomationDialogProps {
  automation: {
    id: string;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteAutomationDialog({ 
  automation, 
  open, 
  onOpenChange 
}: DeleteAutomationDialogProps) {

  const handleDelete = () => {
    // Simulate API call to delete automation
    console.log("Deleting automation:", automation.id);
    
    // Show success message
    toast.success("Automation deleted", {
      description: `${automation.name} has been removed from your automations.`,
    });
    
    // Close dialog
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Automation</AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Are you sure you want to delete "{automation.name}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
