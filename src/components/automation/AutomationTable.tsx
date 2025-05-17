
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteAutomationDialog from "./DeleteAutomationDialog";
import { toast } from "sonner";
import { Edit, Settings } from "lucide-react";

interface AutomationType {
  id: string;
  name: string;
  triggerSource: string;
  actionType: string;
  status: "Active" | "Paused";
  lastTrigger: string;
}

interface AutomationTableProps {
  automations: AutomationType[];
}

const AutomationTable: React.FC<AutomationTableProps> = ({ automations }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [automationToDelete, setAutomationToDelete] = useState<AutomationType | null>(null);

  const handleViewAutomation = (automation: AutomationType) => {
    toast.info(`Viewing ${automation.name}`, {
      description: "This would open a detailed view of the automation."
    });
    // In a real app, you'd navigate to a detail page or open a modal
    console.log("View automation:", automation);
  };

  const handleEditAutomation = (automation: AutomationType) => {
    toast.info(`Editing ${automation.name}`, {
      description: "This would open the automation editor."
    });
    // In a real app, you'd open the edit form with the selected automation
    console.log("Edit automation:", automation);
  };

  const handleDeleteClick = (automation: AutomationType) => {
    setAutomationToDelete(automation);
    setDeleteDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Paused":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div className="rounded-md border border-loteraa-gray/30 overflow-hidden">
        <Table>
          <TableHeader className="bg-loteraa-gray/20">
            <TableRow className="hover:bg-loteraa-gray/30 border-b border-loteraa-gray/30">
              <TableHead className="text-white font-medium">Name</TableHead>
              <TableHead className="text-white font-medium">Trigger Source</TableHead>
              <TableHead className="text-white font-medium">Action Type</TableHead>
              <TableHead className="text-white font-medium">Status</TableHead>
              <TableHead className="text-white font-medium">Last Trigger</TableHead>
              <TableHead className="text-white font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {automations.length === 0 ? (
              <TableRow className="hover:bg-loteraa-gray/10 border-b border-loteraa-gray/20">
                <TableCell colSpan={6} className="text-center text-white/60 py-8">
                  No automations found. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              automations.map((automation) => (
                <TableRow 
                  key={automation.id}
                  className="hover:bg-loteraa-gray/10 border-b border-loteraa-gray/20"
                >
                  <TableCell className="text-white font-medium">
                    {automation.name}
                  </TableCell>
                  <TableCell className="text-white">{automation.triggerSource}</TableCell>
                  <TableCell className="text-white">{automation.actionType}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(automation.status)} mr-2`} />
                      <span className="text-white">{automation.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{automation.lastTrigger}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30"
                        onClick={() => handleViewAutomation(automation)}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30"
                        onClick={() => handleEditAutomation(automation)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-loteraa-gray/30 text-white hover:bg-loteraa-gray/30"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-loteraa-black border-loteraa-gray/30">
                          <DropdownMenuItem 
                            className="text-white hover:bg-loteraa-gray/30 cursor-pointer"
                            onClick={() => handleDeleteClick(automation)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {automationToDelete && (
        <DeleteAutomationDialog
          automation={automationToDelete}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </>
  );
};

export default AutomationTable;
