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
      handleSaveContractCode,
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

   const normalizeContract = (contract): SmartContract => {
      return {
         ...contract,
         status:
            contract.status === 'Pending' || contract.status === 'Error'
               ? 'Active'
               : (contract.status as 'Active' | 'Inactive'),
         description: contract.description || '',
         network: contract.network || 'Ethereum',
         createdAt: contract.createdAt || new Date().toISOString(),
         lastInteraction: contract.lastInteraction || new Date().toISOString(),
      };
   };

   const handleContractCreatedWrapper = (contract) => {
      const normalizedContract = normalizeContract(contract);
      handleContractCreated(normalizedContract);
   };

   const handleSaveContractCodeWrapper = (
      contract,
      code: string,
      abi: string
   ) => {
      const normalizedContract = normalizeContract(contract);
      handleSaveContractCode(normalizedContract, code, abi);
   };

   const handleContractUpdatedWrapper = (contract) => {
      const normalizedContract = normalizeContract(contract);
      handleContractUpdated(normalizedContract);
   };

   return (
      <div className="min-h-screen bg-loteraa-black">
         <DashboardNavbar />
         <div className="container mx-auto px-4 py-8">
            <PageHeader
               isDialogOpen={isCreateDialogOpen}
               setIsDialogOpen={setIsCreateDialogOpen}
               onContractCreated={handleContractCreatedWrapper}
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
               onContractCreated={handleContractCreatedWrapper}
            />

            {/* Dialogs */}
            <ViewSmartContractDialog
               isOpen={isViewDialogOpen}
               onClose={() => setIsViewDialogOpen(false)}
               contract={selectedContract}
               onExportContract={(contractId) => {
                  console.log('Exporting contract:', contractId);
               }}
               onSaveContractCode={handleSaveContractCodeWrapper}
            />

            <EditSmartContractDialog
               isOpen={isEditDialogOpen}
               onClose={() => setIsEditDialogOpen(false)}
               contract={selectedContract}
               onSave={handleContractUpdatedWrapper}
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
