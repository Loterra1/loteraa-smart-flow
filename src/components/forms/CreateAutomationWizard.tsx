
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateAutomationForm from './CreateAutomationForm';

interface AutomationType {
  id: string;
  name: string;
  triggerSource: string;
  actionType: string;
  status: "Active" | "Paused";
  lastTrigger: string;
}

interface CreateAutomationWizardProps {
  onAutomationCreated: (automation: AutomationType) => void;
}

const CreateAutomationWizard = ({ onAutomationCreated }: CreateAutomationWizardProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  
  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-loteraa-purple hover:bg-loteraa-purple/90"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Create Automation
        </Button>
      </DialogTrigger>
      
      <CreateAutomationForm 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onAutomationCreated={onAutomationCreated}
      />
    </Dialog>
  );
};

export default CreateAutomationWizard;
