
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Edit, Trash2, ExternalLink } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DashboardNavbar from '@/components/DashboardNavbar';
import CreateSmartContractDialog from '@/components/smartcontracts/CreateSmartContractDialog';
import DeleteSmartContractDialog from '@/components/smartcontracts/DeleteSmartContractDialog';
import ViewSmartContractDialog from '@/components/smartcontracts/ViewSmartContractDialog';
import EditSmartContractDialog from '@/components/smartcontracts/EditSmartContractDialog';
import { useToast } from "@/hooks/use-toast";

interface SmartContract {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  trigger: string;
  lastModified: string;
  file?: File;
  code?: string;
  abi?: string;
}

export default function SmartContractsPage() {
  const [contracts, setContracts] = useState<SmartContract[]>([
    {
      id: '1',
      name: 'Environmental Data Access',
      type: 'Access Control',
      status: 'Active',
      trigger: 'Automated',
      lastModified: 'May 15, 2025',
    },
    {
      id: '2',
      name: 'Payment Distribution',
      type: 'Financial',
      status: 'Active',
      trigger: 'Manual',
      lastModified: 'May 10, 2025',
    },
    {
      id: '3',
      name: 'Data Verification Contract',
      type: 'Validation',
      status: 'Active',
      trigger: 'Event-driven',
      lastModified: 'May 5, 2025',
    },
    {
      id: '4',
      name: 'Device Authorization',
      type: 'Security',
      status: 'Inactive',
      trigger: 'On-demand',
      lastModified: 'Apr 28, 2025',
    },
  ]);
  
  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const { toast } = useToast();

  const handleViewContract = (contract: SmartContract) => {
    setSelectedContract(contract);
    setIsViewDialogOpen(true);
  };

  const handleEditContract = (contract: SmartContract) => {
    setSelectedContract(contract);
    setIsEditDialogOpen(true);
  };

  const handleDeleteContract = (contract: SmartContract) => {
    setSelectedContract(contract);
    setIsDeleteDialogOpen(true);
  };

  const handleContractCreated = (newContract: SmartContract) => {
    setContracts([newContract, ...contracts]);
    toast({
      title: "Contract Created",
      description: "The smart contract has been successfully created.",
    });
  };

  const handleContractUpdated = (updatedContract: SmartContract) => {
    setContracts(contracts.map(c => c.id === updatedContract.id ? updatedContract : c));
    toast({
      title: "Contract Updated",
      description: "The smart contract has been successfully updated.",
    });
  };

  const handleContractDeleted = (contractId: string) => {
    setContracts(contracts.filter(c => c.id !== contractId));
    toast({
      title: "Contract Deleted",
      description: "The smart contract has been successfully deleted.",
    });
  };

  const handleSaveContractCode = (contract: SmartContract, code: string, abi: string) => {
    const updatedContract = { ...contract, code, abi };
    setContracts(contracts.map(c => c.id === contract.id ? updatedContract : c));
    toast({
      title: "Code Saved",
      description: "The contract code has been successfully saved.",
    });
  };

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">My Smart Contracts</h1>
            <p className="text-white/70">Manage and deploy your smart contracts for IoT devices</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Smart Contract
              </Button>
            </DialogTrigger>
            <CreateSmartContractDialog 
              onClose={() => setIsCreateDialogOpen(false)} 
              onContractCreated={handleContractCreated}
            />
          </Dialog>
        </div>

        <div className="bg-loteraa-gray/20 rounded-lg border border-loteraa-gray/30 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Type</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Trigger Used</TableHead>
                  <TableHead className="text-white">Last Modified</TableHead>
                  <TableHead className="text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                    <TableCell className="font-medium text-white">
                      {contract.name}
                    </TableCell>
                    <TableCell className="text-white/80">{contract.type}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          contract.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {contract.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/80">{contract.trigger}</TableCell>
                    <TableCell className="text-white/80">{contract.lastModified}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-loteraa-purple/20"
                          onClick={() => handleViewContract(contract)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-loteraa-purple/20"
                          onClick={() => handleEditContract(contract)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-loteraa-purple/20"
                          onClick={() => handleDeleteContract(contract)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-center">
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
                <PlusCircle className="mr-2 h-4 w-4" />
                Upload Existing Contract
              </Button>
            </DialogTrigger>
            <CreateSmartContractDialog 
              onClose={() => setUploadDialogOpen(false)} 
              onContractCreated={handleContractCreated}
              initialContractType="upload"
            />
          </Dialog>
        </div>

        {/* View Contract Dialog */}
        <ViewSmartContractDialog 
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
          contract={selectedContract}
          onExportContract={(contractId) => {
            toast({
              title: "Contract Exported",
              description: "Contract has been exported successfully.",
            });
          }}
          onSaveContractCode={handleSaveContractCode}
        />

        {/* Edit Contract Dialog */}
        <EditSmartContractDialog 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          contract={selectedContract}
          onSave={handleContractUpdated}
        />

        {/* Delete Contract Dialog */}
        <DeleteSmartContractDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          contract={selectedContract}
          onDelete={handleContractDeleted}
        />
      </div>
    </div>
  );
}
