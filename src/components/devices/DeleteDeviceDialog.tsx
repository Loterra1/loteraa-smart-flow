
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

interface DeleteDeviceDialogProps {
  device: {
    id: string;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeviceDeleted?: (deviceId: string) => void;
}

export default function DeleteDeviceDialog({ 
  device, 
  open, 
  onOpenChange,
  onDeviceDeleted
}: DeleteDeviceDialogProps) {

  const handleDelete = () => {
    // Call the deletion callback to actually remove the device
    if (onDeviceDeleted) {
      onDeviceDeleted(device.id);
    }
    
    // Show success message
    toast.success("Device deleted", {
      description: `${device.name} has been removed from your devices.`,
    });
    
    // Close dialog
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-loteraa-gray border-loteraa-gray/30 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Device</AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Are you sure you want to delete "{device.name}"? This action cannot be undone.
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
