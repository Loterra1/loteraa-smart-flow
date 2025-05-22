
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AutomationType {
  id: string;
  name: string;
  triggerSource: string;
  actionType: string;
  status: "Active" | "Paused";
  lastTrigger: string;
}

interface EditAutomationDialogProps {
  automation: AutomationType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditAutomationDialog: React.FC<EditAutomationDialogProps> = ({
  automation,
  open,
  onOpenChange
}) => {
  const [name, setName] = useState(automation.name);
  const [triggerSource, setTriggerSource] = useState(automation.triggerSource);
  const [actionType, setActionType] = useState(automation.actionType);
  const [status, setStatus] = useState(automation.status);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Saving automation:", {
        id: automation.id,
        name,
        triggerSource,
        actionType,
        status
      });
      
      toast.success("Automation updated", {
        description: "Your changes have been saved successfully."
      });
      
      setIsSaving(false);
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-loteraa-gray/90 border border-loteraa-gray/40 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-full">
              <Edit className="h-6 w-6 text-blue-500" />
            </div>
            <DialogTitle className="text-xl">Edit Automation</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Update the details and configuration of your automation
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="triggerSource" className="text-white">Trigger Source</Label>
            <Select value={triggerSource} onValueChange={setTriggerSource}>
              <SelectTrigger
                id="triggerSource"
                className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
              >
                <SelectValue placeholder="Select trigger source" />
              </SelectTrigger>
              <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                <SelectItem value="CO² sensor" className="text-white">CO² sensor</SelectItem>
                <SelectItem value="Power meter" className="text-white">Power meter</SelectItem>
                <SelectItem value="Temperature sensor" className="text-white">Temperature sensor</SelectItem>
                <SelectItem value="Motion detector" className="text-white">Motion detector</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="actionType" className="text-white">Action Type</Label>
            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger
                id="actionType"
                className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
              >
                <SelectValue placeholder="Select action type" />
              </SelectTrigger>
              <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                <SelectItem value="Smart Contract" className="text-white">Smart Contract</SelectItem>
                <SelectItem value="Notification" className="text-white">Notification</SelectItem>
                <SelectItem value="Payment transfer" className="text-white">Payment transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status" className="text-white">Status</Label>
            <Select value={status} onValueChange={(value: "Active" | "Paused") => setStatus(value)}>
              <SelectTrigger
                id="status"
                className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                <SelectItem value="Active" className="text-white">Active</SelectItem>
                <SelectItem value="Paused" className="text-white">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-loteraa-purple hover:bg-loteraa-purple/90"
          >
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAutomationDialog;
