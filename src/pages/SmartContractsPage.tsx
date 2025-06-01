
import React, { useState } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import ViewSmartContractDialog from '@/components/smartcontracts/ViewSmartContractDialog';
import EditSmartContractDialog from '@/components/smartcontracts/EditSmartContractDialog';
import DeleteSmartContractDialog from '@/components/smartcontracts/DeleteSmartContractDialog';
import PageHeader from '@/components/smartcontracts/PageHeader';
import SmartContractsList from '@/components/smartcontracts/SmartContractsList';
import UploadContractButton from '@/components/smartcontracts/UploadContractButton';
import { useSmartContracts } from '@/hooks/useSmartContracts';
import { SmartContract } from '@/types/smartContract';

export default function SmartContractsPage() {
  const {
    contracts,
    selectedContract,
    setSelectedContract,
    handleContractCreated,
    handleContractUpdated,
    handleContractDeleted,
    handleSaveContractCode
  } = useSmartContracts();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          isDialogOpen={isCreateDialogOpen}
          setIsDialogOpen={setIsCreateDialogOpen}
          onContractCreated={handleContractCreated}
        />

        <SmartContractsList
          contracts={contracts}
          onView={handleViewContract}
          onEdit={handleEditContract}
          onDelete={handleDeleteContract}
        />

        <UploadContractButton
          isUploadDialogOpen={uploadDialogOpen}
          setUploadDialogOpen={setUploadDialogOpen}
          onContractCreated={handleContractCreated}
        />

        {/* Dialogs */}
        <ViewSmartContractDialog 
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
          contract={selectedContract}
          onExportContract={(contractId) => {
            console.log("Exporting contract:", contractId);
          }}
          onSaveContractCode={handleSaveContractCode}
        />

        <EditSmartContractDialog 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          contract={selectedContract}
          onSave={handleContractUpdated}
        />

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
